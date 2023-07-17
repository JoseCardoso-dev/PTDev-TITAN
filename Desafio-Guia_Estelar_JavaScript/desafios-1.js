

let alunos = [{
    name: "Ana",
    nota: 80
}, {
    name: "Pedro",
    nota: 70
}, {
    name: "Julia",
    nota: 40
}, {
    name: "José",
    nota: 100
}]


console.log("======= Desafio 1 =======")
for (let idAluno = 0; idAluno < alunos.length; idAluno++){

    if(alunos[idAluno].nota >= 90){
        alunos[idAluno].nota = "A"
    } else if((alunos[idAluno].nota >= 80) && (alunos[idAluno].nota <= 89)){
        alunos[idAluno].nota = "B"
    } else if((alunos[idAluno].nota >= 70) && (alunos[idAluno].nota <= 79)){
        alunos[idAluno].nota = "C"
    } else if((alunos[idAluno].nota >= 60) && (alunos[idAluno].nota <= 69)){
        alunos[idAluno].nota = "D"
    } else if((alunos[idAluno].nota < 60) && (alunos[idAluno].nota > 0)){
        alunos[idAluno].nota = "F"
    } else {
        console.log(`A aluna(o) ${alunos[idAluno].name} está com uma nota errada!`)
        alunos[idAluno].nota = "error"
    }

    console.log(`Aluno(a): ${alunos[idAluno].name}; Nota: ${alunos[idAluno].nota}`)
}
