document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // CHECKER FOR CLOSE ELEMENTS
    const useItemChecker = (els, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (els.includes(currentEl)) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }

    // SELECT
    const selected = document.querySelectorAll('.select-box__selected')
    const optionsList = document.querySelectorAll('.select-box__option')
    
    if (selected) {
        selected.forEach(item => {
            const close = () => {
                document.querySelectorAll('.select-box__container').forEach((child) => child.classList.remove('select-box__container--active'))
                document.querySelectorAll('.select-box__selected').forEach((child) => child.classList.remove('select-box__selected--active'))
            }
            const itemChecker = useItemChecker([item.parentNode.parentNode.parentNode, ...selected], close)

            item.addEventListener('click', () => {
                if (item.previousElementSibling.classList.contains('select-box__container--active')) {
                    close()
                }
                else {
                    close()
                    item.previousElementSibling.classList.add('select-box__container--active')
                    item.classList.add('select-box__selected--active')
                    itemChecker.setBodyChecker()
                }
            })
        });
    }

    if (optionsList) {
        optionsList.forEach((option) => {
            option.addEventListener('click', (event) => {
                event.preventDefault()

                if (!option.classList.contains('select-box__option--disabled')) {
                    const activeOption = option.parentNode.querySelector('.select-box__option--active')
                    if (activeOption != null) {
                        activeOption.classList.remove('select-box__option--active')
                    }

                    option.parentNode.nextElementSibling.innerHTML = option.querySelector('label').innerHTML

                    option.classList.add('select-box__option--active')
                    option.parentNode.classList.remove('select-box__container--active')
                    option.parentNode.nextElementSibling.classList.remove('select-box__selected--active')
                }
            });
        });
    }

    // HEADER SEARCH
    const navForm = document.querySelector('.nav__form')
    const navInput = document.querySelector('.nav__input')
    const navList = document.querySelector('.nav__list')
    const navSearchBtn = document.querySelector('.nav__search')

    if (navSearchBtn && navList && navForm) {
        const close = () => {
            navList.classList.remove('nav__list--hidden')
            navForm.classList.remove('nav__form--active')
            navSearchBtn.classList.remove('nav__search--active')
            document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `0px`);
        }
        const itemChecker = useItemChecker([navSearchBtn.parentNode.parentNode.parentNode], close)

        navSearchBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (!navList.classList.contains('nav__list--hidden')) {
                if (navInput.value.length > 0) {
                    navSearchBtn.classList.add('nav__search--active')
                }

                navList.classList.add('nav__list--hidden')
                navForm.classList.add('nav__form--active')
                itemChecker.setBodyChecker()
            }
        })
    }

    if (navInput) {
        navInput.addEventListener('input', () => {
            if (navInput.value.length > 0) {
                navSearchBtn.classList.add('nav__search--active')
            } else {
                navSearchBtn.classList.remove('nav__search--active')
            }
        })
    }

    // NAV ITEM HOVER
    const navItems = document.querySelectorAll('.nav__list > li')
    let navItemsWidth = 0
    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `0px`);

    if (navItems) {
        navItems.forEach((item, i) => {
            item.addEventListener('mouseover', () => {
                navItemsWidth = 0
                for (let j = i + 1; j < navItems.length; j++) {
                    navItemsWidth += (document.querySelectorAll('.nav__list > li')[j].getBoundingClientRect().width) + 42 // margin: 42px
                }
                document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `calc(100% - ${navItemsWidth}px`);
            })
    
            item.addEventListener('mouseout', () => {
                if (navList && navForm && navList.classList.contains('nav__list--hidden') && navForm.classList.contains('nav__form--active')) {
                    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `100%`);
                } else {
                    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `0px`);
                }
            })
        })
    }

    // HAMBURGER & MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--active')) {
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                hamburger.classList.add('hamburger--active')
                mobileMenu.classList.add('mobile-menu--active')
                document.body.classList.add('scroll-disabled')
            }
        })
    }
});