<?php
$post_id = get_the_ID();
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/dist/custom-fav.png" type="image/png">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="preloader">
    <div class="preloader__row">
        <div class="preloader__item"></div>
        <div class="preloader__item"></div>
    </div>
</div>
<div class="header__popup" style="display: none;">
    <div class="header__popup-container">
        <p>SUCCESS</p>
        <div class="header__popup-close">
            <div class="button button-black">
                <span>Message has been sanded</span>
            </div>
        </div>
    </div>
</div>
<div class="contact-form popup-zapis" style="display: none">
    <div class="contact-form__form popup-zapis__container">
        <div class="popup-zapis__close">
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="44" height="44" fill="#FDFDFD" stroke="#EFEFEF"/>
                <path d="M13 32L22.5 22.5M32 13L22.5 22.5M22.5 22.5L32 32L13 13" stroke="#A6A6A6" stroke-linecap="round"/>
            </svg>
        </div>
        <?php echo do_shortcode( '[contact-form-7 id="e65f92f" title="Contact page form"]' );?>
    </div>
</div>
<header class="header">
    <div class="header__container main-container">
        <div class="header__logo">
            <?php
                the_custom_logo();
            ?>
        </div>
        <div class="header__wrapper">
            <nav class="header__nav">
                <div class="header__close">
                    <svg class="static" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9203 44.9203C44.5298 45.3109 43.8966 45.3109 43.5061 44.9203L1.07969 2.49392C0.689163 2.1034 0.689162 1.47024 1.07969 1.07971C1.47021 0.689187 2.10338 0.689187 2.4939 1.07971L44.9203 43.5061C45.3108 43.8966 45.3108 44.5298 44.9203 44.9203Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9203 44.9203C44.5298 45.3109 43.8966 45.3109 43.5061 44.9203L1.07969 2.49392C0.689163 2.1034 0.689162 1.47024 1.07969 1.07971C1.47021 0.689187 2.10338 0.689187 2.4939 1.07971L44.9203 43.5061C45.3108 43.8966 45.3108 44.5298 44.9203 44.9203Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.07967 44.92C0.689141 44.5295 0.689141 43.8963 1.07967 43.5058L43.5061 1.07937C43.8966 0.68885 44.5298 0.68885 44.9203 1.07937C45.3108 1.4699 45.3108 2.10306 44.9203 2.49359L2.49388 44.92C2.10335 45.3105 1.47019 45.3105 1.07967 44.92Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.07967 44.92C0.689141 44.5295 0.689141 43.8963 1.07967 43.5058L43.5061 1.07937C43.8966 0.68885 44.5298 0.68885 44.9203 1.07937C45.3108 1.4699 45.3108 2.10306 44.9203 2.49359L2.49388 44.92C2.10335 45.3105 1.47019 45.3105 1.07967 44.92Z" fill="white"/>
                    </svg>
                </div>
                <?php
                wp_nav_menu(
                        array(
                                'theme_location' => 'main-menu',
                                'menu_id'        => 'primary-menu',
                        )
                );
                ?>
            </nav>
            <div class="header__phone">
                <a href="tel:+380664777676">+380 66 477 76 76</a>
            </div>
        </div>
        <div class="header__burger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>
