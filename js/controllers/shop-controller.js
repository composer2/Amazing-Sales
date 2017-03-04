import { pageView } from '../view/page-viewer.js';
import { shopModel } from '../models/shop-model.js';
class ShopController {

    shop(context, selector) {
        shopModel.getTop10Products()
            .then((res) => {
                // res.sort((a, b) => {
                //     return a.toLowerCase().localeCompare(b.toLowerCase());
                // });
                let data = { products: res };
                console.log(data);
                pageView.shop(selector, data);
                //pros n con labels
                $('#main-content').on('click', '.cons', function() {
                    $(this).addClass("active");
                    $(this).prev().removeClass("active");
                    $(this).parent().parent().next().find(".tab-pros").removeClass("active")
                    $(this).parent().parent().next().find(".tab-cons").addClass("active")
                });
                $('#main-content').on('click', '.pros', function() {
                    $(this).addClass("active");
                    $(this).next().removeClass("active");
                    $(this).parent().parent().next().find(".tab-cons").removeClass("active")
                    $(this).parent().parent().next().find(".tab-pros").addClass("active")
                });
                //controlers thumbs
                $('#main-content').on('click', '.l', function() {
                    $(this).css("border", "3px solid red");
                    $(this).next().next().css("borderColor", "#DDDDDD");
                });
                $('#main-content').on('click', '.r', function() {
                    $(this).css("border", "3px solid green");
                    $(this).prev().prev().css("borderColor", "#DDDDDD");
                });
            }, (err) => {
                console.log(err);
            })
            .then(() => {
                // $(selector).on('click', '.genre', function() {
                //     let $this = $(this);
                //     context.redirect(`#/books-result?genre=${$this.html()}`);
                // });
            });
    }
}

let shopController = new ShopController();
export { shopController };