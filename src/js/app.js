document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        document.documentElement.style.setProperty('--height', `${header.getBoundingClientRect().height}px`);
    });

    // FOOTER SMOOTH SCROLL TOP
    const footerUpBtn = document.querySelector('.footer__up')

    if (footerUpBtn) {
        footerUpBtn.addEventListener('click', (event) => {
            event.preventDefault()

            $('html, body').animate({ scrollTop: 0 }, { duration: 200 }); 
        })
    }

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

    // HEADER && HEADER SEARCH
    const header = document.querySelector('.header')
    const headerBottom = document.querySelector('.header__wrapper--bottom')
    const headerSearchBtn = document.querySelectorAll('.search-btn')
    const headerSearch = document.querySelector('.header-search')

    document.documentElement.style.setProperty('--height', `${header.getBoundingClientRect().height}px`);
    headerBottom.style.setProperty('--width', `0px`);

    if (headerSearchBtn) {
        headerSearchBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                headerSearch.classList.add('header-search--active')

                headerBottom.style.setProperty('--width', `100%`);
            })
        })
    }

    // NAV ITEM HOVER
    const navItems = document.querySelectorAll('.nav__list > li')

    if (navItems) {
        navItems.forEach((item, i) => {
            item.addEventListener('mouseover', () => {
                let navItemsWidth = 0

                for (let j = i + 1; j < navItems.length; j++) {
                    navItemsWidth += document.querySelectorAll('.nav__list > li')[j].getBoundingClientRect().width
                }
                
                if (navItemsWidth > 0) {
                    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `calc(100% - ${navItemsWidth + 21}px`);
                } else {
                    document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `calc(100% - ${navItemsWidth}px`);
                }
            })
    
            item.addEventListener('mouseout', () => {
                if (headerSearch && headerSearch.classList.contains('header-search--active')) {
                    headerBottom.style.setProperty('--width', `100%`);
                } else {
                    headerBottom.style.setProperty('--width', `0px`);
                }
            })
        })
    }

    // HAMBURGER & MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const mobileItemDropdown = document.querySelectorAll('.mobile-menu__dropdown')

    if (hamburger && mobileMenu) {
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

    if (mobileMenu && mobileItemDropdown) {
        mobileItemDropdown.forEach((item) => {
            item.addEventListener('click', function (event) {
                event.preventDefault()

                if (item.classList.contains('mobile-menu__dropdown--active')) {
                    item.classList.remove('mobile-menu__dropdown--active')
                    $(this).next().slideUp(350)
                } else {
                    item.classList.add('mobile-menu__dropdown--active')
                    $(this).next().slideDown(350)
                }
            })
        })
    }

    // MARQUEE
    if ($('.marquee__wrapper')) {
        $('.marquee__wrapper').marquee({
            duration: 9000,
            gap: 36,
            pauseOnHover: true,
            duplicated: true,
            delayBeforeStart: 500,
            startVisible: true
        });
    }

    // SWIPER
    const ads = document.querySelector('.ads__slider')
    const adsSlider = document.querySelector('.ads__slider .swiper-container')

    if (ads && adsSlider) {
        const mySwiperAds = new Swiper(adsSlider, {
            slidesPerView: 'auto',
            centeredSlides: true,
            breakpoints: {
                1200: {
                    centeredSlidesBounds: true
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })

        mySwiperAds.on('slideChange', function () {
            if (mySwiperAds.activeIndex) {
                ads.classList.add('ads__slider--before')
            } else {
                ads.classList.remove('ads__slider--before')
            }
        });
    }

    // ANCHORS ITEM HOVER
    //const anchorsItems = document.querySelectorAll('.anchors__item')

    //if (anchorsItems) {
    //    anchorsItems.forEach((item, i) => {
    //        item.addEventListener('mouseover', () => {
    //            let navItemsWidth = 0

    //            for (let j = i + 1; j < navItems.length; j++) {
    //                navItemsWidth += document.querySelectorAll('.nav__list > li')[j].getBoundingClientRect().width
    //            }
                
    //            if (navItemsWidth > 0) {
    //                document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `calc(100% - ${navItemsWidth + 21}px`);
    //            } else {
    //                document.querySelector('.header__wrapper--bottom').style.setProperty('--width', `calc(100% - ${navItemsWidth}px`);
    //            }
    //        })
    
    //        item.addEventListener('mouseout', () => {
    //            if (headerSearch && headerSearch.classList.contains('header-search--active')) {
    //                headerBottom.style.setProperty('--width', `100%`);
    //            } else {
    //                headerBottom.style.setProperty('--width', `0px`);
    //            }
    //        })
    //    })
    //}
});