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

var options = ["View Product Sales by Department", "Create New Department"];

function startSupervisor() {


    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: options,

        }
    ]).then(function (inq) {
        choice = inq.option
        
        

        switch(choice){
            case "View Product Sales by Department":
            viewProductSales();
            break;

            case "Create New Department":
            createNewDepart();
            break

            default:
            console.log("pick an action");
        }
    })
}

startSupervisor();

function viewProductSales(){
    console.log("Viewing Product Sales");

    console.log(``)

    // department_id
    // department_name
    // over_head_costs

    
    // product_sales
    // total_profit



}

function createNewDepart(){
    console.log("Create New Department");

        inquirer.prompt([
            {
                type: "input",
                message: "What Department do you want to add??",
                name: "department"
            },
            {
                type: "input",
                message: "How much is the overhead?",
                name: "overhead"

            }
        ]).then(function(inq) {

            var department = inq.department;
            var overhead = inq.overhead
            
            var sql = "INSERT INTO departments(department_name, department_overhead) VALUES"
            sql += (`("${department}", ${overhead});`);

            // console.log(sql);

            connection.query(sql, function (err, res) {
                if (err) throw err;
                // console.log(res)
                console.log(`Added ${department} with an overhead of ${overhead}`);
            });
        })

    }
