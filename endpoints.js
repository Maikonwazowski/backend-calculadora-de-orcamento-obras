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
          tags: ['api', 'Listar'],
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
            description: 'Login',
            notes: 'Login',
            tags: ['api', 'login'],
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
          console.log("🚀 ~ file: endpoints.js:47 ~ handler: ~ request:", request.payload)
          const resposta = await cadastraItem.calcularItens(request);
          console.log("🚀 ~ file: endpoints.js:49 ~ handler: ~ resposta:", resposta)
          return h.response(resposta).code(200);
        },
        config: {
          auth: false,
          description: 'Calcula o valor total por categoria',
          notes: 'Calcular',
          tags: ['api', 'Listar'],
          cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with'],
          },
        },
    }
]