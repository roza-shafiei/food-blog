const navbarMobileIcon = document.querySelector('.navbar-mobile__icon--container');
const navbarMobileMenu = document.querySelector('.navbar-mobile__menu')
const desktopNavbarItems = document.querySelectorAll('.navbar__list--link');
const mobileNavbarItems = document.querySelectorAll('.navbar-mobile__list--link');
let containerWrapper = document.querySelector('.container__wrapper');
const subscribeBtn = document.querySelector('.navbar__actions__subscribe');
let showMobileMenu = false

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
