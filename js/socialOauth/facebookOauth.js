  const FACEBOOK_accessToken = 'FACEBOOK_accessToken';
  const FACEBOOK_expiresIn = 'FACEBOOK_expiresIn';
  const FACEBOOK_signedRequest = 'FACEBOOK_signedRequest';
  const FACEBOOK_userID = 'FACEBOOK_userID';

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

  };

  (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=275315012923774";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));