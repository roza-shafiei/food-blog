let cardPerPage = 6
let page = 1
let loading = false
let tagsLoading = false
const bestRecipesContainer = document.querySelector('.best-recipes__container');
const tagsContainer = document.querySelector('.tags__container');
const tagsRecipesPagination = document.querySelector('.pagination');
const tagsRecipesList = document.querySelector('.tags__recipes');
window.addEventListener('DOMContentLoaded', () => {
    getBestRecipes()
    getTags()
})

async function getBestRecipes() {
    const res = await fetch('https://dummyjson.com/recipes?limit=3&skip=10')
    const recipeList = await res.json()
    showBestRecipes(recipeList.recipes)
}

function showBestRecipes(items) {
    for (let recipe of items) {
        bestRecipesContainer.insertAdjacentHTML('beforeend', `<div class="best__card" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('${recipe.image}');
})">
<span class="best__card__name">${recipe.name}</span>
</div>`)
    }
}


async function getTags() {
    try {
        tagsLoading = true
        const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
        const data = await res.json()
        const tags = data.slice(0, 30)
        tags.forEach((tag, i) => {
            const spanElem = document.createElement('span')
            spanElem.className = 'search-tag'
            spanElem.textContent = tag
            spanElem.onclick = onSelectingTag
            tagsContainer.appendChild(spanElem)
        })
        let allRecipesTagList = document.querySelectorAll('.search-tag');
        allRecipesTagList[0]?.classList.add('active-tag')
        getSelectedTagRecipes(allRecipesTagList[0].textContent)

    } catch (e) {
        console.log(e)
    } finally {
        tagsLoading = false
    }
}

function onSelectingTag(event) {
    page = 1
    let currentActive = document.querySelector('.active-tag')
    if (currentActive) {
        currentActive.classList.remove('active-tag')
    }
    event.target.classList.add('active-tag')
    getSelectedTagRecipes(event.target.textContent)
}


async function getSelectedTagRecipes(name) {
    try {
        loading = true
        const res = await fetch(`https://dummyjson.com/recipes/tag/${name}`)
        const data = await res.json()
        let tagRecipesList = data?.recipes
        generatePagination(tagRecipesList)
    } catch (err) {
        console.log(err)
    } finally {
        loading = false
    }
}

function generatePagination(tagRecipesList) {
    let paginationBoxCount = Math.ceil(tagRecipesList.length / cardPerPage)
    let fragment = document.createDocumentFragment()
    tagsRecipesPagination.innerHTML = ''
    if (paginationBoxCount !== 1) {
        for (let index = 0; index < paginationBoxCount; index++) {
            const span = document.createElement('span')
            span.classList.add('pagination-box')
            span.innerText = `${index + 1}`
            if (page === Number(span.textContent)) {
                span.classList.add('active-page')
            }
            span.addEventListener('click', (event) => {
                let currentActivePage = document.querySelector('.active-page')
                page = event.target.textContent
                currentActivePage.classList.remove('active-page')
                event.target.classList.add('active-page')
                createFoodCard(tagRecipesList)
            })
            fragment.appendChild(span)
        }
    }
    createFoodCard(tagRecipesList)
    tagsRecipesPagination.append(fragment)
}

function createFoodCard(tagRecipesList) {
    let endIndex = page * cardPerPage
    let startIndex = endIndex - cardPerPage
    let slicedTagRecipes = tagRecipesList.slice(startIndex, endIndex)
    if (slicedTagRecipes.length > 0) {
        tagsRecipesList.innerHTML = ''
        slicedTagRecipes.forEach(recipe => {
            const card = document.createElement('div')
            const cardInfo = document.createElement('div')
            const imgContainer = document.createElement('div')
            const cardContent = document.createElement('div')
            const cardTitle = document.createElement('p')
            const cardDesc = document.createElement('p')
            const cardDetails = document.createElement('span')
            const cardButton = document.createElement('button')
            card.classList.add('food-card')
            imgContainer.classList.add('food-card__img')
            imgContainer.style.background = `url(${recipe.image})`
            cardContent.classList.add('food-card__content')
            cardTitle.classList.add('food-card__title')
            cardDesc.classList.add('food-card__desc')
            cardTitle.textContent = `${recipe.name}`
            cardDesc.innerHTML = `<p class="food-card__desc"><span style="font-weight: 500">Ingredients:</span>  ${recipe.ingredients}</p>
`
            cardInfo.classList.add('food-card__info')
            cardButton.className = 'secondary-btn btn'
            cardButton.textContent = 'view recipe'
            cardDetails.textContent = `${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves - ${recipe.rating} Rating`
            cardDetails.classList.add('food-card__info--span')
            cardContent.append(cardTitle, cardDesc, cardInfo)
            cardInfo.append(cardDetails, cardButton)
            card.append(imgContainer, cardContent)
            tagsRecipesList.appendChild(card)
        })
    }
}