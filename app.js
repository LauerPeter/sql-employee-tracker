
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

          case 'Delete a department':
          deleteDepartment();
          break;

          case 'Delete a role':
          deleteRole();
          break;

          case 'Delete an employee':
          deleteEmployee();
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
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
      }
    ])
    .then((answers) => {
      departmentQuery.addDepartment(answers.departmentName)
        .then(() => {
          console.log('Department added successfully.');
          promptSection(); 
        })
        .catch((error) => {
          console.error(error);
          console.log("kill terminal and restart");
        });
    })
}

function deleteDepartment(){

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
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      }
    ])
    .then((answers) => {
      const { firstName, lastName } = answers;
      employeeQuery.addEmployee(firstName, lastName)
        .then(() => {
          console.log('Employee added successfully.');
          promptSection(); 
        })
        .catch((error) => {
          console.error(error);
          console.log("kill terminal and restart");
        });
    });
}


function deleteEmployee() {

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
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter a new role name:',
    }
  ])
  .then((answers) => {
    roleQuery.addRole(answers.roleName)
      .then(() => {
        console.log('Role added successfully.');
        promptSection(); 
      })
      .catch((error) => {
        console.error(error);
        console.log("kill terminal and restart");
      });
  })
}

function deleteRole(){
        
}


//////////////////////////////UPDATE EMPLOYEE ROLE
function updateEmployeeRole() {
  employeeQuery.getAllEmployees()
    .then(([employees]) => {
      const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));

      // Prompt user to select an employee
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'selectedEmployee',
            message: 'Select the employee to update:',
            choices: employeeChoices
          }
        ])
        .then(({ selectedEmployee }) => {
          // Get list of roles
          roleQuery.getAllRoles()
            .then(([roles]) => {
              const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
              }));

              // Prompt user to select a new role
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'newRole',
              message: 'Select the new role:',
              choices: roleChoices
            }
          ])
          .then(({ newRole }) => {
            // Update employee's role in the database
            employeeQuery.updateEmployeeRole(selectedEmployee, newRole)
              .then(() => {
              console.log('Employee role updated successfully.');
              promptSection();
            })
              .catch((error) => {
                console.error(error);
                console.log('kill terminal and restart');
              });
            });
          });
        });
      }) 
  }
  

promptSection()

