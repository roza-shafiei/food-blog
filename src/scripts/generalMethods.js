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
            createSingleFoodCard(recipe, itemsContainer)
        })
    }
}

function getUrlParam(item) {
    let createParams = new URLSearchParams()
    return createParams.get(item)
}

function createSingleFoodCard(recipe, itemsContainer) {
    itemsContainer.insertAdjacentHTML('beforeend', `<div class="food-card swiper-slide" style="min-width: 40%">
            <div class="food-card__img" style="background: url('${recipe.image}')"></div>
                <div class="food-card__main-content">
                <div class="food-card__content">
                     <p class="food-card__title">${recipe.name}</p>
                     <p class="food-card__desc"><span style="font-weight: 500">Ingredients:</span>  ${recipe.ingredients}</p>
                </div>
                      <div class="food-card__info">
                             <span class="food-card__info--span">${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves - ${recipe.rating} Rating</span>
                             <button class="secondary-btn btn">view recipe</button>
                 </div>
            </div>
       </div>`)
}

export {generatePagination, createFoodCard, getUrlParam}
export default {}