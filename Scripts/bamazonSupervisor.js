const inquirer = require("inquirer");
const sql = require("mysql");
require("console.table");

//==================PSEUDO CODE====================
//populate departments table with existing departments if departments is empty
//inquirer to prompt for action
//if view departments...join products at product sales with departments table
//calculate profit by subtracting over head costs from product sales(working in customer file)
//display joined table plus profits column
//else if add new department
//inquirer to get department info
//insert into departments table with profits null and product sales 0 in products table