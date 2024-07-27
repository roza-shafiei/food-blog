import {createFoodCard, generatePagination} from "./generalMethods.js";

let cardPerPage = 6
let page = 1
let loading = false
let tagsLoading = false
let selectedTeg = 'All'
const bestRecipesContainer = document.querySelector('.best-recipes__container');
const tagsContainer = document.querySelector('.tags__container');
const tagsRecipesPagination = document.querySelector('.pagination');
const tagsRecipesContainer = document.querySelector('.tags__recipes');
const recipesSearchInput = document.querySelector('#recipes__search-input');
const recipesSearchButton = document.querySelector('.recipes__search__icon--search');
window.addEventListener('DOMContentLoaded', () => {
    getBestRecipes()
    getTags()
    const urlParams = new URLSearchParams(window.location.search);
    const urlParamsGet = urlParams.get('cat');
    if (urlParamsGet) {
        selectedTeg = urlParamsGet
        recipesSearchInput.value = urlParamsGet
        getSelectedTagRecipes(selectedTeg)
    }
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
        tags.unshift('All')
        tags.forEach((tag, i) => {
            const spanElem = document.createElement('span')
            spanElem.className = 'search-tag'
            spanElem.textContent = tag
            spanElem.onclick = onSelectingTag
            tagsContainer.appendChild(spanElem)
        })
        addingActiveClassToTag()
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
    if (name) {
        selectedTeg = name
    }
    if (selectedTeg === 'All') {
        try {
            loading = true
            const res = await fetch('https://dummyjson.com/recipes')
            const data = await res.json()
            let tagRecipesList = data?.recipes
            generatePagination(tagRecipesList, tagsRecipesPagination, tagsRecipesContainer, cardPerPage, page)
            createFoodCard(tagRecipesList, tagsRecipesContainer, cardPerPage, page)
        } catch (err) {
            console.log(err)
        } finally {
            loading = false
        }
    } else {
        try {
            loading = true
            const res = await fetch(`https://dummyjson.com/recipes/tag/${name}`)
            const data = await res.json()
            let tagRecipesList = data?.recipes
            generatePagination(tagRecipesList, tagsRecipesPagination, tagsRecipesContainer, cardPerPage, page)
            createFoodCard(tagRecipesList, tagsRecipesContainer, cardPerPage, page)
        } catch (err) {
            console.log(err)
        } finally {
            loading = false
        }
    }
}

function addingActiveClassToTag() {
    let allRecipesTagList = document.querySelectorAll('.search-tag');
    allRecipesTagList.forEach(tag => {
        if (tag.innerText.toLowerCase() === selectedTeg || tag.innerText.toUpperCase() === selectedTeg || tag.innerText === selectedTeg) {
            tag.classList.add('active-tag')
        }
    })
}

recipesSearchButton.addEventListener('click', getSelectedTagRecipes(recipesSearchInput.value))