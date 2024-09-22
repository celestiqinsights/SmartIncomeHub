$(document).ready(function () {
    // Language messages object
    const messages = {
        english: {
            name: {
                required: "Please enter your name.",
                regex: "Name can only contain letters and spaces."
            },
            phone: {
                required: "Please enter your phone number.",
                digits: "Please enter a valid phone number.",
                maxlength: "Phone number cannot be more than 10 digits."
            },
            email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
            },
            message: {
                required: "Please enter your message.",
                regex: "Message cannot contain < or > characters."
            },
            response: "Thank you for your message! We have received it and will get back to you as soon as possible."
        },
        hindi: {
            name: {
                required: "कृपया अपना नाम दर्ज करें।",
                regex: "नाम में केवल अक्षर और स्पेस हो सकते हैं।"
            },
            phone: {
                required: "कृपया अपना फोन नंबर दर्ज करें।",
                digits: "कृपया एक वैध फोन नंबर दर्ज करें।",
                maxlength: "फोन नंबर 10 अंकों से अधिक नहीं हो सकता।"
            },
            email: {
                required: "कृपया अपना ईमेल दर्ज करें।",
                email: "कृपया एक वैध ईमेल पता दर्ज करें।"
            },
            message: {
                required: "कृपया अपना संदेश दर्ज करें।",
                regex: "संदेश में < या > वर्ण नहीं हो सकते।"
            },
            response: "आपका संदेश प्राप्त हुआ है! हम जल्दी से जल्दी आपसे संपर्क करेंगे।"
        },
        hinglish: {
            name: {
                required: "Apna naam daalna mat bhoolo.",
                regex: "Naam sirf letters aur spaces hone chahiye."
            },
            phone: {
                required: "Apna phone number daalna mat bhoolo.",
                digits: "Ek valid phone number daalo.",
                maxlength: "Phone number 10 digits se zyada nahi ho sakta."
            },
            email: {
                required: "Apna email daalna mat bhoolo.",
                email: "Ek valid email address daalo."
            },
            message: {
                required: "Apna message daalna mat bhoolo.",
                regex: "Message mein < ya > characters nahi hone chahiye."
            },
            response: "Aapka message mil gaya hai! Hum jaldi aapse sampark karenge."
        }
    };

    // Determine the current language from the body's class
    let currentLanguage = 'english'; // default language
    if ($('body').is('.hindi')) {
        currentLanguage = 'hindi';
    } else if ($('body').is('.hinglish')) {
        currentLanguage = 'hinglish';
    }

    // Add a custom method for regex validation
    $.validator.addMethod("regex", function (value, element, regexp) {
        const re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "Invalid format.");

    // Initialize form validation
    $('#contactForm').validate({
        rules: {
            name: {
                required: true,
                regex: "^[a-zA-Z\\s]+$"
            },
            phone: {
                required: true,
                digits: true,
                maxlength: 10
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                regex: "^[^<>]*$",
                maxlength: 1500
            }
        },
        messages: {
            name: messages[currentLanguage].name,
            phone: messages[currentLanguage].phone,
            email: messages[currentLanguage].email,
            message: messages[currentLanguage].message
        },
        submitHandler: function (form) {
            // Secure AJAX form submission
            $('.loading-backdrop').css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: 'https://formsubmit.co/ajax/0c66ecd095b69f2219e6fdc4d1f2aa68',
                dataType: 'json',
                accepts: 'application/json',
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    message: $('#message').val()
                },
                success: function () {
                    var responseText = messages[currentLanguage].response;
                    updateModal(responseText);
                    showModal('#thankYouModal');
                    $(form)[0].reset();
                },
                error: function () {
                    alert('There was an error sending your message. Please try again later.');
                },
                complete: function () {
                    // Hide loading backdrop after request is complete
                    setTimeout(function () {
                        $('.loading-backdrop').fadeOut();
                    }, 2000);
                }
            });

            // Prevent default form submission
            return false;
        },
        errorClass: "error",

        highlight: function (element) {
            $(element).addClass("error");
        },

        unhighlight: function (element) {
            $(element).removeClass("error");
        }
    });

    // Limit the phone input to 10 digits
    $('#phone').on('input', function () {
        var value = $(this).val();
        if (value.length > 10) {
            $(this).val(value.slice(0, 10)); // Trim to 10 characters
        }
    });

    // Function to update the modal with a message
    function updateModal(responseText) {
        var modalMessageElement = $('#thankYouModalMessage');
        if (modalMessageElement.length) {
            modalMessageElement.html(responseText);
        } else {
            console.error('Element with ID thankYouModalMessage not found.');
        }
    }

    // Centralized modal show/hide function
    function showModal(modalSelector) {
        $('body').addClass('modal-open');
        $('.backdrop').fadeIn();
        $(modalSelector).fadeIn();
    }

    function closeModal(modalSelector) {
        $('.backdrop').fadeOut();
        $(modalSelector).fadeOut();
        $('body').removeClass('modal-open');
    }

    // Close the modal when the user clicks on the close button or the backdrop
    $('.close, .backdrop').click(function () {
        closeModal('#thankYouModal');
    });
});