import { pageView } from '../view/page-viewer.js';
import { blogModel } from '../models/blog-model.js';
import { notificator } from '../helpers/notificator.js';


const STORAGE_USERNAME = 'STORAGE_USERNAME';
const POSTED_BY = localStorage.getItem(STORAGE_USERNAME) || "Guest"
const STORAGE_USERNAME_IMAGE = 'STORAGE_USERNAME_IMAGE';
const USER_IMAGE = localStorage.getItem(STORAGE_USERNAME_IMAGE) || "https://cdn.pbrd.co/images/I7tGDp00I.png";;

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
        let self = this;
        let data;
        blogModel.getAllThreads(context.params.threads)
            .then((res) => {

                data = {
                    threads: res[0]
                };
                console.log(res[0]._id);
                pageView.threads(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                $('#main-content').on('click', ".button-new-post", function() {
                    $(".new-post-form").removeClass('hidden');
                });
                $('#main-content').on('click', ".submit-new-post", function() {
                    // create new post
                    let newData = {
                            "authorImage": data.threads.authorImage,
                            "postedBy": data.threads.postedBy,
                            "threads": data.threads.threads,
                            "topicDate": data.threads.topicDate,
                            "topicImage": data.threads.topicImage,
                            "topicName": data.threads.topicName,
                            "topicShortDescription": data.threads.topicShortDescription
                        }
                        // add to DOM
                    let newPost = self.addPost();
                    newData.threads.push(newPost);
                    blogModel.updateSinglePost(data.threads._id, newData)
                        // add the new post
                    pageView.threads(selector, data);
                    notificator.success("Post Created Successfully ")
                    $(".new-post-form").addClass('hidden');
                });
            });
    }

    singlePost(context, selector) {
        let self = this;
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
                pageView.singlePost(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                $('#main-content').on('click', '#read-more-comments', function() {
                    $("#article-comments").removeClass('hidden');
                });
            });
        //comment
        $('#main-content').on('click', '#submit-new-comment', function() {
            let comment = self.addComment();
            data.thread.threads[pos].comments.push(comment);
            $("#comments").append(`
                    <div class="media">
                        <div class="media-left">
                            <img src="` + comment.authorImage + `" alt="` + comment.postedBy + `" class="pull-left">
                        </div>
                        <div class="media-body">
                            <h3 class="media-heading text-left">` + comment.postedBy + `</h3>
                            <p id="nested-author1" class="text-right"><small><i>Posted on ` + comment.commentDate + `</i></small></p>
                            <p class="nested-p-mobile">` + comment.comment + `</p>
                            <a class="comment-question" href="" class="btn btn-default btn-blog pull-right">Reply</a>
                        </div>
                    </div>`)
            let updatedData = {
                "authorImage": data.thread.authorImage,
                "postedBy": data.thread.postedBy,
                "threads": data.thread.threads,
                "topicDate": data.thread.topicDate,
                "topicImage": data.thread.topicImage,
                "topicName": data.thread.topicName,
                "topicShortDescription": data.thread.topicShortDescription
            }
            blogModel.updateSinglePost(data.thread._id, updatedData)
            notificator.success('Comment Added Successfully');
        });
        //reply 
        $('#main-content').on('click', '.comment-question', function() {
            replyPos = $(this).attr('id');
            $(".append-reply-form").after(`
            <div class="hello">
                <div id="comment-reply">
                    <div class="row">
                        <h1>Leave a Reply</h1>
                        <form id="comment-form-reset" class="col-sm-12">
                                <input type="text" id="name" name="name" class="input-block-level appended-reply-name" placeholder="Name" required>
                                <input type="text" id="email" name="email" class="input-block-level appended-reply-email" placeholder="Email" required>
                                <textarea rows="3" id="description" name="message" class="input-block-level appended-reply-description" placeholder="Message" required></textarea>                                
                                <a class="btn btn-default pull-right appended-reply-submit">Reply</a>
                        </form>
                    </div>
                </div>
                <br>
                <br>
            </div>
            `)
        });
        $("#main-content").on('click', ".appended-reply-submit", function() {
            let reply = self.addReply();
            data.thread.threads[pos].comments[replyPos].reply.push(reply);
            $('#comment-' + replyPos).after(`
            <div class="media nested">
                <div class="media-left">
                    <img src="` + reply.authorImage + `" alt="` + reply.postedBy + `" class="pull-left">
                </div>
                <div class="media-body">
                    <h3 class="media-heading">` + reply.postedBy + `</h3>
                    <p id="nested-author2" class="text-right"><small><i>Posted on ` + reply.commentDate + `</i></small></p>
                    <p class="nested-p nested-p-mobile">` + reply.comment + `</p>
                </div>
            </div>`)
            let updatedData = {
                "authorImage": data.thread.authorImage,
                "postedBy": data.thread.postedBy,
                "threads": data.thread.threads,
                "topicDate": data.thread.topicDate,
                "topicImage": data.thread.topicImage,
                "topicName": data.thread.topicName,
                "topicShortDescription": data.thread.topicShortDescription
            }
            blogModel.updateSinglePost(data.thread._id, updatedData)
            $(".hello").remove();
            notificator.success('Comment Added Successfully');
        });


    }
    addComment() {
        var date = new Date();
        var newDate = date.toUTCString().split(" ");
        let comment = {
            "authorImage": USER_IMAGE,
            "comment": $("#description").val(),
            "commentDate": newDate[2] + " " + newDate[1] + ", " + newDate[3],
            "postedBy": $("#name").val(),
            "reply": []
        }
        $("#comment-form-reset")[0].reset();
        return comment;
    }
    addReply() {
        var date = new Date();
        var newDate = date.toUTCString().split(" ");
        let comment = {
            "authorImage": USER_IMAGE,
            "comment": $(".appended-reply-description").val(),
            "commentDate": newDate[2] + " " + newDate[1] + ", " + newDate[3],
            "postedBy": $(".appended-reply-name").val(),
        }
        $("#comment-form-reset")[0].reset();
        return comment;
    }
    addPost() {
        var date = new Date();
        var newDate = date.toUTCString().split(" ");
        let newThread = {
            "authorImage": USER_IMAGE,
            "comments": [],
            "postedBy": POSTED_BY,
            "tag": $(".new-post-tags").val().split(" "),
            "threadDate": newDate[2] + " " + newDate[1] + ", " + newDate[3],
            "threadDescription": $(".new-post-description").val(),
            "threadName": $(".new-post-heading").val(),
        }
        return newThread;
    }
}

let blogController = new BlogController();
export { blogController };