<?php get_header(); ?>

<div class="book-grid">
    <div id="loader"></div>
</div>
<button class="load-more-button">Load More</button>

<!-- Popup container -->
<div class="popup">
    <div class="popup-content">
        <span class="close-popup">&times;</span>
        <img class="popup-cover-image" src="" alt="Book Cover">
        <h3 class="popup-title"></h3>
        <p class="popup-sub-title"></p>
        <p class="popup-rating"></p>
        <div class="popup-book-content"></div>
        <div class="popup-custom-field-image"></div>
    </div>
</div>

<?php get_footer(); ?>