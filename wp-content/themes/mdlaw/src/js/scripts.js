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

    function openPopup() {
        lockBody();
        $(".popup-zapis").fadeIn(300);
    }

    function closePopup() {
        $(".popup-zapis").fadeOut(300, function () {
            unlockBodyIfNothingOpen();
        });
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

    // ===== Popup controls =====
    $(".js-form").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPopup();
    });

    $(".popup-zapis__close").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closePopup();
    });

    // Чтобы клик внутри попапа не считался "клик вне"
    $(".popup-zapis").on("click", function (e) {
        e.stopPropagation();
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

});
