$(function () {
	var skyconsTable = {
		100:'&#xe8de;',  // 睛
		101:'&#xe8c0;',  // 多云
		102:'&#xe8c0;',  // 少云
		103:'&#xe8c0;',  // 晴间多云
		104:'&#xe8cd;',  // 阴
		200:'&#xe8ba;',  // 有风
		201:'&#xe8ac;',  // 平静
		202:'&#xe8ba;',  // 微风
		203:'&#xe8ba;',  // 和风
		204:'&#xe8ba;',  // 清风
		205:'&#xe8c2;',  // 强风/劲风
		206:'&#xe8c2;',  // 疾风
		207:'&#xe8c2;',  // 大风
		208:'&#xe8c2;',  // 烈风
		209:'&#xe8c1;',  // 风暴
		210:'&#xe8c1;',  // 狂爆风
		211:'&#xe8c1;',  // 飓风
		212:'&#xe8c1;',  // 龙卷风
		213:'&#xe8c1;',  // 热带风暴
		300:'&#xe8ae;',  // 阵雨
		301:'&#xe8bf;',  // 强阵雨
		302:'&#xe8b1;',  // 雷阵雨
		303:'&#xe8bf;',  // 强雷阵雨
		304:'&#xe8bf;',  // 雷阵雨伴有冰霉
		305:'&#xe8d0;',  // 小雨
		306:'&#xe8d4;',  // 中雨
		307:'&#xe8d3;',  // 大雨
		308:'&#xe8c9;',  // 极端降雨
		309:'&#xe8d0;',  // 毛毛雨/细雨
		310:'&#xe8b9;',  // 暴雨
		311:'&#xe8d2;',  // 大暴雨
		312:'&#xe8da;',  // 特大暴雨
		313:'&#xe8ab;',  // 小到中雨
		314:'&#xe8ad;',  // 中到大雨
		315:'&#xe8b0;',  // 大到暴雨
		316:'&#xe8aa;',  // 暴雨到大暴雨
		317:'&#xe8df;',  // 大暴雨到特大暴雨
		318:'&#xe8d4;',  // 雨
		399:'&#xe8d1;',  // 小雪
		400:'&#xe8db;',  // 中雪
		402:'&#xe8e0;',  // 大雪
		403:'&#xe8e6;',  // 暴雪
		404:'&#xe8b3;',  // 雨夹雪
		405:'&#xe8b3;',  // 雨雪天气
		406:'&#xe8dc;',  // 阵雨夹雪
		407:'&#xe8dd;',  // 阵雪
		408:'&#xe8be;',  // 小到中雪
		409:'&#xe8e2;',  // 中到大雪
		410:'&#xe8e1;',  // 大到暴雪
		499:'&#xe8b5;',  // 雪
		500:'&#xe8a9;',  // 薄雾
		501:'&#xe8a9;',  // 雾
		502:'&#xe8e9;',  // 霾
		503:'&#xe8c2;',  // 扬沙
		504:'&#xe8c2;',  // 浮尘
		507:'&#xe8c1;',  // 沙尘暴
		508:'&#xe8c1;',  // 强沙尘暴
		509:'&#xe8cb;',  // 浓雾
		510:'&#xe8cb;',  // 强浓雾
		511:'&#xe8e9;',  // 中度霾
		512:'&#xe8e9;',  // 重度霾
		513:'&#xe8e9;',  // 严重霾
		514:'&#xe8e9;',  // 大雾
		515:'&#xe8e9;',  // 特强浓雾
		900:'&#xe9ac;',  // 热
		901:'&#xe9bb;',  // 冷
		999:'&#xe8ac;'   // 未知
	}

	function getweather(data) {
		// 实时天气
		$.ajax({
			url: 'https://free-api.heweather.net/s6/weather/now',
			tyep:'get',
			data:data,
			success:function (data) {
				var basic = data.HeWeather6[0].basic.location;
				var now = data.HeWeather6[0].now;
				var update = data.HeWeather6[0].update;
				$('.city').html(basic);
				$('.tmp').html(now.tmp+'<span>℃</span>');
				$('.txt').html(now.cond_txt);
				$('.wind').html(now.wind_dir+now.wind_sc+'级');
				$('.iconfont.bigicon').html(skyconsTable[now.cond_code]);
				$('.update').html('上次更新时间：'+update.loc.split(' ')[1]);			
			}
		});

		//生活指数
		$.ajax({
			url:'https://free-api.heweather.net/s6/weather/lifestyle',
			type:'get',
			data:data,
			success:function (res) {
				var comf = res.HeWeather6[0].lifestyle[0].brf;
				var uv = res.HeWeather6[0].lifestyle[5].brf;
				var flu = res.HeWeather6[0].lifestyle[2].brf;
				var sport = res.HeWeather6[0].lifestyle[3].brf;
				$('.comf').html(comf);
				$('.uv').html('紫外线&nbsp;:&nbsp;'+uv);
				$('.flu').html('感冒指数&nbsp;:&nbsp;'+flu);
				$('.sport').html('运动指数&nbsp;:&nbsp;'+sport);
			}
		});

		//空气质量查询
		$.ajax({
			url:'https://free-api.heweather.net/s6/air/now',
			type:'get',
			data:data,
			success:function (res) {
				var qlty = res.HeWeather6[0].air_now_station[6].qlty;
				var main = res.HeWeather6[0].air_now_station[6].main;
				var pm25 = res.HeWeather6[0].air_now_station[6].pm25;
				$('.qlty').html('空气质量:&nbsp;'+qlty);
				$('.main').html('主要污染物:&nbsp;'+main);
				$('.pm25').html('PM2.5含量:&nbsp;'+pm25);
			}
		});

		//天气预报查询
		$.ajax({
			url:'https://free-api.heweather.net/s6/weather/forecast',
			tyep:'get',
			data:data,
			success:function (res) {
				var data = res.HeWeather6[0].daily_forecast;
				var update = res.HeWeather6[0].update.loc.split(' ')[1];
				var html = template('forecast',{data:data,skyconsTable,update});
				$('.daily_forecast').html(html);
				$('.tmpall').html(data[0].tmp_min+'℃'+'~'+data[0].tmp_max+'℃')
			}
		})

		//小时预报
		$.ajax({
			url:'https://free-api.heweather.net/s6/weather/hourly',
			type:'get',
			data:data,
			success:function (res) {
				var hourly = res.HeWeather6[0].hourly;
				var html = template('hourly',{hourly,skyconsTable});
				$('.hourly').html(html);
			}
		})
	}

	setTimeout(function () {
		getweather(config.weather.params);
		$('.right').fadeIn('slow');
	},1000)

	setInterval(function () {
		$('.right').fadeOut('slow',function () {
			getweather(config.weather.params);
		}).fadeIn('slow');
	},900000);

})