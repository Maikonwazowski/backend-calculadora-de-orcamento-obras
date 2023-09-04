var database = require('../../database');

function cadastraItemOrcamento(request) {
    try {
        var { categoria, produto, descricao, valor } = request.payload;
        var item = {
            id: '',
            categoria: categoria,
            nome: produto,
            valor: valor,
            detalhes: descricao
        }
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
    try {
        const categorias = database.categorias;
        var data = {
            code: 200,
            message: "Lista de categorias",
            data: categorias
        }
        return data;
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        var data = {
            code: 500,
            message: "Erro ao listar categorias",
            error: error
        }
        return data;
    }
}


function calcularItens(request) {
    try {
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
            data: {
                'precosArray': precosArray,
                'quantidadeArray': quantidadeArray
            }
        }
        return data;
    } catch (error) {
        console.error("Erro ao calcular itens:", error);
        var data = {
            code: 500,
            message: "Erro ao calcular itens",
            error: error
        }
        return data;
    }
}



module.exports.listaCategorias = listaCategorias;
module.exports.cadastraItemOrcamento = cadastraItemOrcamento;
module.exports.calcularItens = calcularItens;