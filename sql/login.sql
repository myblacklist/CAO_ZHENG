/*
Navicat MySQL Data Transfer

Source Server         : FinalJob
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : cao_zheng

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2018-04-01 13:33:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) DEFAULT NULL,
  `userPass` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', 'root', '123456');
