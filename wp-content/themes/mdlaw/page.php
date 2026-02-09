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
                <div class="banner__untitle section-subtitle">
                    <?= $data['tekst_nad_zagolovokom']; ?>
                </div>
                <h1 class="banner__title">
                    <?= $data['zagolovok_bloku']; ?>
                </h1>
                <a href="<?= $data['posilannya_na_knopku_zvyazku']; ?>" class="banner__button button button-white"
                   target="_blank">
                    <span><?= $data['napys_na_knopczi']; ?></span>
                </a>
            </div>
        </div>
    </section>
    <section class="digits">
        <div class="digits__container main-container">
            <?php
            if ($digits = $data['perelijk_czyfr']) {
                foreach ($digits as $item) { ?>
                    <div class="digits__item">
                        <h3 class="digits__title"><?= $item['tekst_czyfry']; ?></h3>
                        <div class="digits__desc"><?= $item['opys']; ?></div>
                    </div>
                    <?php
                }
            }
            ?>
        </div>
    </section>
    <section class="about" id="about">
        <div class="about__container main-container">
            <div class="about__text">
                <h2 class="about__title section-title">
                    <?= $data['zagolovok_pro_nas']; ?>
                </h2>
                <div class="about__subtitle section-subtitle">
                    <?= $data['opys_pro_nas']; ?>
                </div>
                <a href="<?= $data['posilannya_na_knopku_zvyazku']; ?>" class="about__button button button-white"
                   target="_blank">
                    <span><?= $data['knopka_pro_nas']; ?></span>
                </a>
            </div>
            <div class="about__img">
                <img src="<?= $data['zobrazhennya_pro_nas']; ?>">
            </div>
        </div>
    </section>
    <section class="services" id="services">
        <div class="services__container main-container">
            <h2 class="services__title section-title">
                <?= $data['zagolovok_nashi_poslugy']; ?>
            </h2>
            <div class="services__subtitle section-subtitle">
                <?= $data['pidzagolovok_nashi_poslugy']; ?>
            </div>
            <div class="services__list">
                <?php
                if ($services = $data['perelik_poslug']) {
                    foreach ($services as $item) { ?>
                        <div class="services__item">
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
                    }
                }
                ?>
            </div>
            <div class="services__buttons">
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

    </section>
    <section class="clients" id="clients">

    </section>
    <section class="contacts" id="contacts">

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
                        <a href="<?= $item['posylannya_dlya_merezhi']; ?>" class="footer__soc-item">
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
            <div class="footer__bottom-nav">
                <a href="#">Privacy Policy</a>
                <span>|</span>
                <a href="#">Terms</a>
                <span>|</span>
                <a href="#">Правила сертифікатів</a>
            </div>
        </div>
    </div>
</footer>
<div id="success-send" class="success-send" style="display: none">
    <div class="success-send__container">
        <?php the_field('tekst_soobshhenye_otpravleno', 2) ?>
    </div>
</div>
<?php wp_footer(); ?>

</body>
</html>
