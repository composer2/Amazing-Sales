import { pageView } from '../view/page-viewer.js';

class ShopController {

    shop(context, selector) {
        return pageView.shop(selector);
    }
}

let shopController = new ShopController();
export { shopController };