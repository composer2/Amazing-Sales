import { usersController } from '../controllers/users-controller.js'
import { notificator } from '../helpers/notificator.js'

let homeEvents = (function() {
    function startCarousel() {
        // Activate Carousel
        $("#carousel-example-generic").carousel();
        // media bar options
        $('#media').carousel({
            pause: true,
            interval: 10000,
        });
        $('#media').hover(function() {
            $(this).carousel('pause')
        }, function() {
            $(this).carousel('cycle')
        })
    }

    function singInOutShowHide() {
        $("#sign-in-out").click(function() {
            var text = $(this).html();
            if (text === "SIGN IN") {
                text = "SIGN OUT";
                $('#nav-collapse2').addClass('in')
            } else if (text === "SIGN OUT") {
                text = "SIGN IN";
                $('#nav-collapse2').removeClass('in')
                if ($('#main-content').hasClass('logged-in')) {
                    usersController.logout();
                }
            }
            $(this).html(text);
        });

        $('#sign-in-btn').click(function() {
            usersController.signInUp();
        });
        $('#register-btn').click(function() {
            usersController.register();
        });
    }

    function facebookShare() {
        $("#facebook-login").click(function() {
            FB.ui({
                method: 'share',
                display: 'popup',
                href: 'https://rawgit.com/composer2/Amazing-Sales/master/index.html',
            }, function(response) {});
        })
    }

    return {
        startCarousel,
        singInOutShowHide,
        facebookShare
    }

})();

export { homeEvents }