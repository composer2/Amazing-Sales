import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';

class BlogController {

    blog(context, selector) {
        blogModel.getAllForumInfo()
            .then((res) => {
                let data = {
                    topics: res
                };
                pageView.blog(selector, data);

            }, (err) => {
                console.log(err);
            });
    }

    threads(context, selector) {
        blogModel.getAllThreads(context.params.threads)
            .then((res) => {
                let data = {
                    threads: res[0]
                };
                pageView.threads(selector, data);
            }, (err) => {
                console.log(err);
            });
    }

    singlePost(context, selector) {
        blogModel.getSinglePost(context.params.singlePost)
            .then((res) => {
                let post = context.params.singlePost
                let postData = res[0].threads
                let newData = {};
                for (let i = 0; i < postData.length; i++) {
                    if (postData[i].hasOwnProperty('threadName')) {
                        let prop = postData[i]['threadName'];
                        if (prop === post) {
                            newData = postData[i];
                            break;
                        }
                    }
                }
                let data = {
                    thread: res[0],
                    singlePost: newData
                };
                console.log(data);
                pageView.singlePost(selector, data);
                setTimeout(function() {
                    // show-hide comments
                    $('#main-content').on('click', '#read-more-comments', function() {
                        $("#article-comments").toggleClass('hidden show');
                    });
                    $('#main-content').on('click', '#read-less', function() {
                        $("#article-comments").toggleClass('show hidden');
                    });
                }, 2000);
            }, (err) => {
                console.log(err);
            });

    }
    threadsByIdWithComments(context, selector) {
        return pageView.threadsByIdWithComments(selector);
    }
}

let blogController = new BlogController();
export { blogController };