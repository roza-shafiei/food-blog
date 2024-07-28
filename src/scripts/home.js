import {createFoodCard, generatePagination} from "./generalMethods.js";

const tagsContainer = document.querySelector('.embark-journey__tags-container');
const embarkJourneyRecipes = document.querySelector('.embark-journey__recipes');
const embarkJourneyPagination = document.querySelector('.pagination');
const tagsLoader = document.querySelector('.tags__loader');
const recipesLoader = document.querySelector('.recipes__loader');
const recipesEmptyPlaceholder = document.querySelector('.recipes__empty-placeholder');
let tagsLoading = false
let loading = false;
const cardPerPage = 6
let page = 1
window.addEventListener('load', () => {
    getTags()
    window.onSelectingTag = (event) => {
        page = 1
        let currentActive = document.querySelector('.active-tag')
        if (currentActive) {
            currentActive.classList.remove('active-tag')
        }
        event.target.classList.add('active-tag')
        getSelectedTagRecipes(event.target.textContent)
    }
})

async function getTags() {
    try {
        tagsLoading = true
        if (tagsLoading) {
            tagsLoader.style.display = 'block'
            const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
            const data = await res.json()
            if (data) {
                let tags = data.slice(4, 12).reverse()
                tags.forEach((tag, i) => {
                    tagsContainer.insertAdjacentHTML('beforeend', `<span class="search-tag" onclick="onSelectingTag(event)">${tag}</span>`)
                })
            }
            tagsLoading = false
            tagsLoader.style.display = 'none'
        }
        let embarkJourneyTagList = document.querySelectorAll('.search-tag');
        embarkJourneyTagList[0]?.classList.add('active-tag')
        getSelectedTagRecipes(embarkJourneyTagList[0]?.textContent)

    } catch (e) {
        console.log(e)
    }
}


async function getSelectedTagRecipes(name) {
    try {
        loading = true
        if (loading) {
            recipesLoader.style.display = 'block'
            const res = await fetch(`https://dummyjson.com/recipes/tag/${name}`)
            const data = await res.json()
            if (data.recipes.length > 0) {
                let tagRecipesList = data?.recipes
                generatePagination(tagRecipesList, embarkJourneyPagination, embarkJourneyRecipes, cardPerPage, page)
                createFoodCard(tagRecipesList, embarkJourneyRecipes, cardPerPage, page)
            } else {
                recipesEmptyPlaceholder.style.display = 'block'
            }
            loading = false
            recipesLoader.style.display = 'none'
        }
    } catch (err) {
        console.log(err)
    } finally {
        loading = false
    }
}



