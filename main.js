import { homeController } from './js/controllers/home-controller.js';
import { usersController } from './js/controllers/users-controller.js';
import { blogController } from './js/controllers/blog-controller.js';
import { shopController } from './js/controllers/shop-controller.js';

(function() {
    let sammyApp = Sammy('#main-content', function() {

        this.get('#/', function() {
            this.redirect('#/home');
        });

        this.get('#/home', (context) => {
            homeController.home(context, '#main-content');
        });

        this.get('#/profile', (context) => {
            usersController.profile(context, '#main-content');
        });

        this.get('#/about-us', (context) => {
            homeController.aboutUs(context, '#main-content');
        });

        this.get('#/shop', (context) => {
            shopController.shop(context, '#main-content');
        });

        this.get('#/blog', (context) => {
            blogController.blog(context, '#main-content');
        });
        this.get('#/blog/:threads', (context) => {
            blogController.threads(context, '#main-content');
        });
        this.get('#/blog/threads/:singlePost', (context) => {;
            blogController.singlePost(context, '#main-content');
        });
    });

    $(function() {
        sammyApp.run('#/');
    });

    const FACEBOOK_accessToken = 'FACEBOOK_accessToken';
    const FACEBOOK_expiresIn = 'FACEBOOK_expiresIn';
    const FACEBOOK_signedRequest = 'FACEBOOK_signedRequest';
    const FACEBOOK_userID = 'FACEBOOK_userID';

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        if (response.status === "connected") {
            // user is logged in with facebook and our app

            localStorage.setItem(FACEBOOK_accessToken, response.authResponse.accessToken);
            localStorage.setItem(FACEBOOK_expiresIn, response.authResponse.expiresIn);
            localStorage.setItem(FACEBOOK_signedRequest, response.authResponse.signedRequest);
            localStorage.setItem(FACEBOOK_userID, response.authResponse.userID);

            $('#main-content').addClass('logged-in');
            $("#sign-in-out").html("Sign out");
            $('#profile-show-hide').removeClass('hidden');
        } else if (response.status === "not_authorized" || response.status === "unknown ") {
            // promt the user to loggin
            $(".facebook-login").on('click', function() {
                FB.login(function(response) {
                    console.log("Log in");
                    console.log(response)
                })
            })
        } else {
            $('#main-content').removeClass('logged-in');
            $("#sign-in-out").html("Sign in");
            $('#profile-show-hide').addClass('hidden');
        }
        console.log("Initial state");
        console.log(response);
    });
    usersController.isUserLoggedIn()
        .then((isLoggedIn) => {
            if (isLoggedIn) {
                $('#main-content').addClass('logged-in');
                $("#sign-in-out").html("Sign out");
                $('#profile-show-hide').removeClass('hidden');
            } else {
                $('#main-content').removeClass('logged-in');
                $("#sign-in-out").html("Sign in");
                $('#profile-show-hide').addClass('hidden');
            }
        });
})();