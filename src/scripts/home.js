const tagsContainer = document.querySelector('.embark-journey__tags-container');
const embarkJourneyRecipes = document.querySelector('.embark-journey__recipes');
let tagsLoading = false
let loading = false;
window.addEventListener('load', async () => {
    try {
        tagsLoading = true
        const res = await fetch('https://dummyjson.com/recipes/tags', {method: 'GET'})
        const data = await res.json()
        let tags = data.slice(0, 8)
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
})

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
        console.log(tagRecipesList)
        if (tagRecipesList.length > 0) {
            embarkJourneyRecipes.innerHTML = ''
            tagRecipesList.forEach(recipe => {
                embarkJourneyRecipes.insertAdjacentHTML('afterbegin', `<div class="food-card">
                        <div class="food-card__img" style=""></div>
                        <div class="food-card__content">
                            <p class="food-card__title">${recipe.name}</p>
                            <p class="food-card__desc">Indulge in the rich and savory symphony of flavors with our Savory
                                Herb-Infused Chicken</p>
                            <div class="food-card__info">
                                <span>40 Min - easy prep - 3 serves</span>
                                <button class="secondary-btn btn">view recipe</button>
                            </div>
                        </div>
                    </div>`)
            })
        }


    } catch (err) {
        console.log(err)
    } finally {
        loading = false
    }
}