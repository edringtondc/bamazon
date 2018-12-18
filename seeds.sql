INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) 
values ("Acromantula", "Magical Creatures", 1000, 50, 0), ("Snitch", "Quidditch Supplies", 42.50, 100, 0),
("Bludger", "Quidditch Supplies", 7.99, 200, 0),("Cockroach Clusters", "Wizard Sweets", 12.50, 20, 0),
("Drooble's Best Blowing Gum", "Wizarding Sweets", 9.66, 12, 0 ),("Gillyweed", "Magical Herbs", 12.50, 230, 0),
("Dress Robes", "Garments", 45, 5, 0 ),("Hogwarts Uniform Robes", "Garments", 30, 200, 0),("Weasleys’ Wildfire Whiz-bangs", "Enchanted Fire Works", 129.99, 40, 0);
   


SELECT*FROM products;

INSERT INTO departments (department_name, department_overhead) 
VALUES ("Magical Creatures", 1500), ("Quidditch Supplies",3000.50),
("Bludger", "Wizard Sweets", 16000),
("Magical Herbs", 2300),( "Garments", 45999 ),("Enchanted Fire Works", 199900);
   
SELECT * FROM departments;