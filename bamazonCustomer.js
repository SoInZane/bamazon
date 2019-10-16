var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
})

function start(){
  // Displays the items for sale and their details in the console
  connection.query('SELECT * FROM products', function(err, res){
    if(err) throw err;
  
    console.log("Welcome to Bamazon")
    console.log('--------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i < res.length; i++){
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------')
    }
  
    console.log(' ');
    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "What is the ID number of the product you would like to purchase?",
        validate: function(value){
          if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
            return true;
          } else{
            return false;
          }
        }
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "How many of this item would you like to purchase?",
        validate: function(value){
          if(isNaN(value)){
            return false;
          } else{
            return true;
          }
        }
      }
      ]).then(function(ans){
        var whatToBuy = (ans.item_id)-1;
        var howMuchToBuy = parseInt(ans.stock_quantity);
        var grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2));
  
        // Check if there is enough in stock
        if(res[whatToBuy].stock_quantity >= howMuchToBuy){
          // After purchase updat the quantity in products
          connection.query("UPDATE products SET ? WHERE ?", [
          {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
          {item_id: ans.item_id}
          ], function(err, result){
              if(err) throw err;
              
              console.log("Congratulations on your purchase! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
          });
  
        } else{
          console.log("Sorry, there's not enough in stock!");
        }
  
        reprompt();
      })
  })
  }
  
  // Ask if they would like to purchase another item
  function reprompt(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }]).then(function(ans){
      if(ans.reply){
        start();
      } else{
        console.log("See you next time!");
      }
    });
  }
  
  start();
