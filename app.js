
const inquirer = require('inquirer');

const db = require('./connector/db');

const departmentQuery = require('./queries/department.js');
const roleQuery = require('./queries/role.js');
const employeeQuery = require('./queries/employee.js');

// Main prompt 
function promptSection() {
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
          break;///terminate loop
        
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
      console.log("kill terminal and restart");
    });
}


///////////////////////////////DEPARTMENT
function viewAllDepartments() {
  departmentQuery.getAllDepartments()
    .then(([rows]) => {
      console.table(rows);
      promptSection(); 
    })
    .catch((error) => {
      console.error(error);
      console.log("kill terminal and restart");
    });
}


function addDepartment(){

}



/////////////////////////////EMPLOYEES
function viewAllEmployees() {
  employeeQuery.getAllEmployees()
  .then(([rows]) => {
    console.table(rows);
    promptSection(); 
  })
  .catch((error) => {
    console.error(error);
    console.log("kill terminal and restart");
  });
  
}

function addEmployee() {

}



/////////////////////////ROLES
function viewAllRoles() {
  roleQuery.getAllRoles()
  .then(([rows]) => {
    console.table(rows);
    promptSection(); 
  })
  .catch((error) => {
    console.error(error);
    console.log("kill terminal and restart");
  });
}

function addRole() {

}


/////////////////Exit!
function Exit() {

}


promptSection()

