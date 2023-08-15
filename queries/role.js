
const db = require('../connector/db')

class RoleQuery {
  constructor(connection) {
    this.connection = connection;
  }

  getAllRoles() {
    return this.connection.promise().query('SELECT * FROM role');
  }

  addRole(title, salary, departmentId) {
    return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }

  deleteRole(roleId) {
    return this.connection.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
  }
}

module.exports = new RoleQuery(require('../connector/db')); //import/transport database