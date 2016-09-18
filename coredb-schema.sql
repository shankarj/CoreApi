CREATE SCHEMA `coredb`;

use `coredb`;

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
  `element_type` varchar(50) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `props_json` json NOT NULL,
  `props_interface_json` json DEFAULT NULL,
  `description_json` json DEFAULT NULL,
  `visibility` varchar(50) DEFAULT 'public',
  `owner_id` varchar(50) NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lookup_map` (
  `session_id` varchar(50) NOT NULL,
  `minion_id` varchar(50) NOT NULL,
  `mode` varchar(45) NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `projects` (
  `project_id` varchar(50) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `snapshot_id` varchar(50) NOT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `structure_json` json DEFAULT NULL,
  `conns_json` json DEFAULT NULL,
  `settings_json` json DEFAULT NULL,
  `owner_id` varchar(50) NOT NULL,
  PRIMARY KEY (`project_id`,`snapshot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `training_profile` (
  `profile_id` varchar(50) NOT NULL,
  `profile_json` json NOT NULL,
  `owner_id` varchar(50) NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `user_id` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email_id` varchar(45) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

