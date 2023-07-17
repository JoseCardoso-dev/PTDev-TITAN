
const booksByCategory = [
    {
        category: "Riqueza",
        books: [
            {
                title: "Os segredos da mente milionária",
                author: "T. Harv Eker",
            },
            {
                title: "O homem mais rico da Babilônia",
                author: "George S. Clason",
            },
            {
                title: "Pai rico, pai pobre",
                author: "Robert T. Kiyosaki e Sharon L. Lechter",
            },
        ],
    },
    {
        category: "Inteligência Emocional",
        books: [
            {
                title: "Você é Insubstituível",
                author: "Augusto Cury",
            },
            {
                title: "Ansiedade – Como enfrentar o mal do século",
                author: "Augusto Cury",
            },
            {
                title: "Os 7 hábitos das pessoas altamente eficazes",
                author: "Stephen R. Covey",
            },
        ],
    },
];


const totalCategory = booksByCategory.length
let totalAuthor = 0

console.log("======= Desafio 4 =======")
for(let category of booksByCategory){
    console.log(`Total de livros da categoria ${category.category}: ${category.books.length}`)
}

for(let category of booksByCategory){
    totalAuthor += category.books.length
}

console.log(`Total de autores: ${totalAuthor}`)

returnLivrosOfAuthor(booksByCategory, "Augusto Cury")


function returnLivrosOfAuthor(books, author){
    for(let category of books){
        for(let livro=0; livro < category.books.length; livro++){
            if(category.books[livro].author == author)
            console.log(category.books[livro].title)
        }
    }

    return 0
}


