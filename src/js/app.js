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
        let dropdownArticlesPosition = document.querySelector('.dropdown-articles');
        if (anchorsPosition) {
            stopY = elmYPosition(eID) - Number(anchorsPosition.getBoundingClientRect().height);
        } else if (dropdownArticlesPosition) {
            stopY = elmYPosition(eID) - Number(dropdownArticlesPosition.getBoundingClientRect().height) - 10;
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
    // Максимальная высота среди переданных элементов
    function getMaxElementsHeight($elements) {
        
        let heights = $elements.map(function () {
            return $(this).height();
        }).get();
        
        return Math.max.apply(null, heights);
    }
    
    // Основная функция   
    function fixTableCellHeights($table) {
        
        const $stickyCol = $table.find('.table-indicators__column');
        
        $table.find('.table-indicators__table').find('.table-indicators__row').each((index, row) => {
            // Текущая строка
            let $row = $(row);
            
            // Массив ячеек (в текущей строке + соответствующая ячейка в первой фикс-колонке)        
            let $targetCols = $.merge($row.children('.table-indicators__elem'), $stickyCol.find('.table-indicators__row').eq(index).children());
            
            //  Макисмальная высота среди них       
            let maxCellHeight = Math.round(getMaxElementsHeight($targetCols))
            
            // Устанавливаем
            $targetCols.height(maxCellHeight)
        
        })
    }
 
    $('.table-indicators').each(function(index, table) {
        fixTableCellHeights($(table));
        
        $(window).on('resize', function() {
            fixTableCellHeights($(table));
        })
    
    });

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

                if (hamburger && mobileMenu && hamburger.classList.contains('hamburger--active') && mobileMenu.classList.contains('mobile-menu--active')) {
                    hamburger.classList.remove('hamburger--active')
                    mobileMenu.classList.remove('mobile-menu--active')
                    document.body.classList.remove('scroll-disabled')
                }

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
    let offsetScrollSpy = 0

    if (acnchors) {
        offsetScrollSpy = Number(header.getBoundingClientRect().height + acnchors.getBoundingClientRect().height + 12)
    } else if (document.querySelector('.dropdown-articles') && window.innerWidth < 768) {
        offsetScrollSpy = Number(header.getBoundingClientRect().height + document.querySelector('.dropdown-articles').getBoundingClientRect().height + 12)
    } else {
        offsetScrollSpy = Number(header.getBoundingClientRect().height + 12)
    }

    if (achorsList) {
        $('body').scrollspy({
            target: '#anchors-list',
            offset: offsetScrollSpy,
        });

        $(window).on('activate.bs.scrollspy', function(e, obj) {
            let $thisDesktop = $(`[href="${obj.relatedTarget}"].nav-link`);
            let $thisMobile = $(`[href="${obj.relatedTarget}"].dropdown-articles__link`);

            $thisDesktop.removeClass('prev-active')
            $thisDesktop.parent().nextAll().children('a').removeClass('prev-active')
            $thisDesktop.parent().prevAll().children('a').addClass('prev-active')

            $('.anchors__list').animate({
                scrollLeft: $thisDesktop.parent().position().left - 50
            }, 100);

            $('.dropdown-articles__btn').text($thisMobile.text());
            $('.dropdown-articles__link').removeClass('active');
            $thisMobile.addClass('active');
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

    // WINDOW SCROLL
    window.addEventListener('scroll', () => {
        if (document.querySelector('.articles-nav')) {
            const articlesNavEnd = ($('.articles-nav').offset().top + $('.articles-nav').outerHeight()) - Number(header.getBoundingClientRect().height)
            const articlesEnd = $('.articles').offset().top + $('.articles').outerHeight()
            
            if (window.pageYOffset >= articlesNavEnd && window.pageYOffset <= articlesEnd) {
                $('.dropdown-articles').fadeIn(250);
            } else {
                $('.dropdown-articles').fadeOut(250);
            }
        }
    })

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
                coordinates: [55.75812535,37.652952532062955],
                zoom: 25,
                instance: null  
            },
            {
                id: 'contacts-map-2',
                coordinates: [43.1175126,131.89390420061744],
                zoom: 25,
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
            }).setView(item.coordinates, 14);
    
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
    let ticksSize = (window.innerWidth >= 768) ? 15 : 10;
    let ticksPaddingX = (window.innerWidth >= 768) ? 24 : 2;
    let ticksPaddingY = (window.innerWidth >= 768) ? 14 : 8;

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

    // AMCHARTS MAP
    const amChartsMap = document.getElementById('map');
    const amChartsMapLabel = document.querySelectorAll('.t-group-item__label');

    if (amChartsMapLabel && window.innerWidth < 768) {
        amChartsMapLabel.forEach((item) => {
            item.addEventListener('click', function(event) {
                event.preventDefault()

                $(this).toggleClass('t-group-item__label--active')
                $(this).next().slideToggle(300)
            })
        })
    }

    if (amChartsMap) {
        // am4core.ready()
        am4core.ready(function() {
    
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
          
            // Create map instance
            var chart = am4core.create("map", am4maps.MapChart);
          
            // Set map definition
            chart.geodata = am4geodata_worldHigh;
          
            // Set projection
            chart.projection = new am4maps.projections.Mercator();
          
            // Zoom control
            chart.zoomControl = new am4maps.ZoomControl();
          
            // Center on the groups by default
            chart.homeZoomLevel = 0;
            chart.homeGeoPoint = { longitude: 10, latitude: 42 };
            chart.deltaLongitude = -11;

            // Disabling mouse wheel zoom
            chart.chartContainer.wheelable = false;

            // Zoom control
            chart.zoomControl = new am4maps.ZoomControl();

            chart.zoomControl.minusButton.stroke = "#E9E3DA";
            chart.zoomControl.minusButton.fontWeight = 300;
            chart.zoomControl.minusButton.x = -15;
            chart.zoomControl.minusButton.marginBottom = 13;
            chart.zoomControl.minusButton.background.cornerRadius(0, 0, 0, 0);
            chart.zoomControl.minusButton.background.fill = "#FAF9F8";
            chart.zoomControl.minusButton.background.stroke = "#E9E3DA";
            chart.zoomControl.minusButton.background.states.getKey("hover").properties.fill = "#FAF9F8";
            chart.zoomControl.minusButton.background.states.getKey("hover").properties.stroke = "#ADADAD";

            chart.zoomControl.plusButton.stroke = "#E9E3DA";
            chart.zoomControl.plusButton.fontWeight = 300;
            chart.zoomControl.plusButton.x = -15;
            chart.zoomControl.plusButton.marginBottom = 5;
            chart.zoomControl.plusButton.background.cornerRadius(0, 0, 0, 0);
            chart.zoomControl.plusButton.background.fill = "#FAF9F8";
            chart.zoomControl.plusButton.background.stroke = "#E9E3DA";
            chart.zoomControl.plusButton.background.states.getKey("hover").properties.fill = "#FAF9F8";
            chart.zoomControl.plusButton.background.states.getKey("hover").properties.stroke = "#ADADAD";
            
            // Основной массив с данными. Каждая группа - это объект, в этот объект дополнительно можно прокидывать свои свойства (например ID, по которому в дальнейшем группу можно будет идентифицировать и показать попап)
            
            let groupData = [];
            let $groups = $('.js-map-tooltips').children('.t-group-item');
            
            // Динамически формируем массив групп и их стран  
            // На основе дата-атрибутов
            $groups.each((idx, group) => {
                let countries = $(group).data('countries').split(',');
                
                groupData.push({
                    "id" : $(group).attr('id'),
                    "name" : $(group).find('.t-group-item__label').text(),
                    "color" : $(group).data('color'),
                    "data" : countries.map(country => {
                        return {
                            title: country,
                            id: country
                        }
                    })
                })
            });
          
            // This array will be populated with country IDs to exclude from the world series
            var excludedCountries = ["AQ"];
          
            // Пробегаемся по группам, рисуем их и входящие в них страны на карте, затем добавляем для каждой страны событие ховера и тултип с нашим произвольным текстом (для примера)
            groupData.forEach(function(group) {
                var series = chart.series.push(new am4maps.MapPolygonSeries());
                series.name = group.name;
                series.useGeodata = true;
                var includedCountries = [];
                group.data.forEach(function(country) {
                    includedCountries.push(country.id);
                    excludedCountries.push(country.id);
                });
                series.include = includedCountries;
            
                series.fill = am4core.color(group.color);
          
                // By creating a hover state and setting setStateOnChildren to true, when we
                // hover over the series itself, it will trigger the hover SpriteState of all
                // its countries (provided those countries have a hover SpriteState, too!).
                series.setStateOnChildren = true;
                series.calculateVisualCenter = true;
            
                // Country shape properties & behaviors
                var mapPolygonTemplate = series.mapPolygons.template;
                // Instead of our custom title, we could also use {name} which comes from geodata  
                mapPolygonTemplate.fill = am4core.color(group.color);
                mapPolygonTemplate.fillOpacity = 1;
                mapPolygonTemplate.stroke = "#ADADAD";
                mapPolygonTemplate.strokeWidth = 0.25;
                mapPolygonTemplate.nonScalingStroke = true;
                mapPolygonTemplate.tooltipPosition = "fixed"
                
                // Ховер
                mapPolygonTemplate.events.on("over", function(event) {
                    series.mapPolygons.each(function(mapPolygon) {
                        mapPolygon.isHover = true;
                    })
                    event.target.isHover = false;
                    event.target.isHover = true;
                })
              
                // Снятие ховера
                mapPolygonTemplate.events.on("out", function(event) {
                    series.mapPolygons.each(function(mapPolygon) {
                        mapPolygon.isHover = false;
                    })
                })

                // Tooltip styles
                series.tooltip.background.filters.clear();
                series.tooltip.background.strokeWidth = 0;
                series.tooltip.background.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color('rgba(0,0,0,0)');
                series.tooltip.label.padding(0, 0, 0, 0);
                series.tooltip.label.wrap = true;
            
                // States  
                var hoverState = mapPolygonTemplate.states.create("hover");
            
                // Tooltip
               
                // Зная id текущей группы - мы можем получить дропдаун (.t-group-item__dropdown) этой группы из DOM    
                let dropdown = document.querySelector(`#${group.id} > .t-group-item__dropdown`);
                
                // И его разметку, которую позже засунем в тултип
                let dropdownHtml = `<div class="tooltip-dropdown-wrapper">${dropdown.outerHTML}</div>`
                
                // Вот тут прокидываем в тултип HTML дропдауна, который получили выше
                mapPolygonTemplate.tooltipHTML = dropdownHtml
                
                series.data = JSON.parse(JSON.stringify(group.data));
            });
            
            // The rest of the world.
            var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
            var worldSeriesName = "world";
            worldSeries.name = worldSeriesName;
            worldSeries.useGeodata = true;
            worldSeries.exclude = excludedCountries;
            worldSeries.fillOpacity = 1;
            worldSeries.hiddenInLegend = true;
            worldSeries.mapPolygons.template.nonScalingStroke = true;
            worldSeries.mapPolygons.template.fill = "#FFFFFF";
            worldSeries.mapPolygons.template.stroke = "#ADADAD";
            worldSeries.mapPolygons.template.strokeWidth = 0.25;
          
        }); // end am4core.ready()
    }
});