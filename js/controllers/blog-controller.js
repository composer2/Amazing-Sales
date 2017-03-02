import { pageView } from '../view/page-viewer.js';

class BlogController {

    blog(context, selector) {
        return pageView.blog(selector);
    }

    threads(context, selector) {
        return pageView.threads(selector);
    }

    threadsById(context, selector) {
        return pageView.threadsById(selector);
    }
    threadsByIdWithComments(context, selector) {
        return pageView.threadsByIdWithComments(selector);
    }
}

let blogController = new BlogController();
export { blogController };