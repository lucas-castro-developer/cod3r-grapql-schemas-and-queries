const { AppoloServer, gql, ApolloServer } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  # Pontos de entrada da sua API
  type Query {
    ola: String
    horaAtual: Date
  }
`;

const resolvers = {
  Query: {
    ola() {
      return "Olá GraphQL!";
    },
    horaAtual() {
      return new Date;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
