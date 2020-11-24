#1.修改源并更新（默认的源用起来比较慢）php
##修改软件源
sudo sed -i 's#://raspbian.raspberrypi.org#s://mirrors.ustc.edu.cn/raspbian#g' /etc/apt/sources.list 
sudo sed -i 's#://archive.raspberrypi.org/debian#s://mirrors.ustc.edu.cn/archive.raspberrypi.org/debian#g' /etc/apt/sources.list.d/raspi.list

##更新
sudo apt-get update ; sudo apt-get upgrade

#2.共享文件夹设置
## 安装 Samba 
sudo apt-get install samba samba-common-bin

## 配置 Samba
sudo nano /etc/samba/smb.conf
 
## 在末尾加入
[public] 
comment = public storage 
path = /home/pi/Pictures   # /home/pi/Pictures 替换成你需要共享的文件夹
valid users = pi 
read only = no 
create mask = 0777 
directory mask = 0777 
guest ok = no 
browseable = yes
 	
## 添加pi用户
sudo smbpasswd -a pi
 
## 重启samba
sudo samba restart
 
## 设置文件权限--在 Samba 配置文件设置权限后，还需在系统中将共享文件夹的权限设置为同配置文件中相同的权限
sudo chmod -R 777 /home/pi/Pictures    # /home/pi/Pictures 替换成你需要共享的文件夹

#3.安装Apache2
##安装Apache2
sudo apt install apache2 -y
##启动，停止，重启
service apache2 start
service apache2 stop
service apache2 restart

测试apache是否安装好只需要在浏览器中打开localhost，如果能看见apache的页面，就说明安装好了

#4.安装 MySQL （ MariaDB ）
新的系统好像不能按照 MySQL 了，提示已经被 MariaDB 代替了，所以直接输入

##安装
sudo apt install  mariadb-server-10.0 mariadb-client-10.0
##登录
mysql -uroot -p   #没有密码直接回车进入
##修改root密码
sudo mysqladmin -u root -p password 
  Enter password:        #我安装的这个版本安装时没有设置root密码的提示，这个随便输 
  New password:     #填你的密码 
  Confirm new password:   #再次填你的密码
##设置远程登录的权限 
mysql -uroot -p123456     #123456是设置的密码
USE mysql;
UPDATE user SET host = '%' WHERE user = 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '' WITH GRANT OPTION; 
FLUSH PRIVILEGES;
##退出
exit;
##重启
sudo service mysql stop 
sudo service mysql startba

#5.创建数据库（快递跟踪需要）
##进入数据库
mysql -uroot -p
输入密码
##创建MM数据库
CREATE DATABASE IF NOT EXISTS MM default charset utf8 COLLATE utf8_general_ci;
##在MM中新建一个postcode的表
USE MM;
CREATE TABLE postcode (postcode VARCHAR(255));
ALTER TABLE `postcode` ADD PRIMARY KEY (postcode); 
##退出
exit;

#6.安装php7.3，和php7.3-mysql
sudo apt-get install php7.3 php7.3-mysql

#7.运行魔镜
先下载工程
删除apache2已有的 index.html 文件
直接用Samba传到树莓派中，放到apache根目录中，我的是 /var/www/html
打开浏览器，输入localhost，应该就可以了
#8.设置树莓派开机自动启动 Chomium 并打开魔镜页面
cd /home/pi/.config
mkdir autostart
cd autostart
sudo nano my.desktop

##加入一下内容
[Desktop Entry]
Type=Application
Exec=chromium-browser  --disable-popup-blocking --no-first-run --disable-desktop-notifications  --kiosk "http://127.0.0.1"
##重启树莓派
sudo reboot