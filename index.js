const { AppoloServer, gql, ApolloServer } = require("apollo-server");
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')

const schemaPath = './schema/index.gql'

const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
