'use strict';

const data = require('./mockData');

module.exports = class DataResolver {
  constructor() {
    this.employees = data.employees;
    this.clients = data.clients;
    this.employeeIdCounter = 4;
    this.clientIdCounter = 8;
    
    this.users = data.users;
    this.docs = data.docs;
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

  removeClientFromEmployee(employeeId, clientId) {
    this.employees[employeeId].clients.filter(client => client !== clientId);
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

  updateClient(clientId, salesRepId) {
    const previousEmployeeId = this.clients[clientId].salesRep;
    this.attachClientToEmployee(salesRepId, clientId);
    this.removeClientFromEmployee(previousEmployeeId, clientId);
    this.clients[clientId].salesRep = salesRepId;
    const updatedClient = JSON.parse(JSON.stringify(this.clients[clientId]));
    updatedClient.salesRep = this.mapEmployee(salesRepId);
    return updatedClient;
  }

  resolveUsers() {
    const result = [];
    for (let key in this.users) {
      const user = JSON.parse(JSON.stringify(this.users[key]));
      result.push(user);
    };
    return result;
  }

  resolveDocs() {
    const result = [];
    for (let key in this.docs) {
      const doc = JSON.parse(JSON.stringify(this.docs[key]));
      result.push(doc);
    };
    return result;
  }

  updateDoc(id, name) {
    this.docs[id].name = name;
    const updatedDoc = JSON.parse(JSON.stringify(this.docs[id]));
    return updatedDoc;
  }
}
