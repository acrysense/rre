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

    // SELECT
    const selected = document.querySelectorAll('.select-box__selected')
    const optionsList = document.querySelectorAll('.select-box__option')

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

    // HEADER
    document.querySelectorAll('.nav__list > li').forEach((item) => {
        console.log(item.getBoundingClientRect().width)
    })

    let navWidth = document.querySelector('.nav__list').getBoundingClientRect().width;
    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `${navWidth}px`);

    // HAMBURGER & MOBILE MENU

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    //const mobileMenu = document.querySelector('.mobile-menu')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            //if (hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--active')) {
            if (hamburger.classList.contains('hamburger--active')) {
                hamburger.classList.remove('hamburger--active')
                //mobileMenu.classList.remove('mobile-menu--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                hamburger.classList.add('hamburger--active')
                //mobileMenu.classList.add('mobile-menu--active')
                document.body.classList.add('scroll-disabled')
            }
        })
    }
});