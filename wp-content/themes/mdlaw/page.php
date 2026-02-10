<?php
/**
 * Template Name: Головна сторінка
 */

get_header();
$data = get_fields();
?>

<main class="main">
    <section class="banner" id="banner">
        <div class="banner__img">
            <img src="<?= $data['zobrazhennya_banera']; ?>">
        </div>
        <div class="banner__container main-container">
            <div class="banner__content">
                <div class="banner__untitle section-subtitle" data-aos="fade-right" data-aos-delay="300">
                    <?= $data['tekst_nad_zagolovokom']; ?>
                </div>
                <h1 class="banner__title" data-aos="fade-up" data-aos-delay="500">
                    <?= $data['zagolovok_bloku']; ?>
                </h1>
                <a href="<?= $data['posilannya_na_knopku_zvyazku']; ?>" class="banner__button button button-white"
                   target="_blank" data-aos="fade-up" data-aos-delay="700">
                    <span><?= $data['napys_na_knopczi']; ?></span>
                </a>
            </div>
        </div>
    </section>
    <section class="digits">
        <div class="digits__container main-container">
            <?php
            if ($digits = $data['perelijk_czyfr']) {
                $couter = 100;
                foreach ($digits as $item) { ?>
                    <div class="digits__item" data-aos="fade-up" data-aos-delay="<?php echo$couter ?>">
                        <h3 class="digits__title" data-digit="<?= $item['tekst_czyfry']; ?>">0+</h3>
                        <div class="digits__desc"><?= $item['opys']; ?></div>
                    </div>
                    <?php
                    $couter = $couter + 300;
                }
            }
            ?>
        </div>
    </section>
    <section class="about" id="about">
        <div class="about__container main-container">
            <div class="about__text">
                <h2 class="about__title section-title" data-aos="fade-right" data-aos-delay="200">
                    <?= $data['zagolovok_pro_nas']; ?>
                </h2>
                <div class="about__subtitle section-subtitle" data-aos="fade-right" data-aos-delay="500">
                    <?= $data['opys_pro_nas']; ?>
                </div>
                <a href="<?= $data['posilannya_na_knopku_zvyazku']; ?>" class="about__button button button-white"
                   target="_blank" data-aos="fade-right" data-aos-delay="800">
                    <span><?= $data['knopka_pro_nas']; ?></span>
                </a>
            </div>
            <div class="about__img" data-aos="fade-left" data-aos-delay="200">
                <img src="<?= $data['zobrazhennya_pro_nas']; ?>">
            </div>
        </div>
    </section>
    <section class="services" id="services">
        <div class="services__container main-container">
            <h2 class="services__title section-title" data-aos="fade-up" data-aos-delay="300">
                <?= $data['zagolovok_nashi_poslugy']; ?>
            </h2>
            <div class="services__subtitle section-subtitle" data-aos="fade-up" data-aos-delay="600">
                <?= $data['pidzagolovok_nashi_poslugy']; ?>
            </div>
            <div class="services__list">
                <?php
                if ($services = $data['perelik_poslug']) {
                    $couter = 100;
                    foreach ($services as $item) { ?>
                        <div class="services__item" data-aos="fade-right" data-aos-delay="<?php echo$couter ?>">
                            <div class="services__item-header">
                                <img src="<?= $item['ikonka_polsugy']; ?>" class="services__item-icon">
                                <h3 class="services__title"><?= $item['nazva_poslugy']; ?></h3>
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.1362 0L11.1362 2.136L5.56823 8.16L0.000228784 2.136L0.000228882 -4.62355e-07L5.56823 6.048L11.1362 0Z"
                                          fill="black"/>
                                </svg>
                            </div>
                            <div class="services__item-content">
                                <div class="services__item-desc"><?= $item['opys_poslugy']; ?></div>
                            </div>
                        </div>
                        <?php
                        $couter = $couter + 300;
                    }
                }
                ?>
            </div>
            <div class="services__buttons" data-aos="fade-up" data-aos-delay="1300">
                <a href="<?= $data['posilannya_na_knopku_zvyazku']; ?>" class="services__button button button-black"
                   target="_blank">
                    <span><?= $data['napys_na_knopczi_nashi_poslugy']; ?></span>
                </a>
            </div>
        </div>
    </section>
    <div class="image">
        <img src="<?= $data['zobrazhennya_bloku_kartynka']; ?>">
    </div>
    <section class="team" id="team">
        <div class="main-container">
            <div class="team__container">
                <div class="team__top">
                    <h2 class="team__title section-title" data-aos="fade-right" data-aos-delay="100">
                        <?= $data['zagolovok_bloku_komanda']; ?>
                    </h2>
                    <div class="team__subtitle section-subtitle"  data-aos="fade-right" data-aos-delay="300">
                        <?= $data['pidzagolovok_bloku_komanda']; ?>
                    </div>
                </div>
                <div class="team__list swiper-container"  data-aos="fade-up" data-aos-delay="500">
                    <div class="team__wrapper swiper-wrapper">
                        <?php
                        if ($clients = $data['perelik_lyudej']) {
                            foreach ($clients as $item) { ?>
                                <div class="team__list-item swiper-slide">
                                    <div class="clients__list-image">
                                        <img src="<?= $item['fotografiya_lyudyny']; ?>">
                                    </div>
                                    <h3 class="team__list-title"><?= $item['pib']; ?></h3>
                                    <p class="team__list-posada"><?= $item['posada']; ?></p>
                                    <div class="team__list-modal" style="display: none">
                                        <div class="team__list-modal-close">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.353516 17.3535L8.85352 8.85352M17.3535 0.353516L8.85352 8.85352M8.85352 8.85352L17.3535 17.3535L0.353516 0.353516" stroke="#E0E0E0"/>
                                            </svg>
                                        </div>
                                        <div class="team__list-modal-left">
                                            <img src="<?= $item['fotografiya_lyudyny']; ?>" class="team__list-image">
                                        </div>
                                        <div class="team__list-modal-right">
                                            <h3 class="team__list-title"><?= $item['pib']; ?></h3>
                                            <p class="team__list-posada"><?= $item['posada']; ?></p>
                                            <div class="team__list-desc">
                                                <?= $item['opys']; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                        ?>
                        <?php
                        if ($clients = $data['perelik_lyudej']) {
                            foreach ($clients as $item) { ?>
                                <div class="team__list-item swiper-slide">
                                    <div class="clients__list-image">
                                        <img src="<?= $item['fotografiya_lyudyny']; ?>">
                                    </div>
                                    <h3 class="team__list-title"><?= $item['pib']; ?></h3>
                                    <p class="team__list-posada"><?= $item['posada']; ?></p>
                                    <div class="team__list-modal" style="display: none">
                                        <div class="team__list-modal-close">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.353516 17.3535L8.85352 8.85352M17.3535 0.353516L8.85352 8.85352M8.85352 8.85352L17.3535 17.3535L0.353516 0.353516" stroke="#E0E0E0"/>
                                            </svg>
                                        </div>
                                        <div class="team__list-modal-left">
                                            <img src="<?= $item['fotografiya_lyudyny']; ?>" class="team__list-image">
                                        </div>
                                        <div class="team__list-modal-right">
                                            <h3 class="team__list-title"><?= $item['pib']; ?></h3>
                                            <p class="team__list-posada"><?= $item['posada']; ?></p>
                                            <div class="team__list-desc">
                                                <?= $item['opys']; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                        ?>
                    </div>
                    <div class="team__list-bottom">
                        <div class="team__list-pag swiper-pagination">

                        </div>
                        <div class="team__list-nav swiper-navigation">
                            <div class="prev">
                                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.15991 0H6.02391L-8.87168e-05 5.568L6.02391 11.136H8.15991L2.11191 5.568L8.15991 0Z" fill="#8F8F8F"/>
                                </svg>
                            </div>
                            <div class="next">
                                <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H2.848L10.88 7.424L2.848 14.848H6.68251e-08L8.064 7.424L0 0Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="clients" id="clients">
        <div class="clients__container main-container">
            <h2 class="clients__title section-title" data-aos="fade-right" data-aos-delay="100">
                <?= $data['zagolovok_nashi_kliyenty']; ?>
            </h2>
            <div class="clients__subtitle section-subtitle" data-aos="fade-right" data-aos-delay="300">
                <?= $data['opys_nashi_kliyenty']; ?>
            </div>
            <div class="clients__list swiper-container" data-aos="fade-up" data-aos-delay="500">
                <div class="clients__list-nav swiper-navigation">
                    <div class="prev">
                        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.15991 0H6.02391L-8.87168e-05 5.568L6.02391 11.136H8.15991L2.11191 5.568L8.15991 0Z" fill="#8F8F8F"/>
                        </svg>
                    </div>
                    <div class="next">
                        <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H2.848L10.88 7.424L2.848 14.848H6.68251e-08L8.064 7.424L0 0Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div class="clients__wrapper swiper-wrapper">
                    <?php
                    if ($clients = $data['perelik_kliyentiv']) {
                        foreach ($clients as $item) { ?>
                            <div class="clients__list-item swiper-slide">
                                <img src="<?= $item['logo_kliyenta']; ?>" class="clients__list-image">
                                <h3 class="clients__list-title"><?= $item['nazva_kliyenta']; ?></h3>
                            </div>
                            <?php
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </section>
    <section class="contacts" id="contacts">
        <div class="contacts__container main-container">
            <div class="contacts__text">
                <h2 class="contacts__title section-title" data-aos="fade-right" data-aos-delay="100">
                    <?= $data['zagolovok_bloku_forma']; ?>
                </h2>
                <div class="contacts__subtitle section-subtitle" data-aos="fade-right" data-aos-delay="300">
                    <?= $data['pidzagolovok_bloku_forma']; ?>
                </div>
            </div>
            <div class="contacts__form" data-aos="fade-left" data-aos-delay="500">
                <?php echo do_shortcode('[contact-form-7 id="bb891f9"]')?>
            </div>
        </div>
    </section>
</main>
<footer class="footer">
    <div class="footer__container main-container">
        <div class="footer__title">
            <?= $data['zagolovok_v_futer']; ?>
        </div>
        <div class="footer__top">
            <div class="footer__soc">
                <?php
                if ($soc = $data['soczialni_merezhi']) {
                    foreach ($soc as $item) { ?>
                        <a href="<?= $item['posylannya_dlya_merezhi']; ?>" class="footer__soc-item" target="_blank">
                            <img src="<?= $item['ikonka_dlya_socz_merezhi']; ?>" class="footer__soc-icon">
                        </a>
                        <?php
                    }
                }
                ?>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="footer__bottom-copy">
                © 2026
            </div>
<!--            <div class="footer__bottom-nav">-->
<!--                <a href="#">Privacy Policy</a>-->
<!--                <span>|</span>-->
<!--                <a href="#">Terms</a>-->
<!--                <span>|</span>-->
<!--                <a href="#">Правила сертифікатів</a>-->
<!--            </div>-->
        </div>
    </div>
</footer>
<div id="success-send" class="success-send" style="display: none">
    <div class="success-send__container">
        Запит відправлено
    </div>
</div>
<?php wp_footer(); ?>

</body>
</html>
