  const FACEBOOK_accessToken = 'FACEBOOK_accessToken';
  const FACEBOOK_expiresIn = 'FACEBOOK_expiresIn';
  const FACEBOOK_signedRequest = 'FACEBOOK_signedRequest';
  const FACEBOOK_userID = 'FACEBOOK_userID';

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
          // Logged into your app and Facebook.
          testAPI();
      }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
      FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
      });
  }

  window.fbAsyncInit = function() {
      FB.init({
          appId: '275315012923774',
          cookie: true, // enable cookies to allow the server to access 
          // the session
          xfbml: true, // parse social plugins on this page
          version: 'v2.8' // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call 
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

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

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=275315012923774";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
      });
  }