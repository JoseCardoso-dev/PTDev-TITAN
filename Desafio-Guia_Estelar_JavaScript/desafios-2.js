
function fluxoDoCaixa(caixa){
    let totalReceita = 0
    let totalDespesa = 0

    for(let ganho in caixa.receitas){
        totalReceita += caixa.receitas[ganho]
    }

    for(let despesa in caixa.despesas){
        totalDespesa += caixa.despesas[despesa]
    }
    
    console.log(totalReceita > totalDespesa ? "Família está com saldo com saldo positivo!" : "Família está com saldo com saldo negativo!")
    
    return totalReceita - totalDespesa
}

let caixaDaFamilia = {
    receitas: [1250,500,1000,2000], 
    despesas: [500,1500,200,100,350,1000]
}

console.log("======= Desafio 2 =======")
console.log(`Saldo: ${fluxoDoCaixa(caixaDaFamilia)}`)
