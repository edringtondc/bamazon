DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INT(10),
    product_sales DECIMAL(10,2),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    department_overhead DECIMAL(10, 2),
    PRIMARY KEY(department_id)
);

SELECT * FROM products, departments;
