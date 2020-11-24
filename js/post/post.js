$(function () {
	var postcodes = [];

	function getpostinfo(postcode,callback) {
		$.ajax({
			url:'https://www.mxnzp.com/api/logistics/discern',
			type:'get',
			data:{
				logistics_no: postcode
			},
			success:function (res) {
				if (res.code !== 0) {
					var logisticsTypeId = res.data.searchList[0].logisticsTypeId;
					$.ajax({
						url:'https://www.mxnzp.com/api/logistics/details/search',
						type:'get',
						data:{
							logistics_no: postcode,
							logistics_id: logisticsTypeId
						},
						success:callback
					})
				}
			}
		})
	}

	$('.add').on('click',function () {
		$('ul').remove();
		$('p').remove();
		var postcode = $('.text').val();

		/*获取数据库中的单号*/
		$.ajax({
			url:'/MM/getcode.php',
			type:'get',
			success:function (res) {
				postcodes = res;
			}
		})

		/*调用函数查询单号信息*/
		getpostinfo(postcode,function (res) {
			//如果没有查到,则返回错误信息
			if (res.code === 0) {
				$('.form').append('<p>'+res.msg+'</>');
			}else{
				//查到就显示
				var data = res.data;
				var html = template('post',{data});
				$('.form').append(html);
				// 数据库中没有这个单号,则把该单号存入数据库,方便跟踪
				$.ajax({
					url:'/MM/getcode.php',
					type:"post",
					data:{
						add:postcode
					}
				})
			}
		})
	})






	//主页显示post
	function updatepost() {
		$('.post ul').html('');
		$.ajax({
			url:'/MM/getcode.php',
			type:'get',
			success:function (res) {
				for (var i = 0; i < res.length; i++) {
					getpostinfo(res[i],function (res) {
						var data = res.data;
						var logisticsNo = data.logisticsNo;
						if (data.status === '签收') {
							$.ajax({
								url:'/MM/getcode.php',
								type:'post',
								data:{
									delete:logisticsNo
								}
							})
						}
						var desc = data.data[data.data.length-1].desc;
						var time = data.data[data.data.length-1].time;
						var html = template('post',{data,desc,time});
						$('.post ul').append(html);
						setTimeout(function () {
							$('.post').fadeIn('slow');
						},2500)
					})
				}
			}
		})
	}

	updatepost();
	setInterval(function () {
		$('.post').fadeOut('slow');
		setTimeout(updatepost,500)
	},3600000)


})