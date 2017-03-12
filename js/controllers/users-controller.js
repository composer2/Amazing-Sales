import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';

const STORAGE_USERNAME_IMAGE = 'STORAGE_USERNAME_IMAGE';

class UserController {
    signInUp() {
        let user = {
            username: $('#Email').val(),
            password: $('#Password').val()
        };

        userModel.login(user)
            .then((res) => {
                    $('#main-content').addClass('logged-in');
                    $('#nav-collapse2').removeClass('in')
                    $('#profile-show-hide').removeClass('hidden');
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
                notificator.success('Registered Successfully');
                $('#nav-collapse2').removeClass('in')
                $('#profile-show-hide').removeClass('hidden');
            }, (err) => {
                notificator.error("Register Unsuccessful");
            });
    }

    logout() {
        userModel.logout()
            .then((res) => {
                $('#main-content').removeClass('logged-in');
                $('#profile-show-hide').addClass('hidden');
                notificator.success('Successfully logout')
            }, (err) => {
                notificator.error(err)
            });
    }

    profile(context, selector) {
        let formData;
        userModel.getCurrentUserInfo()
            .then((res) => {
                formData = res;
                let data = {
                    username: res.username,
                    phone: res.phone,
                    address: res.address,
                    gender: res.gender,
                    email: res.email,
                    lastname: res.lastname,
                    firstname: res.firstname,
                    image: res.imgae || localStorage.getItem(STORAGE_USERNAME_IMAGE)
                };
                pageView.profilePage(selector, data);

            }, (err) => {
                console.log(err);
            }).then(() => {
                $('#main-content').on('click', '#edit-profile-button', function() {
                    $("#user-ready-data").addClass("hidden");
                    $("#user-changing-data").removeClass("hidden");
                });
                $('#main-content').on('click', '#save-profile-changes-btn', function() {
                    //update the profile data and display it
                    let data = {
                        "firstname": $("#textinputFirstname").val(),
                        "lastname": $("#textinputLastname").val(),
                        "gender": $("#selectbasic option:selected").html(),
                        "phone": $("#textinputPhone").val(),
                        "address": $("#textinputAddress").val(),
                        "image": $("#textinputPhotolink").val(),
                        "email": $("#textinputE-mail").val()
                    }

                    $('#set-image').attr("src", data.image);
                    $('#set-firstname').html(data.firstname);
                    $('#set-lastname').html(data.lastname);
                    $('#set-email').html(data.email);
                    $('#set-gender').html(data.gender);
                    $('#set-address').html(data.address);
                    $('#set-phone').html(data.phone);


                    $("#user-ready-data").removeClass("hidden");
                    $("#user-changing-data").addClass("hidden");
                    notificator.success('Profile Successfully Updated');
                    userModel.updateProfile(data);
                });
                $('#main-content').on('click', '#cancel-profile-changes-btn', function() {
                    //cancel any changes
                    $("#user-ready-data").removeClass("hidden");
                    $("#user-changing-data").addClass("hidden");
                    notificator.success('All Changes Canceled');
                });
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