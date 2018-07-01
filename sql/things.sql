/*
Navicat MySQL Data Transfer

Source Server         : FinalJob
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : cao_zheng

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2018-04-01 13:33:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for things
-- ----------------------------
DROP TABLE IF EXISTS `things`;
CREATE TABLE `things` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `urgent` int(11) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `isdelete` int(11) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of things
-- ----------------------------
INSERT INTO `things` VALUES ('1', '愉快1CV', '1', '2018-06-16', '0', '4');
INSERT INTO `things` VALUES ('2', '结合客户', '1', '2018-06-17', '0', '2');
INSERT INTO `things` VALUES ('28', '的神色从V型', '1', '2018-06-16', '1', '5');
INSERT INTO `things` VALUES ('29', '分隔符', '1', '2018-06-16', '0', '1');
INSERT INTO `things` VALUES ('30', '大师傅电风扇', '1', '2018-06-15', '0', '2');
INSERT INTO `things` VALUES ('31', '的说法', '1', '2018-06-16', '0', '2');
INSERT INTO `things` VALUES ('32', 'test111', '3', '2018-06-22', '1', '2');
INSERT INTO `things` VALUES ('35', 'dddd', '3', '2018-06-13', '1', '2');
INSERT INTO `things` VALUES ('38', 'mmm', '1', '2017-12-09', '0', '2');
INSERT INTO `things` VALUES ('39', '再见', '3', '2019-12-31', '0', '2');
INSERT INTO `things` VALUES ('40', 'mm', '2', '2018-12-08', '0', '2');
INSERT INTO `things` VALUES ('41', '撒打算', '1', '2018-06-20', '1', '2');
INSERT INTO `things` VALUES ('42', '到底是发生的全球', '1', '2018-06-20', '1', '1');
INSERT INTO `things` VALUES ('43', 'asdas', '1', '2018-12-30', '1', '2');
INSERT INTO `things` VALUES ('44', 'aaaaaaaaaaa', '1', '2014-05-08', '0', '3');
INSERT INTO `things` VALUES ('45', 'dddddddddddddddd', '1', '2014-08-15', '0', '22');
INSERT INTO `things` VALUES ('46', '大杀四方', '2', '2015-06-05', '0', '2');
INSERT INTO `things` VALUES ('47', '让发个', '2', '2018-03-28', '0', '21');
INSERT INTO `things` VALUES ('48', '大师的撒', '2', '2018-05-12', '0', '25');
INSERT INTO `things` VALUES ('49', '沙发', '1', '2017-06-06', '0', '25');
INSERT INTO `things` VALUES ('50', '水电费', '3', '2015-04-07', '0', '25');
INSERT INTO `things` VALUES ('51', '胜多负少', '1', '2018-06-28', '0', '1');
INSERT INTO `things` VALUES ('52', '封禅大典', '2', '2018-06-28', '0', '1');
INSERT INTO `things` VALUES ('53', '第三方的', '1', '2018-07-01', '0', '1');
INSERT INTO `things` VALUES ('55', '复习', '1', '2099-05-28', '1', '29');
