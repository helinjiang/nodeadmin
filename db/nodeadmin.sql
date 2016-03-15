-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-01 06:18:03
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodeadmin`
--

-- --------------------------------------------------------

--
-- 表的结构 `think_car`
--

CREATE TABLE IF NOT EXISTS `think_car` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) unsigned NOT NULL,
  `name` varchar(64) NOT NULL,
  `buydate` date NOT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carownerid` (`ownerId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `think_car`
--

INSERT INTO `think_car` (`id`, `ownerId`, `name`, `buydate`, `state`) VALUES
(1, 3, 'car1', '2016-02-01', 1),
(3, 39, 'test', '2016-02-22', -1),
(4, 39, 'test1', '2015-12-12', 1),
(5, 38, 'sdfasdf', '2015-12-12', 1),
(6, 38, 'sdafadsf', '2015-12-12', 1),
(7, 38, 'asd', '2015-12-12', 1);

-- --------------------------------------------------------

--
-- 表的结构 `think_coding`
--

CREATE TABLE IF NOT EXISTS `think_coding` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tableName` varchar(64) NOT NULL,
  `targetName` varchar(64) NOT NULL,
  `targetDesc` varchar(255) DEFAULT '',
  `menuId` varchar(64) NOT NULL,
  `breadcrumb` varchar(255) NOT NULL,
  `state` int(1) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tableName` (`tableName`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `think_coding`
--

INSERT INTO `think_coding` (`id`, `tableName`, `targetName`, `targetDesc`, `menuId`, `breadcrumb`, `state`) VALUES
(1, 'think_user', '用户', '管理登录用户de信息', 'menuUser', '首页|/admin|home;系统管理;用户管理', 1),
(4, 'think_car', '汽车', '汽车管理', 'menuCar', '管理汽车信息" items="首页|/admin|home;系统管理;汽车管理', 1);

-- --------------------------------------------------------

--
-- 表的结构 `think_codingitem`
--

CREATE TABLE `think_codingitem` (
  `id` int(11) UNSIGNED NOT NULL,
  `codingId` int(11) UNSIGNED NOT NULL,
  `fieldName` varchar(32) NOT NULL,
  `cnName` varchar(32) NOT NULL,
  `dbName` varchar(32) NOT NULL,
  `state` int(1) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `think_codingitem`
--

INSERT INTO `think_codingitem` (`id`, `codingId`, `fieldName`, `cnName`, `dbName`, `state`) VALUES
(1, 1, 'name', '姓名', 'name', 1),
(3, 4, 'pwd', '密码', 'pwd', 1);

-- --------------------------------------------------------

--
-- 表的结构 `think_user`
--

CREATE TABLE IF NOT EXISTS `think_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `pwd` char(64) NOT NULL DEFAULT '',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime NOT NULL,
  `state` int(1) NOT NULL DEFAULT '-1' COMMENT '数据有效性，-1:无效，1:有效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- 转存表中的数据 `think_user`
--

INSERT INTO `think_user` (`id`, `name`, `pwd`, `birthday`, `createTime`, `updateTime`, `state`) VALUES
(3, 'admin', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(4, 'admin1', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', -1),
(5, 'admin2', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(6, 'admin3', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(7, 'admin4', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(8, 'admin5', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(9, 'admin6', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(10, 'admin7', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(11, 'admin8', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(12, 'admin9', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(13, 'admin10', 'c981387ec2067dae27b55dc0bffbdd97', NULL, NULL, '0000-00-00 00:00:00', 1),
(14, '232', 'd19d84d9d70a0d6d7c9c6662836f9f5e', NULL, '2016-02-19 09:40:40', '2016-02-19 09:40:40', 1),
(15, 'hehe', 'e8a2cc4518be711dddd315854f4fceae', NULL, '2016-02-19 09:41:14', '2016-02-19 09:41:14', 1),
(16, 'hehe1', 'e8a2cc4518be711dddd315854f4fceae', NULL, '2016-02-19 09:45:17', '2016-02-19 09:45:17', 1),
(17, 'erere', '3806d3d48fd171baae172263d6154aae', NULL, '2016-02-19 09:45:27', '2016-02-19 09:45:27', 1),
(18, 'sdfsdf', '942f1edb852fd75c7beb9eddaae69655', NULL, '2016-02-19 10:54:43', '2016-02-19 10:54:43', 1),
(19, '1111', '18d842cc48bd9925e7f9e83b1518118d', NULL, '2016-02-19 10:58:23', '2016-02-19 10:58:23', 1),
(20, '5555', '6ddf7d72448a42f8e17e914ecb144b11', NULL, '2016-02-19 11:23:05', '2016-02-19 11:23:05', 1),
(21, '2323', '70ac920a9116efcdb0275c42bdbbe55c', NULL, '2016-02-19 11:30:36', '2016-02-19 11:30:36', 1),
(22, '123', 'd4d70ad4aec94db0225326dc14bbae62', NULL, '2016-02-19 11:33:03', '2016-02-19 11:33:03', 1),
(23, '12223', '3a54fff2037f9ed7b2c67105dcf230c4', NULL, '2016-02-19 13:20:07', '2016-02-19 13:20:07', 1),
(24, '2323', '9665e7d57e271b194c559d2530976002', NULL, '2016-02-19 13:40:39', '2016-02-19 13:40:39', -1),
(25, '23231', '98a54de217998406ae11e0f523c97981', NULL, '2016-02-19 13:42:36', '2016-02-19 13:42:36', -1),
(26, '23232', '3b73f50e5554ace5f62115aa1976422a', NULL, '2016-02-19 13:44:33', '2016-02-19 13:44:33', -1),
(27, '23233', '2f2f382d580a0a05600400fa3f06905c', NULL, '2016-02-19 13:45:28', '2016-02-19 13:45:28', -1),
(28, '23234', '74551304008dbdf9bf81916635f2e615', NULL, '2016-02-19 13:47:06', '2016-02-19 13:47:06', -1),
(29, '23235', 'c4f4c893ee27c551ff48adc6852a3751', NULL, '2016-02-19 13:48:20', '2016-02-19 13:48:20', -1),
(30, 'sdfsdf', '74551304008dbdf9bf81916635f2e615', NULL, '2016-02-19 13:54:14', '2016-02-19 13:54:14', 1),
(31, 'sd3', '74551304008dbdf9bf81916635f2e615', NULL, '2016-02-19 13:54:57', '2016-02-19 13:54:57', 1),
(32, 'sdfadf', 'b92363de2ba2a542b2d2acfc71ea8c49', NULL, '2016-02-19 14:59:06', '2016-02-19 14:59:06', 1),
(33, 'aaa', '6dc680d8059749e7fb782cff118279d1', NULL, '2016-02-20 21:54:23', '2016-02-20 21:54:23', -1),
(34, 'dsfds', '37f36c46f72ab0aa4eb210c2bf7a4650', '2016-02-03', '2016-02-21 11:44:59', '2016-02-21 11:44:59', 1),
(35, 'asdf', '37f36c46f72ab0aa4eb210c2bf7a4650', '2016-02-03', '2016-02-21 11:44:37', '2016-02-21 11:44:37', 1),
(37, 'ggg', 'b92363de2ba2a542b2d2acfc71ea8c49', '2015-12-12', '2016-02-20 23:13:21', '2016-02-20 23:13:21', 1),
(38, 'aaas', '37f36c46f72ab0aa4eb210c2bf7a4650', '2016-02-01', '2016-02-21 10:45:32', '2016-02-21 17:15:40', 1),
(39, 'aaas1', 'ef1570f9b7e885b1395e66fd8172c896', '2015-12-12', '2016-02-21 17:37:42', '2016-02-21 17:37:42', 1);

--

--
-- 限制表 `think_car`
--
ALTER TABLE `think_car`
  ADD CONSTRAINT `carownerid` FOREIGN KEY (`ownerId`) REFERENCES `think_user` (`id`);

--
-- 限制表 `think_codingitem`
--
ALTER TABLE `think_codingitem`
  ADD CONSTRAINT `produceId` FOREIGN KEY (`codingId`) REFERENCES `think_coding` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
