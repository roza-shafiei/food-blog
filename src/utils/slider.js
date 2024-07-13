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
        swiperWrapper.insertAdjacentHTML('afterbegin', `<div class="food-card">
            <div class="food-card__img"></div>
                <div class="food-card__content">
                     <p class="food-card__title">Savory Herb-Infused Chicken</p>
                          <p class="food-card__desc">Indulge in the rich and savory symphony of flavors with our Savory
                                            Herb-Infused Chicken</p>
                                <div class="food-card__info">
                                            <span>40 Min - easy prep - 3 serves</span>
                                            <button class="secondary-btn btn">view recipe</button>
                                </div>
                      </div>
            </div>`)
    }
    setTimeout(() => {
        createSlide()

    }, 5000)
}

function createSlide() {
    new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        mousewheelControl: true,
        keyboardControl: true,
    });
}

