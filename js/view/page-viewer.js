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

    blog(selector) {
        return loadRawTemplate(selector, 'blog');
    }

    cart(selector) {
        return loadRawTemplate(selector, 'cart');
    }

    homePage(selector) {
        loadRawTemplate(selector, 'home');
    }

    profile(selector) {
        return loadRawTemplate(selector, 'profile');
    }

    shop(selector) {
        return loadRawTemplate(selector, 'shop');
    }

    threads(selector) {
        return loadRawTemplate(selector, 'threads');
    }
    threadsById(selector) {
        return loadRawTemplate(selector, 'threadsById');
    }
    threadsByIdWithComments(selector) {
        return loadRawTemplate(selector, 'threadsByIdWithComments');
    }

    // profilePage(selector, data) {
    //     return setHtmlWithCompiledData(selector, data, 'profile');
    // }

}

let pageView = new PageView();
export { pageView };