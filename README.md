# command-line-marketplace
A command line application that emulates customer and manager interactions with inventory. 

## Project Description
App that displays inventory, allows users to make valid purchases, and gives managers ability to check on items that are dangerously low in stock

### Customer Application Workflow

The customer is presented with available items in the following format:

![alt text](assets/images/inital2.png))

After entering the id and quantities of the item they'd like to purchase, your transaction is registered.

![alt text](assets/images/transaction.png))

When the inventory is subsequently reloaded, it demonstrates updated quantities.

![alt text](assets/images/inventory2.png))

The user gets a warning if they try to purchase too much of an item

![alt text](assets/images/overPurchase.png))

They can also quit the application by pressing the q button.

![alt text](assets/images/quitDemo.png))

From a manager perspective, you can check on your entire inventory, or just items that are understocked (under 5)

![alt text](assets/images/managerView.png))

#### Technologies Used
mysql, inquirer, node, cli-table2, javascript



 