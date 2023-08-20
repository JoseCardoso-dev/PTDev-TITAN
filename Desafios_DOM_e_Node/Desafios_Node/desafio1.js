function calcularFolhaDePagamento(valorHora, horasTrabalhadas) {
    const salarioBruto = valorHora * horasTrabalhadas;
    let descontoIR = 0;

    if (salarioBruto <= 900) {
        descontoIR = 0;
    } else if (salarioBruto <= 1500) {
        descontoIR = salarioBruto * 0.05;
    } else if (salarioBruto <= 2500) {
        descontoIR = salarioBruto * 0.1;
    } else {
        descontoIR = salarioBruto * 0.2;
    }

    const inss = salarioBruto * 0.1;
    const fgts = salarioBruto * 0.11;
    const totalDescontos = descontoIR + inss;
    const salarioLiquido = salarioBruto - totalDescontos;

    const resultado = `
        Salário bruto: R$ ${salarioBruto.toFixed(2)}
        IR (${(descontoIR * 100 / salarioBruto).toFixed(2)}%) : R$ ${descontoIR.toFixed(2)}
        INSS (10%) : R$ ${inss.toFixed(2)}
        FGTS (11%) : R$ ${fgts.toFixed(2)}
        Total de descontos : R$ ${totalDescontos.toFixed(2)}
        Salário Líquido : R$ ${salarioLiquido.toFixed(2)}
    `;

    return resultado;
}

const valorHora = 5;
const horasTrabalhadas = 220;
const folhaDePagamento = calcularFolhaDePagamento(valorHora, horasTrabalhadas);
console.log(folhaDePagamento);
