
$(document).ready(function() {
    authListener();
});

function authListener() {

    // Process sign in via the nav.
    $('form.auth button[type="submit"]').click(function(clickEvent) {

        // Avoid auto-submission of the form element.
        clickEvent.preventDefault();

        // If modal is in use and there was a previous alert, clear.
        $('.authmodal .alert').slideUp();

        // Find the parent form that was triggered to submit.
        var $parent = $(this).closest('form.auth');

        // Get the user-entered information.
        var email = $parent.find('input[type="text"]').val().trim();
        var password = $parent.find('input[type="password"]').val().trim();
        var registerChecked = $parent.find('input[type="checkbox"]').prop('checked');
        console.log('Login triggered: ' + email + ' ' + password);

        // Keep the auth modal up to date if not using modal form.
        $('.authmodal input[type="text"]').val(email);
        $('.authmodal input[type="password"]').val(password);
                
        // Input validation.
        if (email == '' || password == '') {
            return authError('make sure to enter an email and a password');
        }

        $.ajax({
            'url': '/user/auth',
            'type': 'POST',
            'contentType': 'application/json',
            'dataType': 'json',
            'data': JSON.stringify({
                'email': email,
                'password': password,
                'register': registerChecked
            }),
            'success': function(response) {
                if (!response.success) {
                    authError(response.message);
                }
            },
            'failure': function(error) {
                authError(error);
            }
        });

    });

}

function authError(errorMessage) {

    $('.authmodal .alert').text('please fix: ' + errorMessage.toLowerCase());
    $('.authmodal .alert').slideDown();

    if ($('.authmodal').css('display') == 'none') {
        $('.authmodal').modal();
    }

}

