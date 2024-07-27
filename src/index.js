const navbarMobileIcon = document.querySelector('.navbar-mobile__icon--container');
const navbarMobileMenu = document.querySelector('.navbar-mobile__menu')
const desktopNavbarItems = document.querySelectorAll('.navbar__list--link');
const mobileNavbarItems = document.querySelectorAll('.navbar-mobile__list--link');
const navbarActionsSearch = document.querySelector('.navbar__actions__search');
const navbarMobileActionsSearch = document.querySelector('.navbar-mobile__actions__search');
const navbarMobileSubscribe = document.querySelector('.navbar-mobile__actions__subscribe');
let containerWrapper = document.querySelector('.container__wrapper');
const subscribeBtn = document.querySelector('.navbar__actions__subscribe');
const searchModal = document.querySelector('.search-modal');
const modalIconClose = document.querySelector('.modal__icon--close');
const modalIconSearch = document.querySelector('.modal__icon--search');
const emailUser = document.querySelector('#email-user');
const emailError = document.querySelector('.email-error')
const footerSubscribeBtn = document.querySelector('.footer-subscribe__btn');
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
navbarMobileIcon.addEventListener('click', onDisplayingMobileNavbar)


//handle search modal display
navbarActionsSearch.addEventListener('click', onDisplayingSearchModal)

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

function onDisplayingSearchModal() {
    showSearchModal = true
    searchModal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    document.body.style.maxHeight = '100vh'
}

function onDisplayingMobileNavbar() {
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
}

navbarMobileActionsSearch.addEventListener('click', onDisplayingSearchModal)
navbarMobileSubscribe.addEventListener('click', () => {
    onDisplayingMobileNavbar()
    navbarMobileSubscribe.href = '#subscribe__section'
})

emailUser.addEventListener('keyup', checkEmail)

function checkEmail() {
    const regex = /^\S+@\S+\.\S+$/
    if (!regex.test(emailUser.value)) {
        emailError.textContent = 'invalid'
        footerSubscribeBtn.disabled = true
        footerSubscribeBtn.classList.add('disabled-btn')


    } else if (emailUser.value && regex.test(emailUser.value)) {
        emailError.textContent = ''
        footerSubscribeBtn.disabled = false
        footerSubscribeBtn.classList.remove('disabled-btn')
    }
}
