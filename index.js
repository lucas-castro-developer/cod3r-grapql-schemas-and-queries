const { AppoloServer, gql, ApolloServer } = require("apollo-server");

const typeDefs = gql`
  # Pontos de entrada da sua API
  type Query {
    ola: String
    horaAtual: String
  }
`;

const resolvers = {
  Query: {
    ola() {
      return "Olá GraphQL!";
    },
    horaAtual() {
      const dataHora = new Date();
      const horaAtual = dataHora.getHours();
      const minutoAtual = dataHora.getMinutes();
      const segundoAtual = dataHora.getSeconds();
      const horaCerta = `${horaAtual}h:${minutoAtual}min:${segundoAtual}s`;
      return horaCerta;
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
