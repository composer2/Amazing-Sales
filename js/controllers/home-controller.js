import { pageView } from '../view/page-viewer.js';

class HomeController {

    home(context, selector) {
        return pageView.homePage(selector);
    }
    aboutUs(context, selector) {
        return pageView.aboutUs(selector);
    }
}

let homeController = new HomeController();
export { homeController };