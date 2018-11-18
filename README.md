# GraphqlAngularDemo
This is a simple Office client tracker intended as an introduction to using [GraphQL](https://graphql.org/) in an Angular application. There is a Node.JS back end that serves mock data using GraphQL to an Angular front end.

## Demo
```
$ git clone
$ npm install
$ npm run serve
$ npm start
```
Open your browser to [localhost:4200](http://localhost:4200) for the application or [localhost:4000](http://localhost:4000) for the GraphQL Playground.

## Server
The server uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to handle GraphQL requests and serve mock data. The data consists of two object types, `Client` and `Employee`. These have circular references to each other to demonstrate how this is handled by GraphQL; all clients have an assigned employee and all employees have a list of clients. This nests infinitely and GraphQL handles this by referencing unique IDs instead of duplicating data. Explore the schema in GraphQL Playgound and you can recursively descend lower into the data tree, even though the actual objects are never repeated.

The inital data is harcoded, but could be switched out to use real data from a database, 3rd party api, or anywhere else by updating the resolvers.

## Client
The Angular client uses [Apollo Angular Client](https://www.apollographql.com/docs/angular/) to send GraphQL request and manage the local data store. There are three seperate components, two query services, and one mutation service. Apollo makes it very easy to inject these services and have access to server and local cache requests, without needing to specify which. The goal was to have clearly seperated components that display and update the same data, have no reference to each other, and do not decide if their data should come from the server or the local cache.

## Queries, Mutations, and the local data store
Queries and Mutations are best documented within the GraphQL playground using the schema exporer. There are two queries and one mutation to show how the local data store handles caching. When using the app, keep an eye on the network tab in dev tools. For example, two components query for the employees initally, but you will only see one employee network request because the second query, and any subsequent query for employees, are served from the local cache.

The local cache is also realized when an `addClient` mutation is made. This mutation updates both the clients' and employees' data which leads those two components to query for the new changes. Again, check the network tab when making an `addClient` mutation because those following queries are also served from the local cache due to mutations caching the responses. You'll see the mutation network request, but not the clients or employees, even though those will initiate queries and update the display in real time.

## Code generation
[GraphQL Code Generator](https://graphql-code-generator.com/) is a great tool that will read your server side schema, and generate typescript types and Angular services to interact with your schema. This allows you to write server side schemas, client side queries/mutations, and have the rest generated for you. It is especially useful when you make any schema changes and want to update your client.
```
npm run generate
```
