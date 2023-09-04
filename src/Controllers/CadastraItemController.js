var database = require('../../database');

function cadastraItemOrcamento(request) {
    console.log("🚀 ~ file: CadastraItemController.js:4 ~ cadastraItemOrcamento ~ request:", request.payload);
    try {
        var { categoria, produto, descricao, valor } = request.payload;
        var item = {
            id: '',
            categoria: categoria,
            nome: produto,
            valor: valor,
            detalhes: descricao
        }
        console.log("🚀 ~ file: CadastraItemController.js:4 ~ item ~ request:", item);
        database.tabela_itens.push(item);

        return {
            code: 200,
            message: "Item cadastrado com sucesso",
            data: item
        }

    } catch (error) {
        console.error("Erro ao cadastrar o item:", error);
        return {
            code: 500, 
            message: "Ocorreu um erro ao cadastrar o item",
            error: error.message
        };
    }
}


function listaCategorias(request) {
    const categorias = database.categorias;
    var data = {
        code: 200,
        message: "Lista de categorias",
        data: categorias
    }
    return data;
}

function calcularItens(request) {

    var precosArray = {};
    var quantidadeArray = {};
    const categoriasJson = JSON.parse(request.payload.categorias);
    const quantidadeJson = JSON.parse(request.payload.quantidade);
    Object.entries(categoriasJson).forEach(([chave, valores]) => {
        const soma = valores.reduce((total, valor) => {
            const valorNumerico = parseFloat(valor.replace('R$', '').replace('.', '').replace(',00', '').replace(/,/g, ''));
            return total + valorNumerico;
        }, 0);
        precosArray[chave] = soma;
    });
    Object.entries(quantidadeJson).forEach(([chave, valor]) => {
        quantidadeArray[chave] = valor;
    });

    var data = {
        code: 200,
        message: "Lista de categorias e valores totais",
        data: {'precosArray':precosArray,
            'quantidadeArray':quantidadeArray}
    }
    return data;
}


module.exports.listaCategorias = listaCategorias;
module.exports.cadastraItemOrcamento = cadastraItemOrcamento;
module.exports.calcularItens = calcularItens;