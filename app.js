
const inquirer = require('inquirer');

const db = require('./connecter/db.js');

// Main prompt 
function promptOne() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'firstPrompt',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
   
    .then((answer) => {
     
      switch (answer.firstPrompt) {
        
        case 'View all departments':
          viewAllDepartments();
          break;
        
          case 'View all roles':
          viewAllRoles();
          break;
       
          case 'View all employees':
          viewAllEmployees();
          break;
        
          case 'Add a department':
          addDepartment();
          break;
       
          case 'Add a role':
          addRole();
          break;
        
          case 'Add an employee':
          addEmployee();
          break;
       
          case 'Update an employee role':
          updateEmployeeRole();
          break;
        
          case 'Exit':
          
          process.exit();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


promptOne()