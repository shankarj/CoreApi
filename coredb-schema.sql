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

CREATE TABLE `trainingprofiles` (
  `profile_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `training_type` varchar(45) DEFAULT NULL,
  `batch_size` int(11) DEFAULT NULL,
  `epochs` int(11) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`profile_id`,`user_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `snapshots` (
  `snapshot_id` varchar(45) NOT NULL,
  `project_id` varchar(45) NOT NULL,
  `network_structure` varchar(45) DEFAULT NULL,
  `network_conns` varchar(45) DEFAULT NULL,
  `training_profile` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`snapshot_id`,`user_id`,`project_id`),
  KEY `fk_project_id_snap_idx` (`project_id`),
  KEY `fk_user_id_snap_idx` (`user_id`),
  KEY `fk_training_id_snap_idx` (`training_profile`),
  CONSTRAINT `fk_project_id_snap` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_training_id_snap` FOREIGN KEY (`training_profile`) REFERENCES `trainingprofiles` (`profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id_snap` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `projects` (
  `project_id` varchar(45) NOT NULL,
  `project_name` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `createdtime` datetime DEFAULT NULL,
  `updatedtime` datetime DEFAULT NULL,
  PRIMARY KEY (`project_id`,`project_name`,`user_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
