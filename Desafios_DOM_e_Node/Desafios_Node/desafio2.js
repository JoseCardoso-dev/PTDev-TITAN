class Calculadora {
    constructor(numbers) {
        this.numbers = numbers;
    }

    calcularFatorial(numero) {
        if (numero === 0 || numero === 1) {
            return 1;
        } else {
            return numero * this.calcularFatorial(numero - 1);
        }
    }

    calcularMediaAritmetica() {
        const sum = this.numbers.reduce((acc, num) => acc + num, 0);
        return sum / this.numbers.length;
    }

    calcularVariancia() {
        const media = this.calcularMediaAritmetica();
        const squaredDifferences = this.numbers.map(num => (num - media) ** 2);
        const variance = squaredDifferences.reduce((acc, squaredDiff) => acc + squaredDiff, 0) / this.numbers.length;
        return variance;
    }

    calcularDesvioPadrao() {
        return Math.sqrt(this.calcularVariancia());
    }

    imprimirNumerosImpares() {
        const oddNumbers = this.numbers.filter(num => num % 2 !== 0);
        return oddNumbers.join(',');
    }

    printAll() {
        const fatorial = this.calcularFatorial(this.numbers[0]);
        const mediaAritmetica = this.calcularMediaAritmetica();
        const variancia = this.calcularVariancia();
        const desvioPadrao = this.calcularDesvioPadrao();
        const numerosImpares = this.imprimirNumerosImpares();

        const result = `
            Fatorial do primeiro elemento: ${fatorial}
            Média aritmética: ${mediaAritmetica}
            Variância: ${variancia}
            Desvio padrão: ${desvioPadrao}
            Números ímpares: ${numerosImpares}
        
        `

        console.log(result);
    }
}

const calc1 = new Calculadora([7, 8, 10, 24, 21, 38, 157, 3, 16]);
calc1.printAll();
