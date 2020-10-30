const { perfis } = require('../data/db')

module.exports = {
  salario(usuario) {
    return usuario.salario_real;
  },
  perfil(usuario) {
    const retPerfil = perfis.filter((p) => p.id === usuario.perfil_id);
    return retPerfil ? retPerfil[0] : null;
  },
};
