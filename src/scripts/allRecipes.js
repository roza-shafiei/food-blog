const bestRecipesContainer = document.querySelector('.best-recipes');
window.addEventListener('DOMContentLoaded', () => {
    getBestRecipes()
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