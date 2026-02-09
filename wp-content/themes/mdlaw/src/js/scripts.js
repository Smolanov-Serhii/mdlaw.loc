jQuery(function ($) {

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

});

