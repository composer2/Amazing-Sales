import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';
import { userEvents } from '../helpers/user-events.js';
import { homeEvents } from '../helpers/home-events.js';

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

    isUserLoggedIn() {
        homeEvents.singInOutShowHide();
        return userModel.isLoggedIn();
    }

    storeAllUsers() {
        return userModel.getAllUsernames();
    }
    redirectToHomeAndClearStorage() {
        let url = window.location.href;
        let urlContain = url.split('/');
        if (urlContain[urlContain.length - 1] === 'profile') {
            urlContain[urlContain.length - 1] = 'home'
            let newUrl = urlContain.join('/');
            window.location.href = newUrl;
        }
        localStorage.clear();
    }
}

let usersController = new UserController();
export { usersController };