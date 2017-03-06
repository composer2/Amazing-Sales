import { requester } from '../helpers/requester.js';

const SHOP_STORAGE = 'STORAGE_SHOP';
const kinvey_APP_ID = 'kid_BkuT-lUql';
const kinvey_APP_SECRET = 'b92b557c5d1f4edca34238eca4e1b481';
const kinvey_MASTER_SECRET = 'bab6be0bbcb647729a5d93b1bc1f1413';
const kinvey_URL = 'https://baas.kinvey.com/';
const APP_ID = 'co50xbssvfni5o0s';
const ACCESS_TOKEN = 'v0yhnv1ybqbskxn24rt6qbu3fmi3whmz';

class ShopModel {
    getTop10Products() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/products';
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
}

let shopModel = new ShopModel();
export { shopModel };