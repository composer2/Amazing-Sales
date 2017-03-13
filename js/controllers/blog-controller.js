import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';
import { notificator } from '../helpers/notificator.js';
import { blogEvents } from '../helpers/blog-events.js';

class BlogController {
    constructor() {
        this.singleThread_id = "";
    }
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
        let data;
        blogModel.getAllThreads(context.params.threads)
            .then((res) => {
                data = {
                    threads: res[0]
                };
                return pageView.threads(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                blogEvents.attachThreadsLinks(context.params.threads);
                blogEvents.showNewPost();
                blogEvents.submitNewPost(data, selector);
            });
    }

    singlePost(context, selector) {
        let data;
        let pos;
        let replyPos;
        blogModel.getSinglePost(context.params.singlePost)
            .then((res) => {
                let post = context.params.singlePost
                let postData = res[0].threads;
                let newData = {};
                for (let i = 0; i < postData.length; i++) {
                    if (postData[i].hasOwnProperty('threadName')) {
                        let prop = postData[i]['threadName'];
                        if (prop === post) {
                            newData = postData[i];
                            pos = i;
                            break;
                        }
                    }
                }
                data = {
                    thread: res[0],
                    singlePost: newData
                };
                return pageView.singlePost(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                blogEvents.attachSinglePostsLinks(data.thread.topicName, context.params.singlePost);
                blogEvents.showComments();
                blogEvents.createNewComment(data, pos);
                blogEvents.createNewReply(data, pos, replyPos);
            });
    }
}

let blogController = new BlogController();
export { blogController };