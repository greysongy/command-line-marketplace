var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "market_db"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("We connected with id " + connection.threadId);
    promptManagerDecision();
})

function displayItems(goBack) {
    connection.query("SELECT * FROM inventory",
        function (err, res) {
            if (err) throw err;
            // console.log("response");
            // console.log(res);
            var table = new Table();
            table.push(["Name", "Department", "Price", "Quantity"]);
            // console.log("Name:      Department:          Price:            Quantity:");
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i].product_name + " " + res[i].department_name + " " + res[i].price + " " + res[i].stock_quantity);
                table.push([res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            items = res;
            console.log(table.toString());
            if (goBack) {
                // console.log("This part ran");
                promptManagerDecision();
            }
            // else {

            // }
        })
}

function promptManagerDecision() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which action do you want to take?",
                choices: ["View Products for Sale", "View Low Inventory", "Quit"],
                name: "choice"
            }

        ])
        .then(function (response) {
            switch (response.choice) {
                case ("View Products for Sale"):
                    displayItems(true);
                    break;
                case ("View Low Inventory"):
                    viewLowInventory();
                    break;
                case ("Quit"):
                    connection.end();
                    break;
            }
        })
}

function viewLowInventory() {
    //how to better use the ?
    connection.query("SELECT * FROM inventory WHERE stock_quantity < 5",
        function (err, res) {
            var table = new Table();
            table.push(["Name", "Department", "Price", "Quantity"]);
            // console.log("Name:      Department:          Price:            Quantity:");
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i].product_name + " " + res[i].department_name + " " + res[i].price + " " + res[i].stock_quantity);
                table.push([res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            items = res;
            console.log(table.toString());
            promptManagerDecision();
        })
}

// function addInventory() {
//     // connection.query("INSERT INTO inventory SET ?", 
//     // {

//     // })
//     // displayItems(false);
//     inquirer
//         .prompt([
//             {
//                 type: "command",
//                 message: "Enter the ID of the item you'd like to add inventory to",
//                 name: "id"
//                 //add validation for both entries, think about the timing of quitting
//             },
//             {
//                 type: "command",
//                 message: "Enter the number of units you'd like to add (or q to quit the application)",
//                 name: "quantity"
//             }
//         ])
//         .then(function (response) {
//             var items;
//             connection.query("SELECT * FROM inventory",
//                 function (err, res) {
//                     console.log("Response");
//                     console.log(res);
//                     items = res;
//                     console.log("Items");
//                     console.log(items);
//                     var currentItem;
//                     // console.log("Items Length");
//                     // console.log(items.length);
//                     for (var i = 0; i < items.length; i++) {
//                         // console.log("Response ID");
//                         // console.log(response.id);
//                         // console.log("Item ID")
//                         if (parseInt(response.id) === items[i].id) {
//                             // console.log("This check was met");
//                             currentItem = items[i];
//                         }
//                     }
//                     if (typeof currentItem === 'undefined') {
//                         console.log("I'm sorry, that item doesn't exist :(");
//                     }
//                     connection.query("UPDATE inventory SET ? WHERE",
//                         [
//                             {
//                                 stock_quantity: currentItem.stock_quantity + response.quantity
//                             },
//                             {
//                                 id: response.id
//                             }
//                         ],
//                         function (err, res) {
//                             if (err) throw err;
//                             console.log("You successfully updated your inventory");
//                             promptManagerDecision();
//                         })
//                 }
//             );
//             // console.log("Items");
//             // console.log(items);
//             // var currentItem;
//             // // console.log("Items Length");
//             // // console.log(items.length);
//             // for (var i = 0; i < items.length; i++) {
//             //     // console.log("Response ID");
//             //     // console.log(response.id);
//             //     // console.log("Item ID")
//             //     if (parseInt(response.id) === items[i].id) {
//             //         // console.log("This check was met");
//             //         currentItem = items[i];
//             //     }
//             // }
//             // if (typeof currentItem === 'undefined') {
//             //     console.log("I'm sorry, that item doesn't exist :(");
//             //     connection.query("UPDATE inventory SET ? WHERE",
//             //         [
//             //             {
//             //                 stock_quantity: currentItem.stock_quantity + response.quantity
//             //             },
//             //             {
//             //                 id: response.id
//             //             }
//             //         ],
//             //         function (err, res) {
//             //             if (err) throw err;
//             //             console.log("You successfully updated your inventory");
//             //             promptManagerDecision();
//             //         })
//             // }

//         })
// }

// function addInventory(){
//     inquirer
//         .prompt([
//             {
//                 type: "command",
//                 message: "Enter the ID of the item you'd like to add inventory to",
//                 name: "id"
//                 //add validation for both entries, think about the timing of quitting
//             },
//             {
//                 type: "command",
//                 message: "Enter the number of units you'd like to add (or q to quit the application)",
//                 name: "quantity"
//             }
//         ])
//         .then(function(response) {

//         })
// }