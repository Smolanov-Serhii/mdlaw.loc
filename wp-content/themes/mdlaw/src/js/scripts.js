jQuery(function ($) {

    AOS.init({
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,

        offset: 50,
        delay: 0,
        duration: 1000,
        easing: 'ease',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });

    // ===== Header element =====
    // У тебя классы default/moved вешаешь на <header>, а бургер на .header.
    // Для измерения высоты берём <header>, если его нет — .header.
    const headerDom = document.querySelector('header') || document.querySelector('.header');
    var $header = $("header");

    // ===== Header scroll class toggle =====
    function updateHeader() {
        var top = $(window).scrollTop();

        if (top > 20) {
            $header.removeClass("default").addClass("moved");
        } else {
            $header.removeClass("moved").addClass("default");
        }
    }

    $(window).on("scroll", updateHeader);
    $(updateHeader);

    // ===== Helpers: lock =====
    function lockBody() {
        $("body").addClass("locked");
    }

    function unlockBodyIfNothingOpen() {
        var burgerOpen = $(".header__wrapper").hasClass("active") || $(".header").hasClass("burger");
        var popupOpen = $(".popup-zapis").is(":visible");

        if (!burgerOpen && !popupOpen) {
            $("body").removeClass("locked");
        }
    }

    function openBurger() {
        $(".header").addClass("burger");
        $(".header__wrapper").addClass("active");
        lockBody();
    }

    function closeBurger() {
        $(".header__wrapper").removeClass("active");
        $(".header").removeClass("burger");
        unlockBodyIfNothingOpen();
    }

    function closeBurgerOnMobile() {
        if (window.innerWidth < 991) {
            closeBurger();
        }
    }

    // ===== Burger controls =====
    $(".header__burger").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(".header__wrapper").hasClass("active") || $(".header").hasClass("burger")) {
            closeBurger();
        } else {
            openBurger();
        }
    });

    $(".header__close").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeBurger();
    });

    // ===== Anchor offset with 2 header heights (default/moved) =====
    let headerHDefault = 0;
    let headerHMoved = 0;

    function measureHeaderHeights() {
        if (!headerDom) return;

        const wasDefault = headerDom.classList.contains('default');
        const wasMoved = headerDom.classList.contains('moved');

        // measure default
        headerDom.classList.remove('moved');
        headerDom.classList.add('default');
        headerHDefault = Math.ceil(headerDom.getBoundingClientRect().height);

        // measure moved
        headerDom.classList.remove('default');
        headerDom.classList.add('moved');
        headerHMoved = Math.ceil(headerDom.getBoundingClientRect().height);

        // restore previous state
        headerDom.classList.remove('default', 'moved');
        if (wasDefault) headerDom.classList.add('default');
        if (wasMoved) headerDom.classList.add('moved');

        // fallback: если вдруг классы не используются
        if (!headerHDefault) headerHDefault = Math.ceil(headerDom.getBoundingClientRect().height);
        if (!headerHMoved) headerHMoved = headerHDefault;

        // (опционально) прокинем в CSS переменную — если используешь где-то в стилях
        document.documentElement.style.setProperty('--header-h', headerHMoved + 'px');
    }

    function isBannerTarget(targetEl) {
        if (!targetEl) return false;

        // ⚠️ добавь сюда реальный id баннера, если другой
        return (
            targetEl.classList.contains('banner') ||
            targetEl.id === 'banner' ||
            targetEl.id === 'home'
        );
    }

    function scrollToAnchor(targetEl, behavior = 'smooth') {
        if (!targetEl) return;

        // если это баннер — разрешаем докрутить в самый верх
        const offset = isBannerTarget(targetEl) ? 0 : (headerHMoved || 0);

        const y = window.pageYOffset + targetEl.getBoundingClientRect().top - offset;

        window.scrollTo({
            top: Math.max(0, y),
            behavior
        });
    }

    // первично измеряем (важно после updateHeader)
    measureHeaderHeights();
    window.addEventListener('load', measureHeaderHeights);
    window.addEventListener('resize', measureHeaderHeights);
    window.addEventListener('orientationchange', measureHeaderHeights);

    // ✅ FIX: при клике по пункту меню на мобилке — закрываем бургер
    // + перехватываем якоря и скроллим с учётом fixed header
    $(document).on("click", "#primary-menu a, .header__wrapper a", function (e) {
        const href = this.getAttribute('href') || '';

        // закрываем бургер если открыт
        if ($(".header__wrapper").hasClass("active") || $(".header").hasClass("burger")) {
            closeBurgerOnMobile();
        }

        // если это якорь — скроллим сами (иначе браузер сделает без оффсета)
        if (href.startsWith('#') && href.length > 1) {
            const targetEl = document.querySelector(href);
            if (!targetEl) return;

            e.preventDefault();

            // актуализируем высоты именно перед скроллом
            measureHeaderHeights();

            scrollToAnchor(targetEl, 'smooth');

            // обновим hash без прыжка
            history.pushState(null, '', href);
        }
    });

    // если открыли страницу сразу с #якорем — корректируем позицию
    (function fixInitialHash() {
        const hash = window.location.hash;
        if (!hash || hash === '#') return;

        const targetEl = document.querySelector(hash);
        if (!targetEl) return;

        window.addEventListener('load', () => {
            measureHeaderHeights();
            scrollToAnchor(targetEl, 'auto');
        });
    })();

    // ===== Contact Form 7 success =====
    document.addEventListener("wpcf7mailsent", function () {
        $(".popup-zapis").fadeOut(300);
        $("#success-send").fadeIn(300);
        $(".wpcf7-response-output").empty();

        setTimeout(function () {
            $("#success-send").fadeOut(300);
            unlockBodyIfNothingOpen();
        }, 2000);
    }, false);

    // ===== One global click handler: close on outside click =====
    document.addEventListener("click", function (e) {
        var headerEl = document.querySelector(".header");
        var popupEl = document.querySelector(".popup-zapis");

        var path = (e.composedPath && e.composedPath()) || [];
        var clickInsideHeader = headerEl ? path.includes(headerEl) : false;
        var clickInsidePopup = popupEl ? path.includes(popupEl) : false;

        if (!clickInsideHeader) {
            closeBurger();
        }

        if ($(".popup-zapis").is(":visible") && !clickInsidePopup) {
            if (typeof window.closePopup === "function") {
                window.closePopup();
            } else {
                $(".popup-zapis").fadeOut(300);
                unlockBodyIfNothingOpen();
            }
        }
    });

    const items = document.querySelectorAll('.services__item');

    items.forEach(item => {
        const header = item.querySelector('.services__item-header');
        const content = item.querySelector('.services__item-content');

        content.style.maxHeight = '0px';

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            if (isOpen) {
                item.classList.remove('is-open');
                content.style.maxHeight = '0px';
            } else {
                item.classList.add('is-open');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    const menuLinks = document.querySelectorAll('#primary-menu a');
    const menuItems = Array.from(menuLinks).map(link => ({
        link,
        li: link.closest('li'),
        target: document.querySelector(link.getAttribute('href'))
    })).filter(item => item.target);

    function onScroll() {
        const viewportCenter = window.innerHeight / 2;
        let activeFound = false;

        menuItems.forEach(item => {
            const rect = item.target.getBoundingClientRect();

            const isInCenter =
                rect.top <= viewportCenter + 100 &&
                rect.bottom >= viewportCenter - 100;

            if (isInCenter && !activeFound) {
                item.li.classList.add('is-active');
                activeFound = true;
            } else {
                item.li.classList.remove('is-active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    onScroll();

    const clientsSwiper = new Swiper('.clients__list', {
        slidesPerView: 'auto',
        spaceBetween: 70,
        loop: true,
        speed: 8000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        navigation: {
            nextEl: '.clients__list-nav .next',
            prevEl: '.clients__list-nav .prev',
        },
        breakpoints: {
            320: { spaceBetween: 30 },
            640: { spaceBetween: 40 },
            1024: { spaceBetween: 50 }
        },
        observer: true,
        observeParents: true,

        on: {
            init(swiper) {
                swiper.update();
                requestAnimationFrame(() => {
                    swiper.update();
                    swiper.autoplay.start();
                });
            },
        },
    });

    const rootSelector = '.team__list';

    function markVisible3(swiper) {
        swiper.slides.forEach(slide => {
            slide.classList.remove('is-visible', 'is-visible-1', 'is-visible-2', 'is-visible-3');
        });

        const visible = swiper.visibleSlides || [];

        visible.slice(0, 3).forEach((slide, idx) => {
            slide.classList.add('is-visible', `is-visible-${idx + 1}`);
        });
    }

});
/* дальше твои DOMContentLoaded блоки без изменений */
document.addEventListener('DOMContentLoaded', () => {
    const rootSelector = '.team__list';
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) return;

    function getVisibleCount(swiper) {
        const spv = swiper.params.slidesPerView;
        if (spv === 'auto') return 3;
        const n = Number(spv);
        return Number.isFinite(n) ? n : 3;
    }

    function clearVisibleClasses(swiper) {
        swiper.slides.forEach(slide => {
            slide.classList.remove(
                'is-visible',
                'is-visible-1',
                'is-visible-2',
                'is-visible-3',
                'is-visible-4',
                'is-visible-5'
            );
        });
    }

    function markVisible(swiper) {
        clearVisibleClasses(swiper);

        const count = Math.min(getVisibleCount(swiper), 5);

        const start = swiper.activeIndex;
        for (let i = 0; i < count; i++) {
            const slide = swiper.slides[start + i];
            if (!slide) continue;
            slide.classList.add('is-visible', `is-visible-${i + 1}`);
        }
    }

    let overlayEl = null;

    function closePopup() {
        if (!overlayEl) return;

        overlayEl.classList.remove('is-open');
        document.documentElement.classList.remove('is-team-modal-open');
        document.removeEventListener('keydown', onEsc);

        const elToRemove = overlayEl;
        overlayEl = null;

        const onEnd = (e) => {
            if (e.target !== elToRemove) return;
            elToRemove.removeEventListener('transitionend', onEnd);
            elToRemove.remove();
        };

        elToRemove.addEventListener('transitionend', onEnd);

        setTimeout(() => {
            if (document.body.contains(elToRemove)) elToRemove.remove();
        }, 500);
    }

    function onEsc(e) {
        if (e.key === 'Escape') closePopup();
    }

    function openPopupFromSlide(slideEl) {
        const tpl = slideEl.querySelector('.team__list-modal');
        if (!tpl) return;

        overlayEl = document.createElement('div');
        overlayEl.className = 'team__modal-overlay';

        const modal = tpl.cloneNode(true);
        modal.style.display = 'flex';
        modal.classList.add('is-active');

        overlayEl.appendChild(modal);
        document.body.appendChild(overlayEl);

        document.documentElement.classList.add('is-team-modal-open');

        requestAnimationFrame(() => {
            overlayEl.classList.add('is-open');
        });

        const closeBtn = modal.querySelector('.team__list-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closePopup);

        overlayEl.addEventListener('click', (ev) => {
            if (ev.target === overlayEl) closePopup();
        });

        document.addEventListener('keydown', onEsc);
    }

    const teamSwiper = new Swiper(rootSelector, {
        slidesPerView: 3,
        spaceBetween: 32,
        speed: 600,
        loop: true,

        watchSlidesProgress: true,

        navigation: {
            nextEl: `${rootSelector} .team__list-nav .next`,
            prevEl: `${rootSelector} .team__list-nav .prev`,
        },

        pagination: {
            el: `${rootSelector} .team__list-pag`,
            type: 'progressbar',
        },

        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
        },

        on: {
            init(swiper) { markVisible(swiper); },
            slideChange(swiper) { markVisible(swiper); },
            resize(swiper) { markVisible(swiper); },
            transitionEnd(swiper) { markVisible(swiper); },
        },

        observer: true,
        observeParents: true,
    });

    let downX = 0;
    let downY = 0;
    let moved = false;

    rootEl.addEventListener('pointerdown', (e) => {
        moved = false;
        downX = e.clientX;
        downY = e.clientY;
    });

    rootEl.addEventListener('pointermove', (e) => {
        const dx = Math.abs(e.clientX - downX);
        const dy = Math.abs(e.clientY - downY);
        if (dx > 6 || dy > 6) moved = true;
    });

    rootEl.addEventListener('pointerup', (e) => {
        if (moved) return;

        const slideEl = e.target.closest('.team__list-item.swiper-slide');
        if (!slideEl) return;

        if (overlayEl) closePopup();

        openPopupFromSlide(slideEl);
    });

    teamSwiper.on('slideChange', () => {
        if (overlayEl) closePopup();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.digits__item');
    if (!items.length) return;

    function parseValue(raw) {
        const s = (raw || '').toString().trim();
        const m = s.match(/^(\d+(?:[.,]\d+)?)\s*([^\d\s].*)?$/i);
        if (!m) return null;

        const num = parseFloat(m[1].replace(',', '.'));
        const suffix = (m[2] || '').trim();

        if (!Number.isFinite(num)) return null;
        return { num, suffix };
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateTitle(el, to, suffix, duration = 3000) {
        const from = 0;
        const start = performance.now();

        function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = easeOutCubic(t);
            const val = Math.round(from + (to - from) * eased);

            el.textContent = `${val}${suffix}`;

            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = `${to}${suffix}`;
        }

        requestAnimationFrame(tick);
    }

    const done = new WeakSet();

    items.forEach(item => {
        const title = item.querySelector('.digits__title');
        if (!title) return;

        const targetRaw = title.getAttribute('data-digit') || '';
        const parsed = parseValue(targetRaw);
        if (!parsed) return;

        title.textContent = `0${parsed.suffix}`;
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const item = entry.target;
            const title = item.querySelector('.digits__title');
            if (!title || done.has(title)) return;

            const targetRaw = title.getAttribute('data-digit') || '';
            const parsed = parseValue(targetRaw);
            if (!parsed) return;

            done.add(title);

            const delay = parseInt(item.getAttribute('data-aos-delay') || '0', 10);

            setTimeout(() => {
                animateTitle(title, parsed.num, parsed.suffix, 3000);
            }, Math.max(0, delay));
        });
    }, { threshold: 0.35 });

    items.forEach(item => io.observe(item));
});
