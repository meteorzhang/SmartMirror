<html>
<head> 
  <title>Magic Mirror</title> 
  <style type="text/css">
    <?php include('css/main.css') ?>
  </style> 
  <script type="text/javascript">
    var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
  </script> 
  <meta name="google" value="notranslate" /> 
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" /> 
</head> 
<body> 
  <div class="top left">
    <div class="date small dimmed"></div>
    <div class="time"></div>
    <div class="holiday">
      <div class="h3"><i class="iconfont">&#xe667;</i>Holiday</div>
      <ul>
        <li class="item typeDes"></li>
        <li class="item solarTerms"></li>
        <li class="item recent"></li>
      </ul>
    </div>
    <div class="news">
      <div class="h3"><i class="iconfont">&#xe667;</i>News</div>
      <ul ></ul>
    </div>
    <div class="post">
      <div class="h3"><i class="iconfont">&#xe667;</i>post</div>
      <ul></ul>
    </div>
  </div>
</div> 
<div class="top right">
  <div class="view">
    <div class="tmp">N<span>℃</span></div>
    <div class="tmpall">N℃ / N℃</div>
    <div class="iconfont bigicon"></div>
    <div class="city">N</div>
  </div>
  <div class="fl">
    <span class="txt">N</span>
    <span class="wind">西北风N级</span>
  </div>
  <div class="air_now_station">
    <div class="air_sta">城区</div>
    <div class="qlty">空气质量:</div>
    <div class="main">主要污染物:</div>
    <div class="pm25">PM2.5含量:</div>
  </div>
  <div class="lifestyle">
    <div class="comf">舒适</div>
    <div class="uv">紫外线指数</div>
    <div class="flu">感冒指数</div>
    <div class="sport">运动指数</div>
  </div>
  <span class="update"></span>
  <div class="hourly"></div>
  <div class="daily_forecast">      
  </div>  
  <div class="cross first"></div>
  <div class="cross second"></div>
</div>
<div class="birthday">
  <div class="talk talk1">
    <div class="avatar"></div>
    <div class="talktext">
      今天是{<strong class="name"></strong>}的生日哦!
    </div>
  </div>
  <div class="talk talk2">
    <div class="avatar"></div>
    <div class="talktext">
      生日快乐哦!!
    </div>
  </div>
  <div class="talk talk3">
    <div class="avatar"></div>
    <div class="talktext">
      哈哈!又有蛋糕吃咯!
    </div>
  </div>
  <div class="talk talk4">
    <div class="avatar"></div>
    <div class="talktext">
      (●'◡'●)
    </div>
  </div>
</div>
<div class="lower-third center-hor">
 <div class="compliment light"></div>
</div>
<script src="js/jquery.js"></script> 
<script src="js/jquery.feedToJSON.js"></script> 
<script src="js/ical_parser.js"></script> 
<script src="js/moment-with-locales.min.js"></script> 
<script src="js/template-native.js"></script>
<script src="js/config.js"></script> 
<script src="js/compliments/compliments.js" type="text/javascript"></script> 
<script src="js/skycons.js" type="text/javascript"></script> 
<script src="js/time/time.js" type="text/javascript"></script> 
<script src="js/weather/weather.js"></script>
<script src="js/birthday/birthday.js"></script>
<script src="js/news/news.js"></script>
<script src="js/holiday/holiday.js"></script>
<script src="js/post/post.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script> 
<script type="text/template" id="forecast">
  <table>
    <tr>
      <td>预报日期</td>
      <td>天气</td>
      <td>温度</td>
      <td>降水概率</td>
    </tr>
    <% for(var i = 1 ; i < data.length ; i ++ ){ %>
    <tr style="opacity: <%=(7-i)/6%>">
      <td><%=data[i].date.substr(5) %></td>
      <td><div class="iconfont small"><%=skyconsTable[data[i].cond_code_d]%>/<%=skyconsTable[data[i].cond_code_n]%></div></td>
      <td><%=data[i].tmp_min %>~<%=data[i].tmp_max%> ℃</td>
      <td><%=data[i].pop*10 %> %</td>
    </tr>
    <% } %>
  </table>
</script>
<script type="text/template" id="hourly">
  <ul>
    <% for(var i = 0; i < 5; i++){ %>
    <li>
      <div class="hour"><%=hourly[i].time.split(' ')[1] %></div>
      <div class="iconfont"><%=skyconsTable[hourly[i].cond_code]%></div>
      <div class="temp"><%=hourly[i].tmp %></div>
    </li>
    <% } %>
  </ul>
</script>
<script type="text/template" id="post">
  <li>
    <div class="info"><%=data.logisticsNo%></div>
    <div><%=data.logisticsType%>【<%=data.status%>】</div>
    <div><%=time%></div>
    <div><%=desc%></div>
  </li>
</script>
</body>
</html>