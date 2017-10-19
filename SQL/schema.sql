DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE products(

	item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price FLOAT NOT NULL,
	stock_quantity INTEGER(100) NOT NULL,
	product_sales  INTEGER(100) NUll

)


CREATE TABLE departments (

	department_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
	department_name VARCHAR(50) NOT NUll,
	over_head_costs INTEGER(100) NULL

)