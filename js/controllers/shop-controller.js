import { pageView } from '../view/page-viewer.js';
import { shopModel } from '../models/shop-model.js';
import { shopEvents } from '../helpers/shop-events.js';

class ShopController {
    shop(context, selector) {
        shopModel.getTop10Products()
            .then((res) => {
                res.sort(shopEvents.compare);
                let data = { products: res };
                return pageView.shop(selector, data);
            }, (err) => {
                console.log(err);
            })
            .then(() => {
                shopEvents.shop();
            });
    }
}

let shopController = new ShopController();
export { shopController };