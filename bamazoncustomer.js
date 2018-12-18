
//display all the items available for sale (id, name, price)
var inquirer = require("inquirer");
//read from database - and display
var mysql = require("mysql");
const cTable = require('console.table');

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
var table = [];
function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);

            var item = {
                name: res[i].product_name,
                price: res[i].price
            }

            table.push(item)

        };

        console.table(table)

        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to shop at Bamazon?",
                name: "confirm",
                default: true
            }
        ]).then(function (inq) {
            if (inq.confirm) {
                startProgram(choices);
            } else {
                console.log("Have a great day!");
                connection.end();
            }
        })

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

    // console.table

    inquirer.prompt([
        {
            type: "list",
            message: "Which item would you like to purchase?",
            name: "product",
            choices: choices,
        }
    ]).then(function (inq) {

        var productChoice = inq.product;

        console.log(`
    You chose ${productChoice}
        `);

        inquirer.prompt([
            {
                type: "input",
                message: `How many would you like to buy?`,
                name: "amount",
                validate: function(answer) {
                    if (!parseInt(answer)) {
                        return "Amount must be a number";
                    }
                    return true;
                }
            }
        ]).then(function (inq) {

            console.log(`
    You want ${inq.amount} of ${productChoice}
        `)
            checkAmount(inq.amount, productChoice)
            // startProgram(choices);
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

        var inStock = res[0].stock_quantity

        if (inStock >= amount) {
            console.log(`
     Great! We can fulfill that order!
            `)
            purchaseItem(amount, product, inStock)
            //delete amount from in stock
            //show user the price for that amount
        } else {
            console.log(`
    We have only have ${inStock}
            `)
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "do you want to purchase a different amount?",
                    name: "tryagain"
                }
            ]).then(function (inq) {

                if (inq.tryagain) {

                    startProgram(choices);

                } else {
                    console.log(`
    ok goodbye!
                                `)
                    connection.end();
                }
            })
        }
    })
}

function purchaseItem(amount, product, inStock) {

    var price = 0;
    var currentSales = 0;
    var newSales = 0;
    var newStock = inStock - amount;

    //selects product name and gathers the price from there
    var sql = "SELECT price, product_sales FROM products WHERE product_name =?"
    var product = product;

    connection.query(sql, [product], function (err, res) {
        currentSales = res[0].product_sales;
        price = amount * res[0].price
        newSales = currentSales + price;
        console.log(`
    Your order costs $${price}
        `);
        updateStock(inStock, product);
        updateSales(newSales, product);
        startProgram(choices);

    });


    function updateSales(newSales, product) {
        var sql4 = "UPDATE products SET product_sales = ? WHERE product_name = ?"


        connection.query(sql4, [newSales, product], function (err, res) {
            // console.log(`Stock updated`)
            if (err) throw err;

        })
    }

}

function updateStock(newStock, product) {
    //selects current stock quantity and update the new amount


    var sql2 = "UPDATE products SET stock_quantity = ? WHERE product_name = ?"

    connection.query(sql2, [newStock, product], function (err, res) {
        if(err) throw err;
        // console.log(`Stock updated`)

    })


}