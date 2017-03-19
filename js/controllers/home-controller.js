import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';
import { homeEvents } from '../helpers/home-events.js';

class HomeController {

    home(context, selector) {
        blogModel.getAllForumInfo()
            .then((res) => {
                // filter for topics only
                // res.sort(this.compare);
                let data = {
                    first3Topics: [res[0], res[1], res[2]],
                    second3Topics: [res[3], res[4], res[5]],
                    first6: [res[0], res[1], res[2], res[3], res[4], res[5]],
                    second6: [res[6], res[7], res[8], res[9], res[10], res[11]]
                };
                return pageView.homePage(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                homeEvents.startCarousel();
                homeEvents.singInOutShowHide();
                homeEvents.facebookLogin();
            });
    }
    aboutUs(context, selector) {
        return pageView.aboutUs(selector);
    }
}

let homeController = new HomeController();
export { homeController };