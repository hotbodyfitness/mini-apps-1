DROP DATABASE IF EXISTS cart;

CREATE DATABASE cart;

USE cart;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(25),
  email VARCHAR(50),
  pass VARCHAR(50),
  shipping VARCHAR(100),
  phone INT(10),
  cc INT,
  cc_exp INT,
  cc_code INT,
  cc_zip INT(5),
  PRIMARY KEY (id)
);
