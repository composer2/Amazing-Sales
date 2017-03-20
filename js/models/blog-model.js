import { requester } from '../helpers/requester.js';

const kinvey_APP_ID = 'kid_BkuT-lUql';
const kinvey_APP_SECRET = 'b92b557c5d1f4edca34238eca4e1b481';
const kinvey_MASTER_SECRET = 'bab6be0bbcb647729a5d93b1bc1f1413';
const kinvey_URL = 'https://baas.kinvey.com/';
const APP_ID = 'co50xbssvfni5o0s';
const ACCESS_TOKEN = 'v0yhnv1ybqbskxn24rt6qbu3fmi3whmz';

class BlogModel {
    getAllForumInfo() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
    getAllForumInfoOnPageX(limit, skip) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum/?query={}&limit=' + limit + '&skip=' + skip;
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }

    getAllThreads(fromTopicByName) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum/?query={"topicName":"' + fromTopicByName + '"}';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
    getAllThreadsOnPageX(fromTopicByName) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum/?query={"topicName":"' + fromTopicByName + '"}';
            console.log(url);
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
    getSinglePost(singlePost) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum/?query={"threads.threadName":"' + singlePost + '"}';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
    updateSinglePost(id, data) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/forum/' + id
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 }
            let options = { headers, data };
            requester.put(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
}

let blogModel = new BlogModel();
export { blogModel };