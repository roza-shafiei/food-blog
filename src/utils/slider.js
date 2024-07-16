const swiperWrapper = document.querySelector('.swiper-wrapper');
window.addEventListener('load', () => {
    try {
        fetch('https://dummyjson.com/recipes?limit=8')
            .then(res => res.json())
            .then((data) => {
                generateSlider(data.recipes)
            });
    } catch (e) {
        console.log('error is', e)
    }
})

function generateSlider(recipes) {
    for (let recipe of recipes) {
        swiperWrapper.insertAdjacentHTML('afterbegin', `<div class="food-card swiper-slide" style="min-width: 40%">
            <div class="food-card__img" style="background: url('${recipe.image}')"></div>
                <div class="food-card__content">
                     <p class="food-card__title">${recipe.name}</p>
                          <p class="food-card__desc"><span style="font-weight: 500">Ingredients:</span>  ${recipe.ingredients}</p>
                                <div class="food-card__info">
                                            <span class="food-card__info--span">${recipe.prepTimeMinutes} Min - ${recipe.servings} Serves - ${recipe.rating} Rating</span>
                                            <button class="secondary-btn btn">view recipe</button>
                                </div>
                      </div>
            </div>`)
    }
    setTimeout(() => {
        createSlide()
    }, 0)
}

function createSlide() {
    new Swiper(".mySwiper", {
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            // when window width is >= 800px
            800: {
                slidesPerView: 2,
                spaceBetween: 20
            },
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
    });
}

