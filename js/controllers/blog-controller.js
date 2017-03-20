import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';
import { notificator } from '../helpers/notificator.js';
import { blogEvents } from '../helpers/blog-events.js';

const POST_BY_PAGE = 5;

class BlogController {
    constructor() {
        this.singleThread_id = "";
    }
    blog(context, selector) {
        let pages;
        blogModel.getAllForumInfo()
            .then((res) => {
                pages = res.length;
                let firstFive = res.slice(0, POST_BY_PAGE);
                let data = {
                    topics: firstFive
                };
                return pageView.blog(selector, data);

            }, (err) => {
                console.log(err);
            }).then(() => {
                blogEvents.attachNumberOfPages(pages);
                blogEvents.loadPostsByPageNumber();
            });
    }
    loadPostDataByPageNumber(limit, skip) {
        blogModel.getAllForumInfoOnPageX(limit, skip)
            .then((res) => {
                let data = {
                    topics: res
                };
                return pageView.singlePagePost("#singlePagePost", data);
            }, (err) => {
                console.log(err);
            });
    }
    loadThreadDataByPageNumber(start) {
        let topicName = window.location.href.split("/");
        blogModel.getAllThreadsOnPageX(topicName[topicName.length - 1])
            .then((res) => {
                let newData = res[0].threads.slice(start, start + POST_BY_PAGE)
                let data = {
                    threads: res[0]
                };
                data.threads.threads = newData;
                return pageView.singlePageThread("#singlePageThread", data);
            }, (err) => {
                console.log(err);
            });
    }

    threads(context, selector) {
        let data;
        let pages;
        blogModel.getAllThreads(context.params.threads)
            .then((res) => {
                pages = res[0].threads.length;
                let firstFive = res[0].threads.slice(0, POST_BY_PAGE);
                data = {
                    threads: res[0]
                };
                data.threads.threads = firstFive;
                return pageView.threads(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                blogEvents.attachThreadsLinks(context.params.threads);
                blogEvents.showNewPost();
                blogEvents.submitNewPost(data, selector);
                blogEvents.attachNumberOfPages(pages);
                blogEvents.loadThreadsByPageNumber();
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