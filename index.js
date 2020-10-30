const { AppoloServer, gql, ApolloServer } = require("apollo-server");

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "jsilva@zmail.com",
    idade: 29,
    perfil_id: 1,
  },
  {
    id: 2,
    nome: "Rafael Júnior",
    email: "rafajun@wemail.com",
    idade: 31,
    perfil_id: 2,
  },
  {
    id: 3,
    nome: "Daniela Smith",
    email: "danismi@umail.com",
    idade: 24,
    perfil_id: 1,
  },
];

const perfis = [
  {
    id: 1,
    nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
  },
];

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: Int
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    perfil: Perfil
  }

  type Perfil {
    id: Int
    nome: String!
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Pontos de entrada da sua API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
    usuario(id: Int): Usuario
    perfis: [Perfil]
    perfil(id: Int): Perfil
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
    perfil(usuario) {
      const retPerfil = perfis.filter((p) => p.id === usuario.perfil_id);
      return retPerfil ? retPerfil[0] : null;
    },
  },
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto);
      } else {
        return produto.preco;
      }
    },
  },
  Query: {
    ola() {
      return "Olá GraphQL!";
    },
    horaAtual() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Lucas Castro",
        email: "lucascastroteste@gmail.com",
        idade: 23,
        salario_real: 1234.56,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Omo - Sabão em pó",
        preco: 57.6,
        desconto: 0.5,
      };
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      return Array(6)
        .fill(0)
        .map((n) => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, { id }) {
      const sels = usuarios.filter((u) => u.id === id);
      return sels ? sels[0] : null;
    },
    perfis() {
      return perfis;
    },
    perfil(_, { id }) {
      const retPerfil = perfis.filter((p) => p.id === id);
      return retPerfil ? retPerfil[0] : null;
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
