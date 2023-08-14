
const db = require('../connector/db')

class DepartmentQuery {
  constructor(connection) {
    this.connection = connection;
  }

  getAllDepartments() {
    return this.connection.promise().query('SELECT * FROM department');
  }

  addDepartment(departmentName) {
    return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  }
}

module.exports = new DepartmentQuery(require('../connector/db')); //import/transport database