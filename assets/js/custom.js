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

    // Update copyright year
    var currentYear = new Date().getFullYear();
    $('#copyright-year').text(currentYear);

    // Hamburger menu toggle
    $('.hamburger').on('click', function () {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data; // Adjusted ID to match your footer container
            // Ensure copyright year is set
            $('#copyright-year').text(currentYear);
        })
        .catch(error => console.error('Error loading footer:', error));
});
