var nomesProdutos = [], precosProdutos = [], totaisVendas = []

function exibirMenu(){
    var op = parseInt(prompt(
        "SISTEMA - LANCHONETE A+\n\n" +
        "Escolha uma opção:\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar sistema\n\n" 
    ))
    return op
}

function executarSistema(){
    var op = 0
    while(op != 5){
        op = exibirMenu()
        switch(op){
            case 1:
                cadastrarProduto()
                break
            case 2:
                listarProdutos()
                break
            case 3:
                realizarVenda()
                break
            case 4:
                exibirTotalVendasDia()
                break
            case 5:
                alert("Sistema encerrado!")
                break
            default:
                alert("Opção inválida!")
                break
        }
    }
}

function cadastrarProduto(){
    var nome = prompt("Digite o nome do produto:")
    if (nome == null || nome == ""){
        alert("Nome inválido!")
        return
    }
    for(var i = 0; i < nomesProdutos.length; i++){
        if (nomesProdutos[i] == nome){
            alert("Este produto já foi cadastrado!")
            return
        }
    }
    var preco = parseFloat(prompt("Digite o valor do produto:"))
    if (preco <= 0 || preco != preco){
        alert("Preço inválido! O preço precisa ser maior que zero.")
        return
    }
    nomesProdutos.push(nome)
    precosProdutos.push(preco)
    alert("Produto cadastrado com sucesso!")
}

function listarProdutos(){
    if (nomesProdutos.length == 0){
        alert("Não existem produtos cadastrados!")
        return
    }
    var msg = "PRODUTOS CADASTRADOS:\n\n"
    for(var i = 0; i < nomesProdutos.length; i++){
        msg += "Código: " + (i + 1) + "\n"
        msg += "Nome: " + nomesProdutos[i] + "\n"
        msg += "Preço: R$ " + precosProdutos[i].toFixed(2) + "\n\n"
    }
    alert(msg)
}

function calcularTotalVenda(preco, quantidade){
    var subtotal = preco * quantidade
    return subtotal
}

function calcularDesconto(total){
    var desconto = 0
    if(total > 50){
        desconto = total * 0.10
    }
    return desconto
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto){

    var valorFinal = subtotal - desconto

    var msg = "RESUMO DA VENDA\n\n"

    msg += "Produto: " + nome + "\n"
    msg += "Preço unitário: R$ " + preco.toFixed(2) + "\n"
    msg += "Quantidade: " + quantidade + "\n"
    msg += "Subtotal: R$ " + subtotal.toFixed(2) + "\n"
    msg += "Desconto: R$ " + desconto.toFixed(2) + "\n"
    msg += "Valor final: R$ " + valorFinal.toFixed(2)
    alert(msg)
}

function realizarVenda(){
    if(nomesProdutos.length == 0){
        alert("Não existem produtos cadastrados!");
        return
    }
    listarProdutos()
    var codigo = parseInt(prompt("Digite o código do produto:"))
    if(codigo < 1 || codigo > nomesProdutos.length){
        alert("Código inválido!")
        return
    }
    var indice = codigo - 1
    var quantidade = parseInt(prompt("Digite a quantidade:"))
    if(quantidade <= 0 || quantidade != quantidade){
        alert("Quantidade inválida!")
        return;
    }
    var subtotal = calcularTotalVenda(precosProdutos[indice], quantidade)
    var desconto = calcularDesconto(subtotal)
    var valorFinal = subtotal - desconto

    exibirResumoVenda(
        nomesProdutos[indice],
        precosProdutos[indice],
        quantidade,
        subtotal,
        desconto
    )

    if(confirm("Deseja concluir esta venda?")){
        totaisVendas.push(valorFinal)
        alert("Venda registrada!")
    }else{
        alert("Venda cancelada!")
    }
}

function obterTotalVendasDia(){
    var total = 0
    for(var i = 0; i < totaisVendas.length; i++){
        total = total + totaisVendas[i]
    }
    return total
}

function exibirTotalVendasDia(){
    if(totaisVendas.length == 0){
        alert("Não existem vendas registradas!")
        return
    }
    var total = obterTotalVendasDia()
    var mensagem = "VENDAS DO DIA\n\n"
    mensagem += "Quantidade de vendas: " + totaisVendas.length + "\n"
    mensagem += "Total vendido: R$ " + total.toFixed(2)
    alert(mensagem)
}

executarSistema()