﻿import { homeController } from './js/controllers/home-controller.js';
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

    usersController.isUserLoggedIn()
        .then((isLoggedIn) => {
            if (isLoggedIn) {
                $('#main-content').addClass('logged-in');
                $("#sign-in-out").html("SIGN OUT");
                $('#profile-show-hide').removeClass('hidden');
            } else {
                $('#main-content').removeClass('logged-in');
                $("#sign-in-out").html("SIGN IN");
                $('#profile-show-hide').addClass('hidden');
            }
        });
})();