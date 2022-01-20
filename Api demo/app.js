// fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=06a8348b867c4880adf002dd9b745d61&includeNutrition=true. `).then(response => response.json())
//     .then(data => {
//         console.log(data.dishTypes)
//         console.log(data)
//     })

const pageLeft = document.querySelector('.page-left');
const pageRight = document.querySelector('.page-right')
const pageLeftContent = document.querySelector('.page-left_content');
const pageRightContent = document.querySelector('.page-right_content')
const randomRecipe = document.querySelector('.random-recipe')
const newsContainer = document.querySelector('.news')

const nutriLabel = document.querySelector('.recipe-nutrilabel')
const pageRightWidth = pageRight.offsetWidth;
const pageLeftWidth = pageLeft.offsetWidth;

const apiKey = "?apiKey=06a8348b867c4880adf002dd9b745d61&include"






pageLeft.addEventListener('click', function () {
    fetch(`https://api.spoonacular.com/recipes/random${apiKey}`).then(response => response.json())
        .then(data => {
            const localData = data.recipes[0];
            console.log(localData);


            const randomRecipeRender = (fetch) => {
                const ingridients = fetch.extendedIngredients.map(e => e.aisle)

                let htmlLeft = `
                <p>${fetch.title}</p>
                <div class="recipe-img">
                    <img src="${fetch.image}" alt="">
                </div>
                <div class="recipe-ingridients">
                    THINGS YOU ARE GOING TO NEED: <br>
                    ${ingridients}
                </div>
                <div class="recipe-instructions">
                    ${fetch.instructions} 
                </div>

            `

                randomRecipe.insertAdjacentHTML('beforeend', htmlLeft);
            }
            randomRecipeRender(localData);
            let recipeID = localData.id
            return fetch(`https://api.spoonacular.com/recipes/${recipeID}/nutritionLabel${apiKey}`)
        }).then(response => response.text()).then(data => {
            // console.log(data);
            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            console.log(doc);

            // Get the image file
            var img = doc.getElementById('spoonacular-nutrition-label');
            console.log(img);
            nutriLabel.appendChild(img)
        })



    pageLeft.classList.add('active')
    pageRight.style.width = '5%'
    pageLeftContent.classList.remove('hidden')
})

pageRight.addEventListener('click', function () {

    async function pageRightF() {
        const news = await fetch(`https://inshortsapi.vercel.app/news?category=business`);
        const newsJson = await news.json();
        console.log(newsJson);

        let htmlRight = `
        <div class="news1">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[0].author}
            </p>
            <p class="date">Published on: ${newsJson.data[0].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[0].content}</p>
            <img class="news-img" src="${newsJson.data[0].imageUrl}"></img>
        </div>
    </div>
    <div class="news2">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[1].author}
            </p>
            <p class="date">Published on: ${newsJson.data[1].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[1].content}</p>
            <img class="news-img" src="${newsJson.data[1].imageUrl}"></img>
        </div>
    </div>
    <div class="news3">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[2].author}
            </p>
            <p class="date">Published on: ${newsJson.data[2].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[2].content}</p>
            <img class="news-img" src="${newsJson.data[2].imageUrl}"></img>
        </div>
    </div>
    <div class="news4">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[3].author}
            </p>
            <p class="date">Published on: ${newsJson.data[3].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[3].content}</p>
            <img class="news-img" src="${newsJson.data[3].imageUrl}"></img>
        </div>
    </div>
    <div class="news5">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[4].author}
            </p>
            <p class="date">Published on: ${newsJson.data[4].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[4].content}</p>
            <img class="news-img" src="${newsJson.data[4].imageUrl}"></img>
        </div>
    </div>
    <div class="news6">
        <div class="news-info">
            <p class="author">
                Author: ${newsJson.data[5].author}
            </p>
            <p class="date">Published on: ${newsJson.data[5].date}</p>
        </div>
        <div class="news-content">
            <p>${newsJson.data[5].content}</p>
            <img class="news-img" src="${newsJson.data[5].imageUrl}"></img>
        </div>
    </div>
        `

        newsContainer.insertAdjacentHTML("afterbegin", htmlRight)

    }


    pageRightF();







    pageRight.classList.add('active')
    pageLeft.style.width = '5%'
    pageRightContent.classList.remove('hidden')
})






























// let objekat = [
//     { aisle: "milk" },
//     { aisle: "milk" },
//     { aisle: "milk" },
//     { aisle: "mrk" },
//     { aisle: "egg" }
// ]
// let novi = objekat.map(e => e.aisle)
// console.log(novi);