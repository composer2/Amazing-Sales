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
                $("#sign-in-out").addClass("selectedMenu")
            } else if (text === "SIGN OUT") {
                text = "SIGN IN";
                $("#sign-in-out").addClass("selectedMenu")
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

    function changeTheSelectedMainMenuColor() {
        $("#nav-menu").on('click', 'li', function() {
            let currentLi = $(this);
            $("#nav-menu li").children().removeClass("selectedMenu");
            currentLi.children(":first").addClass("selectedMenu")
        })
    }
    return {
        startCarousel,
        singInOutShowHide,
        facebookShare,
        changeTheSelectedMainMenuColor
    }

})();

export { homeEvents }