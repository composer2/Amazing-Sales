﻿import { homeController } from './js/controllers/home-controller.js';
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
            //page-css
            $("#page-css").attr("href", "./css/home.css");
            homeController.home(context, '#main-content');
        });

        // this.get('#/profile', (context) => {
        //     usersController.profile(context, '#main-content');
        // });

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
        this.get('#/blog/threads', (context) => {
            $("#page-css").attr("href", "./css/blog.css");

            // show-hide comments
            $('#main-content').on('click', '#read-more-comments', function() {
                $("#article-comments").toggleClass('hidden show');
            });
            $('#main-content').on('click', '#read-less', function() {
                $("#article-comments").toggleClass('show hidden');
            });

            blogController.threads(context, '#main-content');
        });
        this.get('#/blog/threads/:id', (context) => {
            $("#page-css").attr("href", "./css/blog.css");

            blogController.threadsById(context, '#main-content');
        });
        //sign in/out
        $("#sign-in-out").click(function() {
            var text = $(this).html();
            if (text === "Sign in") {
                text = "Sign out";
                $('#nav-collapse2').addClass('in')
            } else if (text === "Sign out") {
                text = "Sign in";
                $('#nav-collapse2').removeClass('in')
                usersController.logout();
            }
            $(this).html(text);
        });

        $('#sign-in-btn').click(function() {
            usersController.signInUp();
            $('#nav-collapse2').removeClass('in')
        });
        $('#register-btn').click(function() {
            usersController.register();
        });

    });

    $(function() {
        sammyApp.run('#/');
    });

    // usersController.isUserLoggedIn()
    //     .then((isLoggedIn) => {
    //         if (isLoggedIn) {
    //             $('#main-content').addClass('logged-in');
    //         } else {
    //             $('#main-content').removeClass('logged-in');
    //         }
    //     })
    //     .then(() => {
    //         return usersController.storeAllUsers();
    //     })
    //     .then();
})();