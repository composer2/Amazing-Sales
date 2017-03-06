import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';

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
                pageView.homePage(selector, data);

                setTimeout(function() {
                    // Activate Carousel
                    $("#carousel-example-generic").carousel();
                    // media bar options
                    $('#media').carousel({
                        pause: true,
                        interval: 10000,
                    });
                    $('#media').hover(function() {
                        $(this).carousel('pause')
                    }, function() {
                        $(this).carousel('cycle')
                    })
                }, 5000);


            }, (err) => {
                console.log(err);
            });
    }
    aboutUs(context, selector) {
        return pageView.aboutUs(selector);
    }
}

let homeController = new HomeController();
export { homeController };