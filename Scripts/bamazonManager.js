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