'use strict';

const { ApolloServer, gql } = require('apollo-server');
const DataResolver = require('./dataResolver.js');

const data = new DataResolver();

const typeDefs = gql`
  type Employee {
    id: ID
    firstName: String
    lastName: String
    clients: [Client]
  }

  type Client {
    id: ID
    company: String
    phone: String
    salesRep: Employee
  }

  type Query {
    employees: [Employee]
    clients: [Client]
  }

  type Mutation {
    addClient(company: String, phone: String, salesRep: String): Client
  }
`;

const resolvers = {
  Query: {
    employees: () => data.resolveEmployees(),
    clients: () => data.resolveClients()
  },
  Mutation: {
    addClient: (parent, args) => data.addClient(args.company, args.phone, args.salesRep)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});
