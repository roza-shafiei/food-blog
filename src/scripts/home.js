import {createFoodCard, generatePagination} from "./generalMethods.js";

const tagsContainer = document.querySelector('.embark-journey__tags-container');
const embarkJourneyRecipes = document.querySelector('.embark-journey__recipes');
const embarkJourneyPagination = document.querySelector('.pagination');
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
        const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
        const data = await res.json()
        let tags = data.slice(4, 12).reverse()
        tags.forEach((tag, i) => {
            tagsContainer.insertAdjacentHTML('beforeend', `<span class="search-tag" onclick="onSelectingTag(event)">${tag}</span>`)
        })

        let embarkJourneyTagList = document.querySelectorAll('.search-tag');
        embarkJourneyTagList[0]?.classList.add('active-tag')
        getSelectedTagRecipes(embarkJourneyTagList[0]?.textContent)

    } catch (e) {
        console.log(e)
    } finally {
        tagsLoading = false
    }
}


async function getSelectedTagRecipes(name) {
    try {
        loading = true
        const res = await fetch(`https://dummyjson.com/recipes/tag/${name}`)
        const data = await res.json()
        let tagRecipesList = data?.recipes
        generatePagination(tagRecipesList, embarkJourneyPagination, embarkJourneyRecipes, cardPerPage, page)
        createFoodCard(tagRecipesList, embarkJourneyRecipes, cardPerPage, page)

    } catch (err) {
        console.log(err)
    } finally {
        loading = false
    }
}



