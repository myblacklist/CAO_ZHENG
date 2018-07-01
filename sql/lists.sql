/*
Navicat MySQL Data Transfer

Source Server         : FinalJob
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : cao_zheng

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2018-04-01 13:33:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lists
-- ----------------------------
DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lists
-- ----------------------------
INSERT INTO `lists` VALUES ('22', '割发代首');
INSERT INTO `lists` VALUES ('25', '撒大大');
INSERT INTO `lists` VALUES ('27', '电风扇');
INSERT INTO `lists` VALUES ('28', '艾斯德斯');
INSERT INTO `lists` VALUES ('29', 'WEb前端');
