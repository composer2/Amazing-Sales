import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';
import { userEvents } from '../helpers/user-events.js';

const STORAGE_USERNAME_IMAGE = 'STORAGE_USERNAME_IMAGE';

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
        userModel.logout()
            .then((res) => {
                userEvents.hideProfile()
                notificator.success('Successfully logout')
            }, (err) => {
                notificator.error(err)
            });
    }

    profile(context, selector) {
        userModel.getCurrentUserInfo()
            .then((res) => {
                let data = userEvents.updateDataProfile();
                return pageView.profilePage(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                userEvents.editProfile();
                userEvents.updateProfile();
                userEvents.cancelEditProfile();
            });
    };

    isUserLoggedIn() {
        return userModel.isLoggedIn();
    }

    storeAllUsers() {
        return userModel.getAllUsernames();
    }
}

let usersController = new UserController();
export { usersController };