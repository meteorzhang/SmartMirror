<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>魔镜快递</title>
	<link rel="stylesheet" href="css/post.css">
</head>
<body>
	<div class="form">
		<h1>话梅专属快递查询系统</h1>
		<input type="text" class="text" autofocus>
		<span class="add">查询</span>
	</div>
</body>
<script src="js/jquery.js"></script>
<script src="js/template-native.js"></script>
<script src="js/config.js"></script>
<script src="js/post/post.js"></script>
<script type="text/template" id="post">
	<ul>
		<li>来自：<%=data.logisticsType%></li>
		<li>状态：<%=data.status%></li>
		<% for(var i=data.data.length-1;i >= 0;i--){%>
		<li>
			<div class="time"><%=data.data[i].time%></div>
			<div><%=data.data[i].desc%></div>
		</li>
		<% } %>
	</ul>
</script>
</html>
