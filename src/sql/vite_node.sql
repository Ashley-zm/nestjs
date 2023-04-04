/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : vite_node

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 04/04/2023 17:52:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `MenuId` int(0) NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `MenuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单name',
  `ParentId` int(0) NULL DEFAULT NULL COMMENT '父菜单id',
  `IsMenu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否是菜单',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单code',
  PRIMARY KEY (`MenuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '首页', NULL, '1', NULL);
INSERT INTO `menu` VALUES (2, '实时监控', NULL, '1', NULL);
INSERT INTO `menu` VALUES (3, '实时数据', 2, '1', NULL);
INSERT INTO `menu` VALUES (4, '查询', 3, '0', NULL);
INSERT INTO `menu` VALUES (5, '用户管理', NULL, '1', '/TheUser');
INSERT INTO `menu` VALUES (6, '一张图', NULL, '1', '/TheMap');
INSERT INTO `menu` VALUES (7, '查询', 5, '0', '/TheUser/search');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `RID` int(0) NOT NULL AUTO_INCREMENT,
  `RName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '管理员');
INSERT INTO `role` VALUES (2, '普通用户');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `RMId` int(0) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `RoleId` int(0) NULL DEFAULT NULL COMMENT '角色id',
  `MenuId` int(0) NULL DEFAULT NULL COMMENT '菜单id',
  PRIMARY KEY (`RMId`) USING BTREE,
  INDEX `RoleId`(`RoleId`) USING BTREE,
  INDEX `MenuId`(`MenuId`) USING BTREE,
  CONSTRAINT `FK_9ef2ffd1c23b7b9cb9eb986377b` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_cf69c0d8b3b8c5861611fc6add5` FOREIGN KEY (`MenuId`) REFERENCES `menu` (`MenuId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1);
INSERT INTO `role_menu` VALUES (2, 1, 2);
INSERT INTO `role_menu` VALUES (3, 1, 3);
INSERT INTO `role_menu` VALUES (4, 1, 4);
INSERT INTO `role_menu` VALUES (5, 2, 5);
INSERT INTO `role_menu` VALUES (6, 2, 6);
INSERT INTO `role_menu` VALUES (7, 1, 5);
INSERT INTO `role_menu` VALUES (8, 2, 7);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` int(0) NOT NULL DEFAULT 1,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123456', 2, '1540522534@qq.com', '塞尔维亚', 'admin', '管理员');
INSERT INTO `user` VALUES (2, '123', 2, '1540522534@qq.com', '塞尔维亚', 'zm', '游客');
INSERT INTO `user` VALUES (12, 'C6C7627982C0B2EBEC88D49C873AB4D2', 1, NULL, NULL, 'cs', '测试');
INSERT INTO `user` VALUES (13, 'C6C7627982C0B2EBEC88D49C873AB4D2', 1, NULL, NULL, 'gly', '管理员');
INSERT INTO `user` VALUES (14, 'C6C7627982C0B2EBEC88D49C873AB4D2', 1, NULL, NULL, 'any', '阿尼亚');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `URId` int(0) NOT NULL AUTO_INCREMENT COMMENT '关联id',
  `UserId` int(0) NULL DEFAULT NULL COMMENT '用户id',
  `RoleId` int(0) NULL DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`URId`) USING BTREE,
  INDEX `UserId`(`UserId`) USING BTREE,
  INDEX `RoleId`(`RoleId`) USING BTREE,
  CONSTRAINT `FK_240e9cdd88493fac591b54fcd1a` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_35bf2e1b478caf33be100522753` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, 1);
INSERT INTO `user_role` VALUES (2, 2, 2);
INSERT INTO `user_role` VALUES (3, 14, 2);
INSERT INTO `user_role` VALUES (4, 12, 1);

SET FOREIGN_KEY_CHECKS = 1;
