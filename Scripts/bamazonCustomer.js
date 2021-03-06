const inquirer = require("inquirer");
const sql = require("mysql");
require("console.table");

const connection = sql.createConnection({

	host: "localhost",
	port:3306,
	user:"root",
	password: "",
	database: "bamazon",

});

connection.connect(function(err){

	if(err) throw err;
	onStart();

});

function onStart(){

	connection.query("SELECT item_id, product_name, price FROM products ", function(err, response){
		
		if(err) throw err;
		console.log("\n");
		console.table(response);
		console.log("\n");
		askCustomer();
	});

}

function Next(){

	inquirer.prompt(
		[{
			type:"list",
			message: "What would you like to do next?",
			choices: ["Make another purchase", "Quit"],
			name:"action",
		}]
		).then(function(ans){

			if(ans.action === "Quit"){
				connection.end();
			}
			else{

				onStart();
			}

		});
}

function askCustomer(){

	inquirer.prompt([
	{
		type: "input",
		message: "Please enter the item_id from the table to select product to purchase: ",
		name: "id",
	},
	{
		type: "input",
		message: "Please enter quantity you would like to purchase: ",
		name: "quantity",
	},
	]).then(function(ans){

			connection.query("SELECT stock_quantity, price, product_sales FROM products WHERE ?", {"item_id": ans.id}, function(err, response){
				var num = 0;
				var totalCost = ans.quantity*response[0].price;
				if(ans.quantity <= response[0].stock_quantity){

					num = response[0].stock_quantity - ans.quantity;
					updateQuantity(ans.id, num);
					console.log("\nPurchase Cost: $"+totalCost+" ...checking out... ");
					
				}
				else{

					console.log("\nSorry the quantity you selected is not available"+ 
						        "\n\nStock of item is depleted\nAvaialble Quantity: "+response[0].stock_quantity);
					
				}
				if(response[0].product_sales === null){

					connection.query("UPDATE products SET ? WHERE ?", [{product_sales: totalCost},{item_id : ans.id}], function(err, response){
						if(err) throw err;

					});
				}
				else{

					var totalSales = totalCost + response[0].product_sales;
					connection.query("UPDATE products SET ? WHERE ?", [{product_sales: totalSales},{item_id : ans.id}], function(err, response){
						if(err) throw err;

					});

				}

				Next();
			});

	});


}

function updateQuantity(id, num){

	connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: num},{"item_id": id}], function(err, response){

		if(err) throw err;
		//console.log(response.affectedRows);
	});

}