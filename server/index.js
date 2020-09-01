'use strict';

const { ApolloServer, gql } = require('apollo-server');
const DataResolver = require('./dataResolver.js');

const data = new DataResolver();

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    clients: [Client]
  }

  type Client {
    id: ID!
    company: String!
    phone: String!
    salesRep: Employee!
  }

  type User {
    id: ID!
    name: String!
  }

  type Doc {
    id: ID!
    name: String!
  }

  type Query {
    employees: [Employee]
    clients: [Client]
    users: [User]
    docs: [Doc]
  }

  type Mutation {
    addClient(company: String!, phone: String!, salesRep: String!): Client
    updateClient(clientId: String!, salesRepId: String!): Client
    updateDoc(id: String!, name: String!): Doc
  }
`;

const resolvers = {
  Query: {
    employees: () => data.resolveEmployees(),
    clients: () => data.resolveClients(),
    users: () => data.resolveUsers(),
    docs: () => data.resolveDocs()
  },
  Mutation: {
    addClient: (parent, args) => data.addClient(args.company, args.phone, args.salesRep),
    updateClient: (parent, args) => data.updateClient(args.clientId, args.salesRepId),
    updateDoc: (parent, args) => data.updateDoc(args.id, args.name)
  }
};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });
server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`);
});
