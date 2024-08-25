import {createFoodCard, generatePagination} from "./generalMethods.js";

let cardPerPage = 6
let page = 1
let loading = false
let tagsLoading = false
let bestLoading = false
let searchLoading = false
let selectedTeg = 'All'
const bestRecipesContainer = document.querySelector('.best-recipes__container');
const tagsContainer = document.querySelector('.tags__container');
const tagsRecipesPagination = document.querySelector('.pagination');
const tagsRecipesContainer = document.querySelector('.tags__recipes');
const recipesSearchInput = document.querySelector('#recipes__search-input');
const recipesSearchButton = document.querySelector('.recipes__search__icon--search');
const bestRecipesLoader = document.querySelector('.best-recipes__loader');
const allRecipesTagsLoader = document.querySelector('.all-recipes__tags__loader');
const tagsRecipesLoader = document.querySelector('.tags__recipes__loader');
const tagsRecipesEmptyPlaceholder = document.querySelector('.tags__recipes__empty-placeholder');
let query = null
window.addEventListener('DOMContentLoaded', () => {
    getBestRecipes() //To get best recipes and display them at the top of page
    getTags() // To get Tags
    //Check if there is any food params in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlParamsGet = urlParams.get('food');
    if (urlParamsGet) {
        query = urlParamsGet
        recipesSearchInput.value = urlParamsGet
        searchSelectedRecipe()
    }
})
recipesSearchButton.addEventListener('click', checkQueryValue) //Handle click on search icon
async function getBestRecipes() {
    try {
        bestLoading = true
        bestRecipesLoader.style.display = 'block'
        const res = await fetch('https://dummyjson.com/recipes?limit=3&skip=10')
        const recipeList = await res.json()
        showBestRecipes(recipeList.recipes)
    } catch (e) {
        console.log('The error is', e)
    } finally {
        bestLoading = false
        bestRecipesLoader.style.display = 'none'
    }
}

function showBestRecipes(items) {
    for (let recipe of items) {
        bestRecipesContainer.insertAdjacentHTML('beforeend', `<a href="recipeId.html?id=${recipe.id}" class="best__card" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('${recipe.image}');
        })">
        <span class="best__card__name">${recipe.name}</span>
        </a>`)
    }
} //Create best cards

async function getTags() {
    try {
        tagsLoading = true
        allRecipesTagsLoader.style.display = 'block'
        const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
        const data = await res.json()
        const tags = ['All', ...data.slice(0, 30)];
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
        allRecipesTagsLoader.style.display = 'none'
    }
}

function onSelectingTag(event) {
    page = 1
    query = null
    recipesSearchInput.value = ''
    let currentActive = document.querySelector('.active-tag')
    // let urlParams = new URLSearchParams(window.location.search);
    // if (window.location.search.length) {
    //     urlParams.delete('food')
    //     window.location.search = urlParams
    // }
    if (currentActive) {
        currentActive.classList.remove('active-tag')
    }
    event.target.classList.add('active-tag')
    getSelectedTagRecipes(event.target.textContent)
} //When click on a tag

async function getSelectedTagRecipes(name) {
    if (name) {
        selectedTeg = name
    }
    if (selectedTeg === 'All' && !query) {
        try {
            loading = true
            tagsRecipesLoader.style.display = 'block';
            const res = await fetch('https://dummyjson.com/recipes')
            const data = await res.json()
            let tagRecipesList = data?.recipes
            if (tagRecipesList.length > 0) {
                tagsRecipesEmptyPlaceholder.style.display = 'none'
                generatePagination(tagRecipesList, tagsRecipesPagination, tagsRecipesContainer, cardPerPage, page)
                createFoodCard(tagRecipesList, tagsRecipesContainer, cardPerPage, page)
            } else {
                tagsRecipesEmptyPlaceholder.style.display = 'block'
            }
            loading = false
            tagsRecipesLoader.style.display = 'none'
        } catch (err) {
            console.log(err)
        } finally {
            loading = false;
            tagsRecipesLoader.style.display = 'none';
        }
    } else if (selectedTeg !== 'All' && !query) {
        try {
            loading = true
            tagsRecipesLoader.style.display = 'block';
            const res = await fetch(`https://dummyjson.com/recipes/tag/${name}`)
            const data = await res.json()
            let tagRecipesList = data?.recipes
            if (tagRecipesList.length > 0) {
                tagsRecipesEmptyPlaceholder.style.display = 'none'
                generatePagination(tagRecipesList, tagsRecipesPagination, tagsRecipesContainer, cardPerPage, page)
                createFoodCard(tagRecipesList, tagsRecipesContainer, cardPerPage, page)
            } else {
                tagsRecipesEmptyPlaceholder.style.display = 'block'
            }
        } catch (err) {
            console.log(err)
        } finally {
            loading = false
            tagsRecipesLoader.style.display = 'none'
        }
    } else if (query) {
        searchSelectedRecipe()
    }
} // When tag is selected (default is All)

function addingActiveClassToTag() {
    let allRecipesTagList = document.querySelectorAll('.search-tag');
    allRecipesTagList.forEach(tag => {
        if (tag.innerText.toLowerCase() === selectedTeg || tag.innerText.toUpperCase() === selectedTeg || tag.innerText === selectedTeg) {
            tag.classList.add('active-tag')
        }
    })
    getSelectedTagRecipes()
} //Add active class to a tag and get recipes related to that tag

async function searchSelectedRecipe() {
    try {
        searchLoading = true
        if (searchLoading) {
            tagsRecipesLoader.style.display = 'block'
            const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
            const data = await res.json()
            let tagRecipesList = data?.recipes
            tagsRecipesContainer.innerHTML = ''
            if (tagRecipesList.length > 0) {
                generatePagination(tagRecipesList, tagsRecipesPagination, tagsRecipesContainer, cardPerPage, page)
                createFoodCard(tagRecipesList, tagsRecipesContainer, cardPerPage, page)
            } else {
                tagsRecipesEmptyPlaceholder.style.display = 'block'
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        searchLoading = false
        tagsRecipesLoader.style.display = 'none'
    }
} //Handle if there is search query

function checkQueryValue() {
    query = recipesSearchInput.value
    if (!query) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('food')
        window.location.search = urlParams
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('food', recipesSearchInput.value)
        window.location.search = urlParams
        searchSelectedRecipe()
    }
}
