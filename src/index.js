const navbarMobileIcon = document.querySelector('.navbar-mobile__icon--container');
const navbarMobileMenu = document.querySelector('.navbar-mobile__menu')
const desktopNavbarItems = document.querySelectorAll('.navbar__list--link');
const mobileNavbarItems = document.querySelectorAll('.navbar-mobile__list--link');
const navbarActionsSearch = document.querySelector('.navbar__actions__search');
let containerWrapper = document.querySelector('.container__wrapper');
const subscribeBtn = document.querySelector('.navbar__actions__subscribe');
const searchModal = document.querySelector('.search-modal');
const modalIconClose = document.querySelector('.modal__icon--close');
const modalIconSearch = document.querySelector('.modal__icon--search');
let showMobileMenu = false
let showSearchModal = false

window.addEventListener('load', () => {
    let selectedPage = window.location.pathname.split('/').pop();
    desktopNavbarItems.forEach(item => {
        item.href.includes(selectedPage) && item.classList.add('active-link');
    })
    mobileNavbarItems.forEach(link => {
        link.href.includes(selectedPage) && link.classList.add('mobile-active-link');
    })
})
subscribeBtn.addEventListener('click', () => {
    subscribeBtn.scrollIntoView({behavior: "smooth"});
})
desktopNavbarItems.forEach(item => {
    let currentDesktopActiveLink = document.querySelector('.active-link');
    item.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            if (containerWrapper.classList.contains('fade-out')) {
                window.location = e.target.href;
                currentDesktopActiveLink.classList.remove('active-link');
                e.target.classList.toggle('active-link');
            }
        }, 600)
        containerWrapper.classList.add('fade-out')
    })
})
mobileNavbarItems.forEach(link => {
    let currentMobileActiveLink = document.querySelector('.mobile-active-link');
    link.addEventListener('click', (e) => {
        currentMobileActiveLink.classList.remove('mobile-active-link');
        e.target.classList.toggle('mobile-active-link');
    })
})

// handle the display of mobile navbar menu
navbarMobileIcon.addEventListener('click', (event) => {
    if (!showMobileMenu) {
        navbarMobileMenu.style.visibility = 'visible'
        navbarMobileMenu.style.opacity = '100%'
        document.body.style.overflow = 'hidden'
        document.body.style.maxHeight = '100vh'
        showMobileMenu = true
    } else {
        navbarMobileMenu.style.visibility = 'hidden'
        navbarMobileMenu.style.opacity = '0%'
        document.body.style.overflow = 'auto'
        document.body.style.maxHeight = 'unset'
        showMobileMenu = false
    }
})


//handle search modal display
navbarActionsSearch.addEventListener('click', () => {
    showSearchModal = true
    searchModal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    document.body.style.maxHeight = '100vh'
})

modalIconClose.addEventListener('click', () => {
    showSearchModal = false
    searchModal.style.display = 'none'
    document.body.style.overflow = 'auto'
    document.body.style.maxHeight = 'unset'
})

modalIconSearch.addEventListener('click', (event) => {
    const searchInput = document.querySelector('#search-input')
    let selectedCat = searchInput.value
    let urlParams = new URLSearchParams()
    urlParams.set('cat', selectedCat)
    location.href = `allRecipes.html?${urlParams}`
})