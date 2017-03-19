import { usersController } from '../controllers/users-controller.js'

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
        $(".facebook-login").click(function() {
            console.log("Cliked Facebok");
            FB.api("/{user-id}", function(response) {
                console.log(response);
            });
            console.log("ME");
            FB.api("/me", function(response) {
                console.log(response);
            });
            console.log("first");
            FB.api("/{user-id}/first_name", function(response) {
                console.log(response);
            });
            console.log("last");
            FB.api("/{user-id}last_name", function(response) {
                console.log(response);
            });
            console.log("pic");
            FB.api("/{user-id}/picture ", function(response) {
                console.log(response);
            });

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

    return {
        startCarousel,
        singInOutShowHide
    }

})();

export { homeEvents }