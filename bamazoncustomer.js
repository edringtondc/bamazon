
//display all the items available for sale (id, name, price)
var inquirer = require("inquirer");
//read from database - and display
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonfake_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
//   connection.end();
  
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  readProducts();

//inquirer
    //ask customer to choose id of item they want to purchase
    //ask customer how much they want to buy

    //check if there is enough in stock
        // not - print insufficient quantity and end order
        //if yes - fulfill order
            //update sql to reflect remaining quantity. 
            //show user total of purchase price



inquirer. prompt([
    {
        type: "choices",
        message: "Which item would you like to purchase?",
        name: "purchaseId"

    }
])

        

