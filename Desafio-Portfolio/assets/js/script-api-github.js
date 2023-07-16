const repositories = document.querySelector('.section-project');
const showAllArticlesLink = document.getElementById('show-all-articles');

showAllArticlesLink.addEventListener('click', function(event) {
    event.preventDefault();
    toggleHiddenArticles();
  });

function toggleHiddenArticles() {
    hiddenArticles.forEach(article => {
        article.toggleAttribute("hidden");
    });
}

function getApiGitHub(){
    fetch('https://api.github.com/users/JoseCardoso-dev/repos')
        .then(async res => {
            if(!res.ok){
                throw new Error(res.status);
            }

            let data = await  res.json();
            data.map ((item, index) => {
                if (item.name !== "JoseCardoso-dev") {
                    let project = document.createElement('article');
                    project.classList.add("article-container")
                    
                    project.innerHTML = `
                        <div class="head-article">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                            stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 
                            2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                            <a href="${item.html_url}" target="_blank">${item.name}</a>
                        </div>
                        
                        <p>${item.description}</p>

                        <div class="footer-article">
                            <div class="left-elements">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 
                                8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon></svg>
                                <span>100</span>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                stroke-linejoin="round" class="feather feather-git-branch"><line x1="6" y1="3" 
                                x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" 
                                r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                                <span>100</span>
                            </div>

                            <div class="right-elements">
                                <div class="circle"></div>
                                <span>${item.language}</span>
                            </div>
                        </div>
                    `
                    
                    if(index > 1){
                        project.setAttribute("hidden", "true");
                        project.classList.add("hidden")
                    }

                    repositories.appendChild(project);
                }
            })

            hiddenArticles = document.querySelectorAll('.hidden');
        })
}

getApiGitHub()
