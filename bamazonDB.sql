DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(8, 2) NOT NULL,
stock_quantity INTEGER,
PRIMARY KEY (item_id)
);