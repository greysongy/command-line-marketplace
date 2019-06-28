DROP DATABASE IF EXISTS market_db;

CREATE DATABASE market_db;

USE market_db;

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(100), 
    department_name VARCHAR(100), 
    price FLOAT, 
    stock_quantity INT, 
    PRIMARY KEY(id)
);

INSERT INTO inventory (product_name, department_name, price, stock_quantity) 
VALUES ("Amazon Echo1", "Tech", 24.99, 3), 
    ("Instant Pot Pressure Cooker", "Kitchen", 59.00, 20), 
    ("Air Vent Magnetic Car Mount", "Entertainment", 7.48, 42), 
    ("Fire HD Tablet", "Tech", 79.99, 55), 
    ("32 GB Memory Card", "Tech", 12.91, 11), 
    ("Wireless Headphones with App Control", "Entertainment", 36.99, 2), 
    ("Robotic Vaccum Cleaner", "Home", 139.95, 70), 
    ("Bluetooth Soundbuds", "Entertainment", 25.99, 43), 
    ("Kindle Paperwhite", "Tech", 89.99, 96), 
    ("Fire TV Stick", "Tech", 39.99, 120);