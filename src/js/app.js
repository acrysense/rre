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

    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID) - 10;
        let anchorsPosition = document.querySelector('.anchors');
        if (anchorsPosition) {
            stopY = elmYPosition(eID) - Number(anchorsPosition.getBoundingClientRect().height);
        }
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
            })
        })
    }

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

    // SLIM SELECT
    const selectResidence = document.querySelectorAll('.select')

    if (selectResidence) {
        selectResidence.forEach(function (el) {
            new SlimSelect({
                select: el
            })
        })
    }

    // TABLE ELEM HEIGHT
    const tableElems = document.querySelectorAll('.table-indicators__elem, .table-indicators__row > td');
    let tableElemsBiggestHeight = 0;

    if (tableElems) {
        tableElems.forEach((item) => {
            tableElemsBiggestHeight = item.getBoundingClientRect().height > tableElemsBiggestHeight ? item.getBoundingClientRect().height : tableElemsBiggestHeight;
        })
        tableElems.forEach((item) => {
            item.style.height = tableElemsBiggestHeight + 'px';
        })
    }

    // HEADER && HEADER SEARCH
    const header = document.querySelector('.header')
    const headerBottom = document.querySelector('.header__wrapper--bottom')
    const headerSearchBtn = document.querySelectorAll('.search-btn')
    const headerSearch = document.querySelector('.header-search')
    const headerSearchTop = document.querySelector('.header-search__top')
    const headerSearchClose = document.querySelector('.header-search__close')
    const overlay = document.querySelector('.overlay')

    document.documentElement.style.setProperty('--height', `${header.getBoundingClientRect().height}px`);
    document.documentElement.style.setProperty('--search', `${headerSearchTop.getBoundingClientRect().height}px`);
    headerBottom.style.setProperty('--width', `0px`);

    if (headerSearchBtn) {
        headerSearchBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                headerSearch.classList.add('header-search--active')
                overlay.classList.add('overlay--active')
                document.body.classList.add('scroll-disabled')

                headerBottom.style.setProperty('--width', `100%`);
            })
        })
    }

    if (headerSearchClose) {
        headerSearchClose.addEventListener('click', (event) => {
            event.preventDefault()

            headerSearch.classList.remove('header-search--active')
            overlay.classList.remove('overlay--active')
            document.body.classList.remove('scroll-disabled')

            headerBottom.style.setProperty('--width', `0`);
        })
    }

    if (overlay) {
        overlay.addEventListener('click', (event) => {
            event.preventDefault()

            headerSearch.classList.remove('header-search--active')
            overlay.classList.remove('overlay--active')
            document.body.classList.remove('scroll-disabled')

            headerBottom.style.setProperty('--width', `0`);
        }
        )
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
                    headerBottom.style.setProperty('--width', `calc(100% - ${navItemsWidth + 21}px)`);
                } else {
                    headerBottom.style.setProperty('--width', `calc(100% - ${navItemsWidth}px)`);
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
            duration: 15000,
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

    // ANCHORS && ITEM HOVER
    const acnchors = document.querySelector('.anchors')
    const achorsList = document.getElementById('anchors-list')
    const anchorsItems = document.querySelectorAll('.anchors__item')
    const offsetScrollSpy = acnchors ? Number(header.getBoundingClientRect().height + acnchors.getBoundingClientRect().height + 12) : Number(header.getBoundingClientRect().height + 12)

    if (achorsList) {
        $('body').scrollspy({
            target: '#anchors-list',
            offset: offsetScrollSpy,
        });

        $(window).on('activate.bs.scrollspy', function(e, obj) {
            let $this = $(`[href="${obj.relatedTarget}"]`);

            $this.removeClass('prev-active')
            $this.parent().nextAll().children('a').removeClass('prev-active')
            $this.parent().prevAll().children('a').addClass('prev-active')

            $('.anchors__list').animate({
                scrollLeft: $this.parent().position().left - 50
            }, 100);
        });
    }
    
    if (anchorsItems) {
        anchorsItems.forEach((item, i) => {
            item.addEventListener('mouseover', () => {
                let anchorsItemsWidth = 0

                for (let j = 0; j <= i; j++) {
                    anchorsItemsWidth += document.querySelectorAll('.anchors__item')[j].getBoundingClientRect().width
                }
                
                if (anchorsItemsWidth > 0) {
                    document.querySelector('.anchors__list').style.setProperty('--width', `calc(${anchorsItemsWidth}px)`);
                } else {
                    document.querySelector('.anchors__list').style.setProperty('--width', `calc(${anchorsItemsWidth}px)`);
                }
            })
    
            item.addEventListener('mouseout', () => {
                document.querySelector('.anchors__list').style.setProperty('--width', `0px`);
            })
        })
    }

    // STRUCTURE ITEM HOVER
    const structureWrapper = document.querySelector('.structure__wrapper')
    const structureItems = document.querySelectorAll('.structure__item')

    if (structureItems) {
        structureItems.forEach((item) => {
            item.addEventListener('mouseover', () => {
                structureWrapper.classList.add('structure__wrapper--hover')
            })
    
            item.addEventListener('mouseout', () => {
                structureWrapper.classList.remove('structure__wrapper--hover')
            })
        })
    }

    // ACCORDIONS
    const accordionsTrigger = $('.accordions__trigger')

    if (accordionsTrigger) {
        accordionsTrigger.on('click', function (event) {
            event.preventDefault()

            $(this).toggleClass('accordions__trigger--active')
            $(this).next().slideToggle()
        })
    }

    // LEAFLET MAPS
    const mapsItem = document.querySelector('.contacts__map')
    const accessToken = '9SeVpBO8XpK5PQfKxQEl8o3P735Af26zC1QVyQUhaI9sf8eMHQGP3rAys5hgFoxt';

    if (mapsItem) {
        const maps = [
            {
                id: 'contacts-map-1',
                coordinates: [55.7672809,37.6697732],
                zoom: 11,
                instance: null  
            },
            {
                id: 'contacts-map-2',
                coordinates: [43.1175126,131.89390420061744],
                zoom: 11,
                instance: null
            },
        ];
    
        maps.forEach(item => initMap(item))
    
        /**
         * Init Map
         * @param {*} item 
         */
        function initMap(item) {
            item.instance = L.map(item.id, {
                attributionControl: false,
                gestureHandling: true,
                gestureHandlingOptions: {
                    duration: 2000,
                    text: {
                        touch: "Для перемещения карты проведите по ней двумя пальцами",
                        scroll: "Используйте Ctrl + колесо мыши для масштабирования карты",
                        scrollMac: "Используйте \u2318 + колесо мыши для масштабирования карты"
                    }
                }
            }).setView(item.coordinates, 11);
    
            L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
                attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 0,
                maxZoom: 22,
                subdomains: 'abcd',
                accessToken
            }).addTo(item.instance);
    
            // На карте появится <div/> с классом .map-marker, который нужно стилизовать через css обычным образом
            let mapMarker = L.divIcon({className: 'map-marker'});
    
            L.marker(item.coordinates, { icon: mapMarker })
                .addTo(item.instance);
        }
    }

    // CHART JS
    const ctx = document.getElementById('myChart');
    let ticksSize = (window.innerHeight >= 768) ? 15 : 10;
    let ticksPaddingX = (window.innerHeight >= 768) ? 24 : 2;
    let ticksPaddingY = (window.innerHeight >= 768) ? 14 : 8;

    const labels = ['2016', '2017', '2018', '2019', '2020'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Profit after taxation',
                data: [125000, 270000, 390000, 370000, 435000],
                backgroundColor: [
                    '#E3D5C0'
                ],
                borderColor: [
                    '#E3D5C0',
                ],
            },
            {
                label: 'Share capital and surplus',
                data: [300000, 580000, 860000, 825000, 975000],
                backgroundColor: [
                    '#2F2355',
                ],
                borderColor: [
                    '#2F2355',
                ],
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                // ID of the container to put the legend in
                containerID: 'legend-container',
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                //title: {
                //    display: true,
                //    text: 'единица изм-ия',
                //    align: 'start',
                //},
                ticks: {
                    color: '#ADADAD',
                    padding: ticksPaddingX,
                    font: {
                        size: ticksSize
                    },
                    userCallback: tick => tick,
                },
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    color: '#ADADAD',
                    padding: ticksPaddingY,
                    font: {
                        size: ticksSize
                    },
                    userCallback: tick => tick,
                },
                grid: {
                    drawBorder: false
                }
            }
        },
    };

    const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');
        
        if (!listContainer) {
            listContainer = document.createElement('ul');
            listContainer.style.display = 'flex';
            listContainer.style.flexDirection = 'row';
            listContainer.style.margin = 0;
            listContainer.style.padding = 0;
        
            legendContainer.appendChild(listContainer);
        }
        
        return listContainer;
    };
      
    const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
            const ul = getOrCreateLegendList(chart, options.containerID);
        
            // Remove old legend items
            while (ul.firstChild) {
                ul.firstChild.remove();
            }
        
            // Reuse the built-in legendItems generator
            const items = chart.options.plugins.legend.labels.generateLabels(chart);
        
            items.forEach(item => {
                const li = document.createElement('li');
                li.style.alignItems = 'center';
                li.style.cursor = 'pointer';
                li.style.display = 'flex';
                li.style.flexDirection = 'row';
                li.style.marginLeft = '10px';
        
                li.onclick = () => {
                    const {type} = chart.config;
                    if (type === 'pie' || type === 'doughnut') {
                        // Pie and doughnut charts only have a single dataset and visibility is per item
                        chart.toggleDataVisibility(item.index);
                    } else {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }
                    chart.update();
                };
        
                // Color box
                const boxSpan = document.createElement('span');
                boxSpan.style.background = item.fillStyle;
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.borderWidth = item.lineWidth + 'px';
                boxSpan.style.display = 'inline-block';
                boxSpan.style.height = '20px';
                boxSpan.style.marginRight = '10px';
                boxSpan.style.width = '20px';
            
                // Text
                const textContainer = document.createElement('p');
                textContainer.style.color = item.fontColor;
                textContainer.style.margin = 0;
                textContainer.style.padding = 0;
                textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
            
                const text = document.createTextNode(item.text);
                textContainer.appendChild(text);
            
                li.appendChild(boxSpan);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
        }
    };

    if (ctx) {
        const config = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });
    }
});