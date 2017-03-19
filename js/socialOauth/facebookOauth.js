 import { notificator } from '../helpers/notificator.js'

 const FACEBOOK_accessToken = 'FACEBOOK_accessToken';
 const FACEBOOK_expiresIn = 'FACEBOOK_expiresIn';
 const FACEBOOK_signedRequest = 'FACEBOOK_signedRequest';
 const FACEBOOK_userID = 'FACEBOOK_userID';
 const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
 const FACEBOOK_USER = 'FACEBOOK_USER';

 window.fbAsyncInit = function() {
     FB.init({
         appId: '275315012923774',
         cookie: true, // enable cookies to allow the server to access 
         // the session
         xfbml: true, // parse social plugins on this page
         version: 'v2.8' // use graph api version 2.8
     });

     FB.getLoginStatus(function(response) {
         if (response.status === "connected") {
             // user is logged in with facebook
             localStorage.setItem(FACEBOOK_accessToken, response.authResponse.accessToken);
             localStorage.setItem(FACEBOOK_expiresIn, response.authResponse.expiresIn);
             localStorage.setItem(FACEBOOK_signedRequest, response.authResponse.signedRequest);
             localStorage.setItem(FACEBOOK_userID, response.authResponse.userID);
         } else if (response.status === "not_authorized" || response.status === "unknown ") {
             // promt the user to loggin
             $(".facebook-login").on('click', function() {
                 FB.login(function(response) {
                     console.log("Log in");
                     console.log(response);
                     notificator.success('Registered Successfully');
                     FB.api("/me?fields=id,first_name,last_name,gender,picture", function(response) {
                         if (localStorage.getItem(FACEBOOK_accessToken)) {
                             localStorage.setItem("first_name", response.first_name)
                             localStorage.setItem("last_name", response.last_name)
                             localStorage.setItem("gender", response.gender)
                             localStorage.setItem("image", response.picture.data.url)
                             localStorage.setItem(STORAGE_AUTH_KEY, "FACEBOOK_USER_LOGGED_IN");
                         }
                     });
                 })
             })
         }
         console.log("Initial state");
         console.log(response);
     });

 };
 (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s);
     js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=275315012923774";
     fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));