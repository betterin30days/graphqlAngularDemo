const data = require('./mockData');

module.exports = class DataResolver {
  constructor() {
    this.employees = data.employees;
    this.clients = data.clients;
  }

  mapClients(clientIds) {
    return clientIds.map(id => this.clients[id]);
  }

  resolveEmployees() {
    const result = [];
    for (let key in this.employees) {
      if (!this.employees.hasOwnProperty(key)) break;
      const employee = JSON.parse(JSON.stringify(this.employees[key]))
      employee.clients = this.mapClients(employee.clients);
      result.push(employee);
    };
    return result;
  }

  resolveClients() {
    const result = [];
    for (let key in this.clients) {
      if (!this.clients.hasOwnProperty(key)) break;
      result.push(this.clients[key]);
    }
    return result;
  }
}
