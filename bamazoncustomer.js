
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
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // connection.end();
});

var choices = [];

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);

        };
        startProgram(choices);

    });



}
// console.log(choices)




//inquirer
//ask customer to choose id of item they want to purchase
//ask customer how much they want to buy

//check if there is enough in stock
// not - print insufficient quantity and end order
//if yes - fulfill order
//update sql to reflect remaining quantity. 
//show user total of purchase price
readProducts();
function startProgram(choices) {


    inquirer.prompt([
        {
            type: "list",
            message: "Which item would you like to purchase?",
            name: "product",
            choices: choices,

        }
    ]).then(function (inq) {

        var productChoice = inq.product;

        console.log(`You chose ${productChoice}`);

        inquirer.prompt([
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "amount"
                //validate
            }
        ]).then(function (inq) {
            console.log(`You want ${inq.amount} of ${productChoice}`)
            checkAmount(inq.amount, productChoice)


        })
    })
}

function checkAmount(amount, productChoice) {

    var sql = "SELECT stock_quantity FROM products WHERE product_name =?"
    var amount = amount;
    var product = productChoice;

    // console.log(amount)
    // console.log(product)

    connection.query(sql, product, function (err, res) {
        if (err) throw err;
        console.log( "result " + res[0].stock_quantity);
    })
}