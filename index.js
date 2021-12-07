const newsAccordian = document.querySelector('#newsAccordion');

// Initialize the news api parameters
let source = 'the-times-of-india';
let apiKey = '84225636ab2c4d699b6bef3da7899fbb';


// create ajax 
let xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

xhr.onload = function() {

    if(this.status === 200){
        let jsonData = JSON.parse(this.responseText);
        
        let articles = jsonData.articles;

        let newsHtml = "";
        articles.forEach((element, index) => {

            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                <b>Breaking News ${index+1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>
                       `;
                        
            newsHtml += news;
        });

        newsAccordian.innerHTML = newsHtml;
        
    }
    else {
        console.log("Some error occured");
    }
}

xhr.send();