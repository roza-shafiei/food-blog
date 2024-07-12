const navbarMobileIcon = document.querySelector('.navbar-mobile__icon--container');
const navbarMobileMenu = document.querySelector('.navbar-mobile__menu')
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

