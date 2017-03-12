import { templateLoader } from '../helpers/template-loader.js';

function loadRawTemplate(selector, templateName) {
    let selectedItem = $(selector);
    return templateLoader.get(templateName)
        .then((template) => {
            selectedItem.html(template());
        });
}

function setHtmlWithCompiledData(selector, data, templateName) {
    let selectedItem = $(selector);
    return templateLoader.get(templateName)
        .then((template) => {
            selectedItem.html(template(data));
        });
}

class PageView {

    aboutUs(selector) {
        return loadRawTemplate(selector, 'about-us');
    }

    blog(selector, topics) {
        return setHtmlWithCompiledData(selector, topics, 'blog');
    }

    cart(selector) {
        return loadRawTemplate(selector, 'cart');
    }

    homePage(selector, homePage) {
        return setHtmlWithCompiledData(selector, homePage, 'home');
    }

    profile(selector) {
        return loadRawTemplate(selector, 'profile');
    }

    shop(selector, products) {
        return setHtmlWithCompiledData(selector, products, 'shop');
    }

    threads(selector, threads) {
        return setHtmlWithCompiledData(selector, threads, 'threads');
    }
    singlePost(selector, singlePost) {
        return setHtmlWithCompiledData(selector, singlePost, 'singlePost');
    }
    threadsByIdWithComments(selector) {
        return loadRawTemplate(selector, 'threadsByIdWithComments');
    }
    profilePage(selector, profile) {
        return setHtmlWithCompiledData(selector, profile, 'profile');
    }

}

let pageView = new PageView();
export { pageView };