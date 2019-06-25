// figure out how to add stuff to package-json file at the end

var mysql = require("mysql");
var inquirer = require("inquirer");
var items;

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "password", 
    database: "market_db"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("We connected with id " + connection.threadId);
    displayItems();
})


function displayItems() {
    connection.query("SELECT * FROM inventory", 
    function(err, res) {
        if (err) throw err;
        // console.log("response");
        // console.log(res);
        console.log("Name:      Department:          Price:            Quantity:");
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " " + res[i].department_name + " " + res[i].price + " " + res[i].stock_quantity);
        }
        items = res;
        promptUserPurchase();
    })
}
function promptUserPurchase() {
    inquirer
        .prompt([
            {
                type: "command", 
                message: "Enter the ID of the item you'd like to purchase", 
                name: "id"
                //add validation for both entries, think about the timing of quitting
            }, 
            {
                type: "command", 
                message: "Enter the number of units you'd like to purchase (or q to quit the application)", 
                name: "quantity"
            }
        ])
        .then(function(response) {
            if(response.quantity === "q") {
                connection.end();
            }
            else {
                //consider faster ways to do id
                var currentItem;
                // console.log("Items Length");
                // console.log(items.length);
                for(var i = 0; i < items.length; i++) {
                    // console.log("Response ID");
                    // console.log(response.id);
                    // console.log("Item ID")
                    if(parseInt(response.id) === items[i].id) {
                        console.log("This check was met");
                        currentItem = items[i];
                    }
                }
                if(typeof currentItem === 'undefined') {
                    console.log("I'm sorry, that item doesn't exist :(");
                    promptUserPurchase();
                    return;
                }
                if(currentItem.stock_quantity >= response.quantity) {
                    connection.query("UPDATE inventory SET ? WHERE ?", 
                    [
                        {
                            stock_quantity: currentItem.stock_quantity - parseInt(response.quantity)
                        }, 
                        {
                            id: response.id
                        }
                    ], 
                    function(err, res) {
                        if (err) throw err;
                        console.log("Your purchase went through! You bought " + response.quantity + " unit(s) of " + currentItem.product_name + " for a total of $" + (parseInt(response.quantity) * currentItem.price) + ".");
                        promptUserPurchase();
                    })
                }
            }
        })
}