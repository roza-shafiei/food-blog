const navbarMobileIcon = document.querySelector('.navbar-mobile__icon--container');
const navbarMobileMenu = document.querySelector('.navbar-mobile__menu')
const desktopNavbarItems = document.querySelectorAll('.navbar__list--link');
window.addEventListener('load', () => {
    let selectedPage = window.location.pathname.split('/').pop();
    desktopNavbarItems.forEach(item => {
        item.href.includes(selectedPage) && item.classList.add('active-link');
    })

})
desktopNavbarItems.forEach(item => {
    let currentDesktopActiveLink = document.querySelector('.active-link');
    item.addEventListener('click', (e) => {
        e.target.classList.toggle('active-link');
        currentDesktopActiveLink.classList.remove('active-link');
    })
})
let showMobileMenu = false
navbarMobileIcon.addEventListener('click', (event) => {
    if (!showMobileMenu) {
        navbarMobileMenu.style.visibility = 'visible'
        navbarMobileMenu.style.opacity = '100%'
        document.body.style.overflow = 'hidden'
        showMobileMenu = true
    } else {
        navbarMobileMenu.style.visibility = 'hidden'
        navbarMobileMenu.style.opacity = '0%'
        document.body.style.overflow = 'auto'
        showMobileMenu = false

    }
})


