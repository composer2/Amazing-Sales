import { homeController } from './js/controllers/home-controller.js';
import { usersController } from './js/controllers/users-controller.js';
import { blogController } from './js/controllers/blog-controller.js';
import { shopController } from './js/controllers/shop-controller.js';

let $page = $('#page');

(function() {
    let sammyApp = Sammy('#main-content', function() {

        this.get('#/', function() {
            this.redirect('#/home');
        });

        this.get('#/home', (context) => {
            $("#page-css").attr("href", "./css/home.css");
            homeController.home(context, '#main-content');
        });

        this.get('#/profile', (context) => {
            $("#page-css").attr("href", "./css/about-us.css");
            usersController.profile(context, '#main-content');
        });

        this.get('#/about-us', (context) => {
            $("#page-css").attr("href", "./css/about-us.css");
            homeController.aboutUs(context, '#main-content');
        });

        this.get('#/shop', (context) => {
            $("#page-css").attr("href", "./css/gadjets.css");
            shopController.shop(context, '#main-content');
        });

        this.get('#/blog', (context) => {
            $("#page-css").attr("href", "./css/blog.css");
            blogController.blog(context, '#main-content');
        });
        this.get('#/blog/:threads', (context) => {
            $("#page-css").attr("href", "./css/blog.css");
            blogController.threads(context, '#main-content');
        });
        this.get('#/blog/threads/:singlePost', (context) => {
            $("#page-css").attr("href", "./css/blog.css");
            blogController.singlePost(context, '#main-content');
        });
    });

    $(function() {
        sammyApp.run('#/');
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