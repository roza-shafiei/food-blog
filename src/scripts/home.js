const tagsContainer = document.querySelector('.embark-journey__tags-container');
const embarkJourneyRecipes = document.querySelector('.embark-journey__recipes');
const embarkJourneyPagination = document.querySelector('.embark-journey__pagination');
let tagsLoading = false
let loading = false;
const cardPerPage = 6
let page = 1
window.addEventListener('load', () => {
    getTags()
})

async function getTags() {
    try {
        tagsLoading = true
        const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
        const data = await res.json()
        let tags = data.slice(4, 12).reverse()
        tags.forEach((tag, i) => {
            tagsContainer.insertAdjacentHTML('afterbegin', `<span class="embark-journey__tag" onclick="onSelectingTag(event)">${tag}</span>`)
        })
        let embarkJourneyTagList = document.querySelectorAll('.embark-journey__tag');
        embarkJourneyTagList[0]?.classList.add('active-tag')
        getSelectedTagRecipes(embarkJourneyTagList[0].textContent)

    } catch (e) {
        console.log(e)
    } finally {
        tagsLoading = false
    }
}

function onSelectingTag(event) {
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
    let paginationBoxCount = Math.floor(tagRecipesList.length / cardPerPage)
    let fragment = document.createDocumentFragment()
    embarkJourneyPagination.innerHTML = ''
    for (let index = 0; index < paginationBoxCount; index++) {
        const span = document.createElement('span')
        span.classList.add('embark-journey__pagination-box')
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
    createFoodCard(tagRecipesList)
    embarkJourneyPagination.append(fragment)
}

function createFoodCard(tagRecipesList) {
    let endIndex = page * cardPerPage
    let startIndex = endIndex - cardPerPage
    let slicedTagRecipes = tagRecipesList.slice(startIndex, endIndex)
    if (slicedTagRecipes.length > 0) {
        embarkJourneyRecipes.innerHTML = ''
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
            cardDesc.textContent = `${recipe.description}`
            cardInfo.classList.add('food-card__info')
            cardButton.className = 'secondary-btn btn'
            cardButton.textContent = 'view recipe'
            cardDetails.textContent = `${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves`
            cardDetails.classList.add('food-card__info--span')
            cardContent.append(cardTitle, cardDesc, cardInfo)
            cardInfo.append(cardDetails, cardButton)
            card.append(imgContainer, cardContent)
            embarkJourneyRecipes.appendChild(card)
        })
    }
}