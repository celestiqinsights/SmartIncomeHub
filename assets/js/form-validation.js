$(document).ready(function () {
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
            name: {
                required: "Please enter your name.",
                regex: "Name can only contain letters and spaces."
            },
            phone: {
                required: "Please enter your phone number.",
                digits: "Phone number must be digits only.",
                maxlength: "Phone number cannot be more than 10 digits."
            },
            email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
            },
            message: {
                required: "Please enter your message.",
                regex: "Message cannot contain < or > characters."
            }
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
                success: function (response) {
                    var responseText = "We have received your message successfully.";
                    updateModal(responseText);
                    showModal('#thankYouModal');
                    $(form)[0].reset();
                },
                error: function (xhr, status, error) {
                    console.log("AJAX request failed.");
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