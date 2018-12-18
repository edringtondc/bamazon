// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product

//display all the items available for sale (id, name, price)
var inquirer = require("inquirer");
//read from database - and display
var mysql = require("mysql");
var products = [];
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

var menuItems = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];



function startManager() {


    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "managerlist",
            choices: menuItems,

        }
    ]).then(function (inq) {

        var commands = inq.managerlist

        switch (commands) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;

            default:
                console.log("That is not an option")


        }
        startManager(products);


    })
}

startManager(products)
function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log(`
        ID: ${res[i].item_id}
        Product: ${res[i].product_name}
        Department: ${res[i].department_name}
        Price ${res[i].price}
        In Stock: ${res[i].stock_quantity}
        `)

        };

    });
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT product_name FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
        };
        // startProgram(products);
    });
}

function viewLowInventory() {
    console.log("you want to view low inventory")

    var sql = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <=5"
    connection.query(sql, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(`
            ID: ${res[i].item_id}
            Product: ${res[i].product_name}
            In Stock: ${res[i].stock_quantity}
            `)

        };



    });

    //show inventory less than five
}
function addInventory() {
    console.log("you want to add to the inventory")
    connection.query("SELECT product_name, stock_quantity FROM products", function (err, res) {
        if (err) throw err;

        var stock = [];
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
            stock.push(res[i.stock_quantity]);

        };
        // startProgram(products);
        inquirer.prompt([
            {
                type: "list",
                message: "What item do you want to add inventory for?",
                name: "item",
                choices: products
            }
        ]).then(function (inq) {


            console.log(`you want to update for ${inq.item}`)

            var sql = "SELECT stock_quantity FROM products WHERE product_name =?"
            var product = inq.item;
            connection.query(sql, [product], function (err, res) {
                if (err) throw err;
                // console.log(res)
                var inStock = parseInt(res[0].stock_quantity);
                console.log(`Your have ${inStock} in stock`);


                inquirer.prompt([
                    {
                        type: "input",
                        message: `How many ${product}'s would you like to add to the inventory?`,
                        name: "amount"

                    }
                ]).then(function (inq) {
                    inStock = inStock + parseInt(inq.amount);
                    updateStock(product, inStock);

                })
            });
        })

    });
}

function updateStock(product, inStock) {

    var sql2 = "UPDATE products SET stock_quantity = ? WHERE product_name = ?"

    connection.query(sql2, [inStock, product], function (err, res) {

        if (err) throw err;
        // console.log(res)
        console.log(`Updated ${product} inventory to ${inStock}`)
    })
}

function addProduct() {
    console.log("you want to add a new product")

    inquirer.prompt([
        {
            type: "input",
            message: "Name of product",
            name: "name"
        },
        {
            type: "input",
            message: "Department of product",
            name: "department"
        },
        {
            type: "input",
            message: "Price of product",
            name: "price"
        },
        {
            type: "input",
            message: "Amount of product to add to inventory",
            name: "stock"
        }
    ]).then(function (inq) {
        var name = inq.name;
        var department = inq.department;
        var price = inq.price;
        var stock = inq.stock;

        var sql = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${name}", "${department}", "${price}", "${stock}")`;

        console.log(sql)
        connection.query(sql, function (err, res) {
            console.log(`${name} was added to the store`)

        })
    })
}