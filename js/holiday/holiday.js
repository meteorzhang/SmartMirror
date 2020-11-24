$(function () {
	function getholiday() {
		$('.holiday').fadeOut('slow');
		setTimeout(function () {
			$('.holiday').fadeIn('slow');
		},1000)
		var date = new Date();
		var today = date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
		$.ajax({
			url:'https://www.mxnzp.com/api/holiday/single/'+today,
			type:'get',
			success:function (res) {
				var data = res.data;
				$('.typeDes').html('【'+data.typeDes+'】');
				$('.solarTerms').html('【'+data.solarTerms+'】');
				$.ajax({
					url:'https://www.mxnzp.com/api/holiday/recent/list',
					type:'get',
					success:function (res) {
						var recent = res.data[7];
						var residueDays = recent.residueDays==0?'今天':recent.residueDays==1?'明天':recent.residueDays==2?'后天':'【'+recent.residueDays+'】天后';
						$('.recent').html(residueDays+'是【'+recent.holidayName+'】');
					}
				})
			}
		})
	}
	getholiday();
	setInterval(function () {
		getholiday();
	},21600000);
})