jQuery(function ($) {

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 50, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

    // ===== Header scroll class toggle =====
    var $header = $("header");

    function updateHeader() {
        var top = $(window).scrollTop();

        if (top > 20) {
            $header.removeClass("default").addClass("moved");
        } else {
            $header.removeClass("moved").addClass("default");
        }
    }

// 1️⃣ При скролле
    $(window).on("scroll", updateHeader);

// 2️⃣ СРАЗУ после загрузки страницы
    $(updateHeader);

    // ===== Helpers =====
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

    // ===== Burger controls =====
    $(".header__burger").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // toggle burger
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


    // ===== Contact Form 7 success =====
    document.addEventListener("wpcf7mailsent", function () {
        $(".popup-zapis").fadeOut(300);
        $("#success-send").fadeIn(300);
        $(".wpcf7-response-output").empty();

        setTimeout(function () {
            $("#success-send").fadeOut(300);
            // После успеха закрываем попап и снимаем lock, если бургер тоже закрыт
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

        // Если клик вне хедера — закрываем бургер
        if (!clickInsideHeader) {
            closeBurger();
        }

        // Если попап открыт и клик вне попапа — закрываем попап
        if ($(".popup-zapis").is(":visible") && !clickInsidePopup) {
            closePopup();
        }
    });

    const items = document.querySelectorAll('.services__item');

    items.forEach(item => {
        const header = item.querySelector('.services__item-header');
        const content = item.querySelector('.services__item-content');

        // гарантируем закрытое состояние
        content.style.maxHeight = '0px';

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            if (isOpen) {
                // закрываем
                item.classList.remove('is-open');
                content.style.maxHeight = '0px';
            } else {
                // открываем
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

    // начальная инициализация
    onScroll();

    const clientsSwiper = new Swiper('.clients__list', {
        slidesPerView: 'auto',      // автоматически по ширине слайда
        spaceBetween: 70,           // отступ между слайдами (подгони под дизайн)
        loop: true,                // true если нужен бесконечный скролл
        speed: 8000,                 // чем больше — тем медленнее “едет” (да, наоборот ощущается)
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,   // остановка при наведении (можешь убрать)
        },

        navigation: {
            nextEl: '.clients__list-nav .next',
            prevEl: '.clients__list-nav .prev',
        },
        breakpoints: {
            320: {
                spaceBetween: 30,
            },
            640: {
                spaceBetween: 40,
            },
            1024: {
                spaceBetween: 50,
            }
        },
        observer: true,
        observeParents: true,

        on: {
            init(swiper) {
                // 1) сразу после init
                swiper.update();

                // 2) на следующий кадр — стартуем автоплей (часто решает “первый заход стоит”)
                requestAnimationFrame(() => {
                    swiper.update();
                    swiper.autoplay.start();
                });
            },
        },
    });

    const rootSelector = '.team__list';

    // вспомогательная функция: пометить 3 видимых
    function markVisible3(swiper) {
        // снимаем старые классы
        swiper.slides.forEach(slide => {
            slide.classList.remove('is-visible', 'is-visible-1', 'is-visible-2', 'is-visible-3');
        });

        // swiper.visibleSlides работает стабильно, когда watchSlidesProgress = true
        const visible = swiper.visibleSlides || [];

        // берём первые 3 видимых (слева-направо)
        visible.slice(0, 3).forEach((slide, idx) => {
            slide.classList.add('is-visible', `is-visible-${idx + 1}`);
        });
    }



});

document.addEventListener('DOMContentLoaded', () => {
    const rootSelector = '.team__list';
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) return;

    // ---- helpers: visible classes (1..N) ----
    function getVisibleCount(swiper) {
        // текущий slidesPerView с учётом брейкпоинтов
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

        // В loop-режиме надёжнее брать от activeIndex и далее count штук.
        // Так мы не упираемся в клон/visibleSlides нестабильности.
        const start = swiper.activeIndex;
        for (let i = 0; i < count; i++) {
            const slide = swiper.slides[start + i];
            if (!slide) continue;
            slide.classList.add('is-visible', `is-visible-${i + 1}`);
        }
    }

    // ---- popup system (single overlay for all slides) ----
    let overlayEl = null;

    function closePopup() {
        if (!overlayEl) return;

        overlayEl.classList.remove('is-open');
        document.documentElement.classList.remove('is-team-modal-open');
        document.removeEventListener('keydown', onEsc);

        const elToRemove = overlayEl;
        overlayEl = null;

        const onEnd = (e) => {
            // ждём завершения opacity у overlay
            if (e.target !== elToRemove) return;
            elToRemove.removeEventListener('transitionend', onEnd);
            elToRemove.remove();
        };

        elToRemove.addEventListener('transitionend', onEnd);

        // страховка, если transitionend не сработает (например, display:none где-то прилетит)
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
        // можно оставить, но он больше не нужен для opacity
        modal.classList.add('is-active');

        overlayEl.appendChild(modal);
        document.body.appendChild(overlayEl);

        document.documentElement.classList.add('is-team-modal-open');

        // 👇 ключ: включаем анимацию на следующий кадр
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


    // ---- init swiper ----
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
            0:    { slidesPerView: 1, spaceBetween: 16 },
            768:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
        },

        on: {
            init(swiper) {
                markVisible(swiper);
            },
            slideChange(swiper) {
                markVisible(swiper);
            },
            resize(swiper) {
                markVisible(swiper);
            },
            transitionEnd(swiper) {
                // чтобы классы точно совпали с итоговой позицией
                markVisible(swiper);
            },
        },

        observer: true,
        observeParents: true,
    });

    // ---- click handler with swipe/drag protection ----
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
        // если это был свайп — не открываем
        if (moved) return;

        const slideEl = e.target.closest('.team__list-item.swiper-slide');
        if (!slideEl) return;

        // если уже открыт — закрыть (опционально), или просто открывать новый
        if (overlayEl) closePopup();

        openPopupFromSlide(slideEl);
    });

    // опционально: закрывать попап при смене слайда
    teamSwiper.on('slideChange', () => {
        if (overlayEl) closePopup();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.digits__item');
    if (!items.length) return;

    function parseValue(raw) {
        const s = (raw || '').toString().trim();

        // "15к+" -> num=15, suffix="к+"
        // "10+"  -> num=10, suffix="+"
        // "100"  -> num=100, suffix=""
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
            else el.textContent = `${to}${suffix}`; // фиксация финала
        }

        requestAnimationFrame(tick);
    }

    // защита от повторного запуска
    const done = new WeakSet();

    // 1) сразу выставим корректный "нулевой" текст по суффиксу из data-digit,
    // чтобы не было "показал финал -> прыгнул на 0 -> поехал"
    items.forEach(item => {
        const title = item.querySelector('.digits__title');
        if (!title) return;

        const targetRaw = title.getAttribute('data-digit') || '';
        const parsed = parseValue(targetRaw);
        if (!parsed) return;

        // стартовое значение (0 + суффикс)
        title.textContent = `0${parsed.suffix}`;
    });

    // 2) стартуем анимацию только когда item виден
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
