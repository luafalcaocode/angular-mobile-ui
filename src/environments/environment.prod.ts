export const environment = {
  production: true,
  endpoints: {
    host: 'https://luafalcao.com/api',
    auth: {
      login: '/reencontre/auth/login',
      usuario: '/reencontre/auth/usuario',
      cadastro: '/reencontre/auth/cadastro',
      atualizacao_senha: '/reencontre/auth/atualizacao/senha',
      verificacao_codigo: '/reencontre/auth/codigoverificacao',
      pre_cadastro: '/reencontre/auth/precadastro',
      pre_atualizacao_senha: '/reencontre/auth/preatualizacaosenha',
      reenvio_codigo_verificacao: '/reencontre/auth/reenvio/codigodeverificacao'
    },
    desaparecidos: '/reencontre/desaparecidos',
    anuncios_cadastrados: '/reencontre/desaparecidos/anuncios/cadastrados/paginados',
    anuncios_catalogo: '/reencontre/desaparecidos/anuncios/catalogo',
    quantidade_anuncios_cadastrados: '/reencontre/desaparecidos/anuncios/cadastrados/quantidade',
    quantidade: '/reencontre/desaparecidos/anuncios/quantidade',
    anexos: '/reencontre/anexos/upload',
    anexos_exclusao: '/reencontre/anexos/exclusao',
    anexos_validacoes_existente: '/reencontre/anexos/validacoes/existente',
    ping: '/reencontre/auth/ping',
    search: '/reencontre/desaparecidos/search',
    search_catalogo: '/reencontre/desaparecidos/search/catalogo',
    quantidadeItensRetornadosPesquisaDesaparecidosPorNome: '/reencontre/desaparecidos/search/quantidade',
    search_catalogo_quantidade: '/reencontre/desaparecidos/search/catalogo/quantidade',
    permissao_edicao_anuncio_cadastrado: '/reencontre/desaparecidos/permissoes/edicao/',
    quantidade_itens_pagina: '/reencontre/desaparecidos/anuncios/cadastrados/quantidade/itens/',
    ultimos: '/reencontre/desaparecidos/ultimos/',
    guardian: 'reencontre/auth/guardian',
    relatorios: {
      desaparecidos: {
        cidade: '/reencontre/relatorios/desaparecidos/agrupado/cidade',
        estado: '/reencontre/relatorios/desaparecidos/agrupado/estado',
        nascimento: '/reencontre/relatorios/desaparecidos/agrupado/nascimento',
        desaparecimento: '/reencontre/relatorios/desaparecidos/agrupado/desaparecimento',
        genero: '/reencontre/relatorios/desaparecidos/agrupado/genero',
        etnia: '/reencontre/relatorios/desaparecidos/agrupado/etnia'
      }
    }
  }
};
