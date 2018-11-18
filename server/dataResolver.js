'use strict';

const data = require('./mockData');

module.exports = class DataResolver {
  constructor() {
    this.employees = data.employees;
    this.clients = data.clients;
    this.employeeIdCounter = 3;
    this.clientIdCounter = 7;
  }

  mapClients(clientIds) {
    return clientIds.map(id => this.clients[id]);
  }

  mapEmployee(employeeId) {
    return this.employees[employeeId];
  }

  resolveEmployees() {
    const result = [];
    for (let key in this.employees) {
      if (!this.employees.hasOwnProperty(key)) break;
      const employee = JSON.parse(JSON.stringify(this.employees[key]));
      employee.clients = this.mapClients(employee.clients);
      result.push(employee);
    };
    return result;
  }

  resolveClients() {
    const result = [];
    for (let key in this.clients) {
      if (!this.clients.hasOwnProperty(key)) break;
      const client = JSON.parse(JSON.stringify(this.clients[key]));
      client.salesRep = this.mapEmployee(client.salesRep);
      result.push(client);
    }
    return result;
  }

  attachClientToEmployee(employeeId, clientId) {
    this.employees[employeeId].clients.push(clientId);
  }

  addClient(company, phone, salesRep) {
    const id = `c${this.clientIdCounter++}`;
    const client = {
      id,
      company,
      phone,
      salesRep
    }
    this.clients[id] = client;
    this.attachClientToEmployee(salesRep, id);
    const newClient = JSON.parse(JSON.stringify(client));
    newClient.salesRep = this.mapEmployee(newClient.salesRep);
    return newClient;
  }
}
