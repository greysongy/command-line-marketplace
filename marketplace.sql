CREATE DATABASE market_db;

USE market_db;

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(100), 
    department_name VARCHAR(100), 
    price FLOAT, 
    stock_quantity INT, 
    PRIMARY KEY(id)
)

INSERT INTO inventory (product_name, department_name, price, stock_quantity) 
VALUES ("Test1", "D1", 1, 10), 
    ("Test2", "D2", 2, 20), 
    ("Test3", "D3", 3, 30), 
    ("Test4", "D4", 4, 40), 
    ("Test5", "D5", 5, 50), 
    ("Test6", "D6", 6, 60), 
    ("Test7", "D7", 7, 70), 
    ("Test8", "D8", 8, 80), 
    ("Test9", "D9", 9, 90), 
    ("Test10", "D10", 10, 100);