
function convencaoTemperatura(temperatura){

    let updateTemperatura = temperatura.toUpperCase()

    if(updateTemperatura.includes("C")){
        numberTemperatura = Number(updateTemperatura.replace("C", ""))
        convencao = `${numberTemperatura * 9/5 +32} °F`

    } else if(updateTemperatura.includes("F")){
        numberTemperatura = Number(updateTemperatura.replace("F", ""))
        convencao = `${(numberTemperatura - 32) * 5/9} °C`

    } else {
        convencao = "Escala de temperatura não cadastrada!"
    }

    return convencao
}

console.log("======= Desafio 3 =======")
console.log(`Temperatura convertida: ${convencaoTemperatura("32C")}`)
