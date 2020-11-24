<?php 
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
if (isset($_POST['add'])) {
	$add = $_POST['add'];
	$mm = mysqli_connect('127.0.0.1','root','123456','MM');
	if (!$mm) {
		exit('<h1>数据库连接失败</h1>');
	}
	$postcode = mysqli_query($mm,"insert into postcode (postcode) values ('{$add}')");
	if (!$postcode) {
		exit('<h1>添加失败</h1>');
	}
	$row = mysqli_affected_rows($mm);
	echo $row;
	return;
}
if (isset($_POST['delete'])) {
	$delete = (string)$_POST['delete'];
	$mm = mysqli_connect('127.0.0.1','root','123456','MM');
	if (!$mm) {
		exit('<h1>数据库连接失败</h1>');
	}
	$postcode = mysqli_query($mm,"delete from postcode where postcode = '{$delete}'");
	if (!$postcode) {
		exit('<h1>删除失败失败</h1>');
	}
	$row = mysqli_affected_rows($mm);
	echo $row;
	return;
}
$postcodes=[];
$mm = mysqli_connect('127.0.0.1','root','123456','MM');
if (!$mm) {
	exit('<h1>数据库连接失败</h1>');
}
$postcode = mysqli_query($mm,'select * from postcode;');
if (!$postcode) {
	exit('<h1>查询失败</h1>');
}
while ($row = mysqli_fetch_assoc($postcode)) {
	array_push($postcodes,$row['postcode']);
}
$json = json_encode($postcodes);
echo $json;
