DROP DATABASE IF EXISTS cart;

CREATE DATABASE cart;

USE cart;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(25),
  email VARCHAR(50),
  pass VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE cc (
  cc INT,
  cc_exp INT,
  cc_code INT,
  cc_zip INT(5),
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES users (id)
);

CREATE TABLE shipping (
  street VARCHAR(50),
  city VARCHAR(30),
  stateof VARCHAR(2),
  zip INT(5),
  phone VARCHAR(14),
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES users (id)
);
