$(document).ready(function () {
    // FAQ Accordion
    function faqAccordion() {
        $('.faq-item').each(function () {
            var $item = $(this);
            var $question = $item.find('.faq-item-que');

            $question.on('click', function () {
                var isActive = $item.hasClass('faq-item-active');

                // Close all items
                $('.faq-item').removeClass('faq-item-active').find('.faq-item-ans').css('height', '0');

                // Open clicked item if it wasn't already active
                if (!isActive) {
                    $item.addClass('faq-item-active');
                    var $answer = $item.find('.faq-item-ans');
                    $answer.css('height', $answer[0].scrollHeight + 'px');
                }
            });
        });
    }

    // Initialize all functionalities
    faqAccordion();
});

