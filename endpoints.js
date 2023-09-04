var cadastraItem = require('../calculadora/src/Controllers/CadastraItemController');

module.exports = [

    {
        method: 'GET',
        path: '/calculadora/listar_categorias',
        handler: async (request, h) => {
          const resposta = await cadastraItem.listaCategorias(request);
          return h.response(resposta).code(200);
        },
        config: {
          auth: false,
          description: 'Listar categorias do orçamento',
          notes: 'Listar',
          tags: ['categorias', 'Listar'],
          cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with'],
          },
        },
    },

    {
        method: 'POST',
        path: '/calculadora/cadastrar_item',
        handler: async (request, h) => {
            const resposta = await cadastraItem.cadastraItemOrcamento(request);
            return h.response(resposta).code(200);
          }, 
          config: {
            auth: false,
            description: 'Cadastrar item na base',
            notes: 'Cadastrar',
            tags: ['post', 'cadastrar', 'item'],
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }

    },
    {
        method: 'POST',
        path: '/calculadora/calcular_itens',
        handler: async (request, h) => {
          const resposta = await cadastraItem.calcularItens(request);
          return h.response(resposta).code(200);
        },
        config: {
          auth: false,
          description: 'Calcula o valor total por categoria',
          notes: 'Calcular',
          tags: ['Calcular', 'categoria', 'valor'],
          cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with'],
          },
        },
    }
]