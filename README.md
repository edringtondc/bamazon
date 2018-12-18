# bamazon

###CUSTOMER APP


##mysql database table with the followin
item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

![Image of MySQL database](/images/database.png)


###Link to the repository
[GitHub Repo](http://github.com)

###Functionality of the CLI App:


Utilizing inquirer npm package the CLI asks the user what item they would like to use. The questions are dynamically created from the database.

Then the app asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks the database to see if there is enough in stock. If not the app alerts the user then prevents the order from going through.



However, if the store does have enough of the product, it fulfills the customer's order.


This updates the SQL database to reflect the remaining quantity and then shows the customer the total cost of their purchase.

![Watch the gif of Bamazon - customer in action](/images/BamazonCustomer.gif)


