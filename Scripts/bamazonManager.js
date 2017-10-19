const inquirer = require("inquirer");
const sql = require("mysql");
require("console.table");

const connection = sql.createConnection({

	host: "localhost",
	port:3306,
	user:"root",
	password: "@%87237690!",
	database: "bamazon",

});

connection.connect(function(err){

	if(err) throw err;
	onStart();

});


function onStart(){

	inquirer.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		choices:["View Products for Sale", "View Low Inventory", "Update Inventory", "Add New Product", "Quit"],
		name: "action",
	}
	]).then(function(ans){

		switch(ans.action){

			case "View Products for Sale": getProducts();
			break;
			
			case "View Low Inventory": getLowInv();
			break;
			
			case "Update Inventory": updateInv();
			break;
			
			case "Add New Product": addNewProduct();
			break;

			case "Quit": connection.end();
			break;

		}

	});


}

function getProducts(){

	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err,response){

		if(err) throw err;
		console.log("\n");
		console.table(response);
		console.log("\n");
		onStart();
	});
}

function getLowInv(){

	connection.query("SELECT item_id, product_name ,price, stock_quantity FROM products WHERE stock_quantity < 5", 
					 
					  function(err, response){

					  		if(err) throw err;
					  		console.log("\n");
							console.table(response);
							console.log("\n");
							onStart();

					  });

}

function updateInv(){

		connection.query("SELECT item_id, product_name ,price, stock_quantity FROM products", function(err, response){

			console.log("\n");
			console.table(response);
			console.log("\n");
			var arr = [];

			response.forEach(function(row){

				arr.push(row.product_name);
			});

			inquirer.prompt([

				{
					type:"list",
					message:"Which product would you like to update",
					choices: arr,
					name: "choice",
				},
				{
					type: "list",
					message: "Would you like to add or deplete from stock",
					choices: ["add", "deplete"],
					name: "action",
				},
				{
					type: "input",
					message: "How many items would you like to add/remove?",
					name: "quantity",
				}

			]).then(function(ans){

				if(ans.action === "add"){

					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (response[arr.indexOf(ans.choice)].stock_quantity + ans.quantity)},{product_name: ans.choice}], function(err, response){

						if(err) throw err;
						console.log("\n"+ans.choice+" @ row "+response.affectedRows + " was updated!");
						onStart();
					});
				}
				else{

					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (response[arr.indexOf(ans.choice)].stock_quantity - ans.quantity)},{product_name: ans.choice}], function(err, response){

						if(err) throw err;
						console.log("\n"+ans.choice+" @ row "+response.affectedRows + " was updated!");
						onStart();
					});

				}

			});

		});



}

function addNewProduct(){


}