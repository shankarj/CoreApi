CREATE SCHEMA `coredb` ;

USE coredb;

CREATE TABLE `configs` (
  `groupname` varchar(45) NOT NULL,
  `keyname` varchar(45) NOT NULL,
  `value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`groupname`,`keyname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `user_id` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email_id` varchar(45) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `deployments` (
  `resource_id` varchar(50) NOT NULL,
  `mode` int(11) NOT NULL DEFAULT '0',
  `deployed_by` varchar(50) NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `elements` (
  `element_id` varchar(50) NOT NULL,
  `element_name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `props_json` json NOT NULL,
  `props_interface_json` json DEFAULT NULL,
  `description_json` json DEFAULT NULL,
  `visibility` int(11) DEFAULT NULL,
  `owner_id` varchar(50) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lookup_map` (
  `session_id` varchar(50) NOT NULL,
  `minion_id` varchar(50) NOT NULL,
  `mode` varchar(45) NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `projects` (
  `project_id` varchar(50) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `snapshot_id` varchar(50) DEFAULT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `structure_json` json DEFAULT NULL,
  `conns_json` json DEFAULT NULL,
  `training_profile_id` varchar(50) DEFAULT NULL,
  `settings_json` json DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `datasets` (
  `d_id` varchar(45) NOT NULL,
  `d_name` varchar(45) DEFAULT NULL,
  `d_type` varchar(45) DEFAULT NULL,
  `d_size` int(11) DEFAULT NULL,
  `d_location` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `physical_name` varchar(45) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`d_id`),
  KEY `fk_user_idx` (`user_id`),
  CONSTRAINT `fk_user_datasets` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
