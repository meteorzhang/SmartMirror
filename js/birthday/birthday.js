$(function () {
	/*控制页面定时刷新*/
	setTimeout(function () {
		location.reload();
	},3600000);


	/*生日提醒*/
	var today = ((new Date().getMonth()+1)*100 + new Date().getDate()).toString();
	if (config.calendar.birthdays.hasOwnProperty(today)) {
		$('.name').html(config.calendar.birthdays[today]);
		var talks = $('.talk');
		setInterval(function () {
			$(talks[0]).fadeOut('slow',function () {
				setTimeout(function () {
					$(talks[0]).fadeIn('slow');
				},1000)
			});
		},15000);
		setInterval(function () {
			$(talks[1]).fadeOut('slow',function () {
				setTimeout(function () {
					$(talks[1]).fadeIn('slow');
				},2000)
			});
		},15000);
		setInterval(function () {
			$(talks[2]).fadeOut('slow',function () {
				setTimeout(function () {
					$(talks[2]).fadeIn('slow');
				},3000)
			});
		},15000);
		setInterval(function () {
			$(talks[3]).fadeOut('slow',function () {
				setTimeout(function () {
					$(talks[3]).fadeIn('slow');
				},4000)
			});
		},15000);
	}
})