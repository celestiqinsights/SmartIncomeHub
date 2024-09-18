$(document).ready(function () {
    // FAQ Accordion
    function faqAccordion() {
        $('.accordion-item').each(function () {
            var $item = $(this);
            var $question = $item.find('.accordion-item-que');

            $question.on('click', function () {
                var isActive = $item.hasClass('accordion-item-active');

                // Close all items
                $('.accordion-item').removeClass('accordion-item-active').find('.accordion-item-ans').css('height', '0');

                // Open clicked item if it wasn't already active
                if (!isActive) {
                    $item.addClass('accordion-item-active');
                    var $answer = $item.find('.accordion-item-ans');
                    $answer.css('height', $answer[0].scrollHeight + 'px');
                }
            });
        });
    }

    // Initialize all functionalities
    faqAccordion();

    var currentYear = new Date().getFullYear();
    $('#copyright-year').text(currentYear);

    $('.hamburger').on('click', function () {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });
});

