function generatePagination(itemsList, paginationContainer, itemsContainer, cardPerPage, page) {
    let paginationBoxCount = Math.ceil(itemsList.length / cardPerPage) - 1
    let fragment = document.createDocumentFragment()
    paginationContainer.innerHTML = ''
    if (paginationBoxCount) {
        for (let index = 0; index < paginationBoxCount + 1; index++) {
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
                createFoodCard(itemsList, itemsContainer, cardPerPage, page)
            })
            fragment.appendChild(span)
        }
    }
    paginationContainer.append(fragment)
}

function createFoodCard(itemsList, itemsContainer, cardPerPage, page) {
    let endIndex = page * cardPerPage
    let startIndex = endIndex - cardPerPage
    let slicedTagRecipes = itemsList.slice(startIndex, endIndex)
    if (slicedTagRecipes.length > 0) {
        itemsContainer.innerHTML = ''
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
            cardDetails.textContent = `${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves`
            cardDetails.classList.add('food-card__info--span')
            cardContent.append(cardTitle, cardDesc, cardInfo)
            cardInfo.append(cardDetails, cardButton)
            card.append(imgContainer, cardContent)
            itemsContainer.appendChild(card)
        })
    }
}

function getUrlParam(item) {
    let createParams = new URLSearchParams()
    return createParams.get(item)
}

export {generatePagination, createFoodCard, getUrlParam}
export default {}