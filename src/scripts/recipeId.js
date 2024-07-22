let id = null
const recipeIdHeaderTitle = document.querySelector(".recipe-id__header__title");
const recipeIdContent = document.querySelector(".recipe-id__content__img");
const iconsBoxCook = document.querySelector('.icons-box__cook')
const iconsBoxDifficulty = document.querySelector('.icons-box__difficulty')
const iconsBoxServing = document.querySelector('.icons-box__serving')
const boxListIngredients = document.querySelector('.box__list__ingredients')
const infoTextCuisine = document.querySelector('.box__list__info--text-cuisine')
const infoTextCalories = document.querySelector('.box__list__info--text-calories')
const infoTextTime = document.querySelector('.box__list__info--text-time')
const infoTextRate = document.querySelector('.box__list__info--text-rate')
const infoTextServe = document.querySelector('.box__list__info--text-serve')
const recipeIdContentInstructions = document.querySelector('.recipe-id__content--instructions')
const tagsContainer = document.querySelector('.tags-container')
let tags = null
const boxListRelated = document.querySelector('.box__list__related')

window.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search)
    id = params.get('id');
    getRecipeId()
})

async function getRecipeId() {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`)
    const data = await res.json()
    recipeIdHeaderTitle.textContent = data.name
    iconsBoxCook.textContent = data.cookTimeMinutes + ' MIN'
    iconsBoxDifficulty.textContent = data.difficulty + ' PERP'
    iconsBoxServing.textContent = data.servings + ' SERVES'
    recipeIdContent.setAttribute('src', `${data.image}`)
    let ingredientList = data.ingredients
    if (ingredientList) {
        ingredientList.forEach(ingredient => {
            boxListIngredients.insertAdjacentHTML('beforeend', `<li>${ingredient}</li>`)
        })
    }
    infoTextCuisine.textContent = ' ' + data.cuisine
    infoTextCalories.textContent = ' ' + data.caloriesPerServing
    infoTextTime.textContent = ' ' + data.cookTimeMinutes
    infoTextRate.textContent = ' ' + data.rating
    infoTextServe.textContent = ' ' + data.servings
    tags = data.tags
    data.instructions.forEach((instruction, index) => {
        recipeIdContentInstructions.insertAdjacentHTML('beforeend', `<li>${instruction}</li>`)
    })

    tags.forEach(tag => {
        tagsContainer.insertAdjacentHTML('beforeend', `<span class="search-tag">${tag}</span>`)
    })

    if (tags.length > 0) {
        boxListRelated.innerHTML = ''
        const resTag = await fetch(`https://dummyjson.com/recipes/tag/${tags[0]}`)
        const dataRecipes = await resTag.json()
        let relatedRecipes = dataRecipes.recipes
        if (relatedRecipes.length > 0) {
            setTimeout(() => {
                // todo: remove the recipe that is opened now
                // let filteredIndex = relatedRecipes.findIndex(recipe => {
                //     return recipe.id === Number(id)
                // })
                // const splicedArray = relatedRecipes.splice(filteredIndex, 1)
                if (relatedRecipes.length > 0) {
                    relatedRecipes.forEach((recipe) => {
                        boxListRelated.insertAdjacentHTML('beforeend', `<a href="recipeId.html?id=${recipe.id}" class="related__container"><div class="image-container"><img src="${recipe.image}" class="relate__container__image"></div><span class="relate__container__name">${recipe.name}</span></a>`)

                    })
                } else {
                    boxListRelated.insertAdjacentHTML('beforeend', `<div class="image-container">Sorry! No Similar Recipe</div>`)

                }
            }, 0)

        }

    }
}