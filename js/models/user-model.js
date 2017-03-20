import { requester } from '../helpers/requester.js';
import * as CryptoJS from '../../node_modules/crypto-js/crypto-js.js';

const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
const STORAGE_USERNAMES_AND_ID = 'STORAGE_USERNAMES';
const STORAGE_USERNAME = 'STORAGE_USERNAME';
const STORAGE_USERNAME_ID = 'STORAGE_USERNAME_ID';
const STORAGE_USERNAME_IMAGE = 'STORAGE_USERNAME_IMAGE';
const DEFAULT_IMAGE = 'https://cdn.pbrd.co/images/I7tGDp00I.png';

const kinvey_APP_ID = 'kid_BkuT-lUql';
const kinvey_APP_SECRET = 'b92b557c5d1f4edca34238eca4e1b481';
const kinvey_MASTER_SECRET = 'bab6be0bbcb647729a5d93b1bc1f1413';
const kinvey_URL = 'https://baas.kinvey.com/';
const APP_ID = 'co50xbssvfni5o0s';
const ACCESS_TOKEN = 'v0yhnv1ybqbskxn24rt6qbu3fmi3whmz';

function createRequestOptions(user) {
    return {
        username: user.username,
        password: CryptoJS.SHA1($(user.password).val()).toString()
    }
}

class UserModel {
    register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID;
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let data = createRequestOptions(user)
            let options = { headers, data };
            requester.post(url, options)
                .then(function(res) {
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    localStorage.setItem(STORAGE_USERNAME_ID, res._id);
                    localStorage.setItem(STORAGE_AUTH_KEY, res._kmd.authtoken);
                    localStorage.setItem(STORAGE_USERNAME_IMAGE, res.image || DEFAULT_IMAGE);
                    resolve(res);
                }, function(err) {
                    reject(err.responseText);
                });
        });
        return promise;
    }

    login(user) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/login';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let data = createRequestOptions(user)
            let options = { headers, data };
            requester.post(url, options)
                .then(function(res) {
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    localStorage.setItem(STORAGE_USERNAME_ID, res._id);
                    localStorage.setItem(STORAGE_AUTH_KEY, res._kmd.authtoken);
                    localStorage.setItem(STORAGE_USERNAME_IMAGE, res.image || DEFAULT_IMAGE);
                    resolve(res);
                }, function(err) {
                    reject(err);
                });
        });

        return promise;
    }

    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem(STORAGE_AUTH_KEY);
            });
    }

    logout() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/_logout';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Kinvey " + localStorage.getItem(STORAGE_AUTH_KEY) }
            let options = { headers };
            requester.post(url, options)
                .then(function(res) {
                    resolve(res);
                }, function(err) {
                    reject(err);
                });
        });

        return promise;
    }

    getCurrentUserInfo() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/' + localStorage.getItem(STORAGE_USERNAME_ID);
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Kinvey " + localStorage.getItem(STORAGE_AUTH_KEY) }
            let options = { headers };
            requester.get(url, options)
                .then(function(res) {
                    resolve(res);
                }, function(err) {
                    reject(err);
                });
        });
        return promise;
    }
    updateProfile(data) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/' + localStorage.getItem(STORAGE_USERNAME_ID);
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Kinvey " + localStorage.getItem(STORAGE_AUTH_KEY) }
            let options = { headers, data };
            requester.put(url, options)
                .then(function(res) {
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    localStorage.setItem(STORAGE_USERNAME_ID, res._id);
                    localStorage.setItem(STORAGE_AUTH_KEY, res._kmd.authtoken);
                    localStorage.setItem(STORAGE_USERNAME_IMAGE, res.image || DEFAULT_IMAGE);
                    resolve(res);
                }, function(err) {
                    reject(err);
                });
        });
        return promise;
    }
}

let userModel = new UserModel();
export { userModel };