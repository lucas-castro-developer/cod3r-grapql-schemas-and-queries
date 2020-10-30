const { usuarios, perfis } = require("../data/db");

module.exports = {
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
};