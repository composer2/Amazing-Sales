import { usersController } from '../controllers/users-controller.js'
import { notificator } from '../helpers/notificator.js'

const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
const FACEBOOK_accessToken = 'FACEBOOK_accessToken';

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
            if (text === "Sign in") {
                text = "Sign out";
                $('#nav-collapse2').addClass('in')
            } else if (text === "Sign out") {
                text = "Sign in";
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

    function facebookLogin() {
        $("#main-content").on("click", ".facebook-login", function() {
            console.log("API Call");
            FB.api("/me?fields=id,first_name,last_name,gender,picture", function(response) {
                if (localStorage.getItem(FACEBOOK_accessToken)) {
                    notificator.success('Registered Successfully');
                    localStorage.setItem("first_name", response.first_name)
                    localStorage.setItem("last_name", response.last_name)
                    localStorage.setItem("gender", response.gender)
                    localStorage.setItem("image", response.picture.data.url)
                    localStorage.setItem(STORAGE_AUTH_KEY, "FACEBOOK_USER_LOGGED_IN");
                }
            });
        })
    }

    return {
        startCarousel,
        singInOutShowHide,
        facebookLogin
    }

})();

export { homeEvents }