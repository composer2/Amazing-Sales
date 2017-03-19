import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';
import { userEvents } from '../helpers/user-events.js';

const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
const FACEBOOK_USER_LOGGED_IN = 'FACEBOOK_USER_LOGGED_IN';

class UserController {
    signInUp() {
        let user = {
            username: $('#Email').val(),
            password: $('#Password').val()
        };

        userModel.login(user)
            .then((res) => {
                    userEvents.showProfile()
                    notificator.success(`${res.username} signed in!`);
                },
                function(err) {
                    notificator.error('Invalid username or password');
                });
    };

    register() {
        let user = {
            username: $('#Email').val(),
            password: $('#Password').val()
        };
        userModel.register(user)
            .then((res) => {
                userEvents.showProfile()
                notificator.success('Registered Successfully');
            }, (err) => {
                notificator.error("Register Unsuccessful");
            });
    }

    logout() {
        this.redirectToHomeAndClearStorage();
        userEvents.hideProfile()
        userModel.logout()
            .then((res) => {
                notificator.success('Successfully logout')
            }, (err) => {
                notificator.success('Successfully logout')
            });
    }

    profile(context, selector) {
        if (localStorage.getItem(STORAGE_AUTH_KEY === FACEBOOK_USER_LOGGED_IN)) {
            let data = userEvents.facebookProfile()
            pageView.profilePage(selector, data);
            userEvents.editProfile();
            // userEvents.updateProfile();
            userEvents.cancelEditProfile();
        } else {
            userModel.getCurrentUserInfo()
                .then((res) => {
                    let data = userEvents.updateDataProfile(res);
                    return pageView.profilePage(selector, data);
                }, (err) => {
                    console.log(err);
                }).then(() => {
                    userEvents.editProfile();
                    userEvents.updateProfile();
                    userEvents.cancelEditProfile();
                });
        }
    }

    isUserLoggedIn() {
        return userModel.isLoggedIn();
    }

    storeAllUsers() {
        return userModel.getAllUsernames();
    }
    redirectToHomeAndClearStorage() {
        if ('http://127.0.0.1:8080/#/profile' === window.location.href) {
            window.location.href = 'http://127.0.0.1:8080/#/home'
        }
        localStorage.clear();
    }
}

let usersController = new UserController();
export { usersController };