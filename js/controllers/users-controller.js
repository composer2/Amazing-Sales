import { pageView } from '../view/page-viewer.js';
import { userModel } from '../models/user-model.js';
import { notificator } from '../helpers/notificator.js';


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
            }, (err) => {
                console.log(err);
                notificator.error("Register Unsuccessful");
            });
    }

    logout() {
        userModel.logout()
            .then((res) => {
                $('#main-content').removeClass('logged-in');
                notificator.success('Successfully logout')
            }, (err) => {
                notificator.error(err)
            });
    }

    profile(context, selector) {
        let currentUserInfo, bookToRead, bookCurrentlyReading, bookRead;
        userModel.getCurrentUserInfo()
            .then((resCurrentUserInfo) => {
                currentUserInfo = resCurrentUserInfo;

                if (currentUserInfo.booksRead.length > 0) {
                    return booksModel.getSingleBookInfo(currentUserInfo.booksRead[0]._id);
                }
            })
            .then((resBookRead) => {

                bookRead = resBookRead;
                if (currentUserInfo.booksCurrentlyReading.length > 0) {
                    return booksModel.getSingleBookInfo(currentUserInfo.booksCurrentlyReading[0]._id);
                }
            })
            .then((resBookCurrentlyReading) => {
                bookCurrentlyReading = resBookCurrentlyReading;
                if (currentUserInfo.booksToRead.length > 0) {
                    return booksModel.getSingleBookInfo(currentUserInfo.booksToRead[0]._id);
                }
            })
            .then((resBookToRead) => {
                bookToRead = resBookToRead;
                let data = {
                    currentUserInfo,
                    bookToRead,
                    bookCurrentlyReading,
                    bookRead
                };

                pageView.profilePage(selector, data);
                return userModel.newsfeed();
            })
            .then((news) => {
                pageView.newsfeed('#newsfeed', news);
            })
            .then(() => {
                // $('#newsfeed').on('click', '.like', function(){
                //     let newsId = $(this).parents('.new-wrapper')
                //         .attr('data-id');
                //     userModel.like(newsId)
                //         .then((res)=>{
                //             console.log(res);
                //         }, (err)=>{
                //             console.log(err);
                //         });
                // });   
                // Cause Server Error update.likes.push is nof a function

                // $('#newsfeed').on('click', '.btn-add-comment', function () {
                //     let $this = $(this);
                //     let comment = $this
                //         .prev()
                //         .val();

                //     let newsId = $this
                //         .parents('.new-wrapper')
                //         .attr('data-id');

                //     userModel.comment(comment, newsId)
                //         .then((res)=>{
                //             console.log(res);
                //         }, (err)=>{
                //             console.log(err);
                //         });
                // });
                //Works only with old updates
            });
    }

    isUserLoggedIn() {
        return userModel.isLoggedIn();
    }

    storeAllUsers() {
        return userModel.getAllUsernames();
    }
}

let usersController = new UserController();
export { usersController };