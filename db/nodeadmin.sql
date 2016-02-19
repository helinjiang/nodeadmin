-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-02-19 10:45:08
-- 服务器版本： 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeadmin`
--

-- --------------------------------------------------------

--
-- 表的结构 `think_user`
--

CREATE TABLE `think_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT '',
  `pwd` char(64) NOT NULL DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime NOT NULL,
  `state` int(1) NOT NULL DEFAULT '-1' COMMENT '数据有效性，-1:无效，1:有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `think_user`
--

INSERT INTO `think_user` (`id`, `name`, `pwd`, `createTime`, `updateTime`, `state`) VALUES
(1, 'hhh', 'e10adc3949ba59abbe56e057f20f883e', NULL, '0000-00-00 00:00:00', 1),
(3, 'admin', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(4, 'admin1', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', -1),
(5, 'admin2', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(6, 'admin3', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(7, 'admin4', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(8, 'admin5', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(9, 'admin6', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(10, 'admin7', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(11, 'admin8', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(12, 'admin9', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(13, 'admin10', 'c981387ec2067dae27b55dc0bffbdd97', NULL, '0000-00-00 00:00:00', 1),
(14, '232', 'd19d84d9d70a0d6d7c9c6662836f9f5e', '2016-02-19 09:40:40', '2016-02-19 09:40:40', 1),
(15, 'hehe', 'e8a2cc4518be711dddd315854f4fceae', '2016-02-19 09:41:14', '2016-02-19 09:41:14', 1),
(16, 'hehe1', 'e8a2cc4518be711dddd315854f4fceae', '2016-02-19 09:45:17', '2016-02-19 09:45:17', 1),
(17, 'erere', '3806d3d48fd171baae172263d6154aae', '2016-02-19 09:45:27', '2016-02-19 09:45:27', 1),
(18, 'sdfsdf', '942f1edb852fd75c7beb9eddaae69655', '2016-02-19 10:54:43', '2016-02-19 10:54:43', 1),
(19, '1111', '18d842cc48bd9925e7f9e83b1518118d', '2016-02-19 10:58:23', '2016-02-19 10:58:23', 1),
(20, '5555', '6ddf7d72448a42f8e17e914ecb144b11', '2016-02-19 11:23:05', '2016-02-19 11:23:05', 1),
(21, '2323', '70ac920a9116efcdb0275c42bdbbe55c', '2016-02-19 11:30:36', '2016-02-19 11:30:36', 1),
(22, '123', 'd4d70ad4aec94db0225326dc14bbae62', '2016-02-19 11:33:03', '2016-02-19 11:33:03', 1),
(23, '12223', '3a54fff2037f9ed7b2c67105dcf230c4', '2016-02-19 13:20:07', '2016-02-19 13:20:07', 1),
(24, '2323', '9665e7d57e271b194c559d2530976002', '2016-02-19 13:40:39', '2016-02-19 13:40:39', -1),
(25, '23231', '98a54de217998406ae11e0f523c97981', '2016-02-19 13:42:36', '2016-02-19 13:42:36', -1),
(26, '23232', '3b73f50e5554ace5f62115aa1976422a', '2016-02-19 13:44:33', '2016-02-19 13:44:33', -1),
(27, '23233', '2f2f382d580a0a05600400fa3f06905c', '2016-02-19 13:45:28', '2016-02-19 13:45:28', -1),
(28, '23234', '74551304008dbdf9bf81916635f2e615', '2016-02-19 13:47:06', '2016-02-19 13:47:06', -1),
(29, '23235', 'c4f4c893ee27c551ff48adc6852a3751', '2016-02-19 13:48:20', '2016-02-19 13:48:20', -1),
(30, 'sdfsdf', '74551304008dbdf9bf81916635f2e615', '2016-02-19 13:54:14', '2016-02-19 13:54:14', 1),
(31, 'sd3', '74551304008dbdf9bf81916635f2e615', '2016-02-19 13:54:57', '2016-02-19 13:54:57', 1),
(32, 'sdfadf', 'b92363de2ba2a542b2d2acfc71ea8c49', '2016-02-19 14:59:06', '2016-02-19 14:59:06', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `think_user`
--
ALTER TABLE `think_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `think_user`
--
ALTER TABLE `think_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
