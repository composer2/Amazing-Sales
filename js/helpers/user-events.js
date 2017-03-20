import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';

let userEvents = (function() {

    function showProfile() {
        $('#main-content').addClass('logged-in');
        $('#nav-collapse2').removeClass('in')
        $('#profile-show-hide').removeClass('hidden');
    }

    function hideProfile() {
        $('#main-content').removeClass('logged-in');
        $('#profile-show-hide').addClass('hidden');
    }

    function editProfile() {
        $('#main-content').on('click', '#edit-profile-button', function() {
            $("#user-ready-data").addClass("hidden");
            $("#user-changing-data").removeClass("hidden");
        });
    }

    function updateProfile() {
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
    }

    function cancelEditProfile() {
        $('#main-content').on('click', '#cancel-profile-changes-btn', function() {
            //cancel any changes
            $("#user-ready-data").removeClass("hidden");
            $("#user-changing-data").addClass("hidden");
            notificator.error('All Changes Canceled');
        });
    }

    function updateDataProfile(res) {
        return {
            username: res.username,
            phone: res.phone,
            address: res.address,
            gender: res.gender,
            email: res.email,
            lastname: res.lastname,
            firstname: res.firstname,
            image: res.image || localStorage.getItem(STORAGE_USERNAME_IMAGE)
        }
    }

    return {
        showProfile,
        hideProfile,
        editProfile,
        updateProfile,
        updateDataProfile,
        cancelEditProfile,
    }
})();

export { userEvents }