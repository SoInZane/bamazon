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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("playstation 4", "electronics", 299.99, 20),
("xbox one", "electronics", 299.99, 25),
("coleman sundome tent", "sporting goods", 57.79, 34),
("coleman sleeping bag blue", "sporting goods", 24.99, 11),
("kitchenaid 5qt mixer", "home and kitchen", 199.99, 5),
("royal stainless stell flatware set 20pc", "home and kitchen", 15.99, 98),
("hp printer paper 8.5 x 11", "office products", 5.99, 500),
("crayola colored pencils 24 colors", "office products", 11.49, 1),
("gorilla super glue", "hardware", 4.97, 4),
("glad tall kitchen trash bags 13 gal 80 ct", "household", 10.39, 23);

SELECT * FROM products;