jQuery(document).ready(function($) {
    var currentPage = 1;
    loadMoreBooks(currentPage);

    // Load more books when the button is clicked
    $('.load-more-button').click(function() {
        currentPage++;
        loadMoreBooks(currentPage);
    });



    // Close popup when clicking on the close button
    $(document).on('click', '.close-popup', function() {
        closePopup();
    });

    function loadMoreBooks(page) {
        $.ajax({
            url: custom_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'custom_load_more_books',
                page: page
            },
            beforeSend: function() {
                $('#loader').fadeIn(200);
            },
            success: function(response) {
                $('#loader').fadeOut(200);
                $('.book-grid').append(response);
                if ($(".book-item").attr('page-id') == currentPage) {
                    $(".load-more-button").remove();
                } else {
                    $(".load-more-button").show();
                }

                // Open popup when clicking on a book
                $(".book-item img, .book-item h3").on('click', function() {
                    console.log($(this).parents(".book-item").find("#book_second_cover_image_preview").attr("src"));
                    var main = $(this).parents(".book-item");
                    $('.popup-content .popup-cover-image').attr('src', main.find("#book_second_cover_image_preview").attr("src"));
                    $('.popup-title').text(main.find("h3").text());
                    $('.popup-sub-title').text(main.find(".book_subtitle").val());
                    $('.popup-rating').text('Rating: ' + main.find(".book_rating").val());
                    $('.popup-book-content').html(main.find(".book_content").val());
                    $('.popup-custom-field-image').html('<img src="' + main.find(".thumbnail_url").val() + '">');
                    $('.popup').show();
                });

            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function openPopup(bookId) {
        $.ajax({
            url: custom_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'custom_get_book_data',
                book_id: bookId
            },
            success: function(response) {
                var bookData = JSON.parse(response);
                $('.popup-cover-image').attr('src', bookData.coverImage);
                $('.popup-title').text(bookData.title);
                $('.popup-sub-title').text(bookData.subTitle);
                $('.popup-rating').text('Rating: ' + bookData.rating);
                $('.popup-book-content').html(bookData.content);
                $('.popup-custom-field-image').html('<img src="' + bookData.customFieldImage + '">');
                $('.popup-custom-field-text').text(bookData.customFieldText);
                $('.popup').show();
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    function closePopup() {
        $('.popup').hide();
    }
});