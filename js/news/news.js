$(function () {
	var id = 0;
	function getnews() {
		$('.news').fadeOut('slow');
		var typeId = [];
		setTimeout(function () {
					$.ajax({
			url:'https://www.mxnzp.com/api/news/types',
			type:'get',
			success:function (res) {
				var data = res.data;
				for (var i = 0; i < data.length; i++) {
					typeId.push(data[i].typeId);
				}
				$.ajax({
					url:'https://www.mxnzp.com/api/news/list',
					data:{
						typeId:typeId[id],
						page:1
					},
					type:'get',
					success:function (res) {
						id = id > typeId.length-1 ? typeId.length-1 : id+1;
						$('li').remove('.title');
						var list = res.data;
						var length = list.length > 5 ? 5 : list.length;
						for (var i = 0; i < length; i++) {
							$('.news ul').append('<li class="title">'+list[i].title+'</li>');
							setTimeout(function () {
								$('.news').fadeIn('slow');
							},1000)
						}
					}
				})
			}
		})
		},500)
	}

	
	getnews();
	setInterval(function () {
		getnews();
	},600000)
})