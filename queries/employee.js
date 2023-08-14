
const db = require('../connector/db')

class EmployeeQuery {
  constructor(connection) {
    this.connection = connection;
  }

  getAllEmployees() {
    return this.connection.promise().query('SELECT * FROM employee');
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    return this.connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }
}

module.exports = new EmployeeQuery(require('../connector/db')); //import/transport database