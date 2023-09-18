
const db = require('../config/db');

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

  updateEmployeeRole(employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      this.connection.query(query, [newRoleId, employeeId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = new EmployeeQuery(db);