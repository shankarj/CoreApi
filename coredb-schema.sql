CREATE SCHEMA `new_schema` ;

USE coredb;

CREATE TABLE `configs` (
  `groupname` varchar(45) NOT NULL,
  `keyname` varchar(45) NOT NULL,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`groupname`,`keyname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
