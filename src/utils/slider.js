const swiperWrapper = document.querySelector('.swiper-wrapper');
let sliderLoading = false
const sliderLoader = document.querySelector('.slider__loader');
const swiperContainer = document.querySelector('.swiper__container');
window.addEventListener('load', () => {
    try {
        sliderLoading = true
        if (sliderLoading) {
            sliderLoader.style.display = 'block'
            fetch('https://dummyjson.com/recipes?limit=8')
                .then(res => res.json())
                .then((data) => {
                    if (data && data.recipes.length > 0) {
                        generateSlider(data.recipes)
                        swiperContainer.style.display = 'block'
                    } else if (data && !data.recipes.length) {

                    }
                    sliderLoading = false
                    sliderLoader.style.display = 'none'
                });
        }

    } catch (e) {
        console.log('error is', e)
    }
})

function generateSlider(recipes) {
    for (let recipe of recipes) {
        swiperWrapper.insertAdjacentHTML('beforeend', `<div class="food-card swiper-slide" style="min-width: 40%">
            <div class="food-card__img slide__img" style="background: url('${recipe.image}')"></div>
                <div class="food-card__main-content slider__main-content">
                <div class="food-card__content">
                     <p class="food-card__title">${recipe.name}</p>
                     <p class="food-card__desc"><span style="font-weight: 500">Ingredients:</span>  ${recipe.ingredients}</p>
                </div>
                      <div class="food-card__info">
                             <span class="food-card__info--span">${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves - ${recipe.rating} Rating</span>
                             <a class="secondary-btn btn" href="../../src/recipeId.html?id=${recipe.id}">Read</a>
                 </div>
            </div>
       </div>`)
    }
    setTimeout(() => {
        createSlide()
    }, 0)
}

function createSlide() {
    new Swiper(".swiper", {
        autoplay: {
            delay: 2000,
        },
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            // when window width is >= 800px
            800: {
                slidesPerView: 2,
                spaceBetween: 16
            },
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
    });
}

