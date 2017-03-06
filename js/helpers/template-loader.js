// add helper to Handlebars
Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});
class TemplateLoader {
    get(name) {
        let url = `./templates/${name}.handlebars`;
        var promise = new Promise((resolve, reject) => {
            $.get(url, (html) => {
                let template = Handlebars.compile(html);
                resolve(template);
            });
        });

        return promise;
    }
}

let templateLoader = new TemplateLoader();
export { templateLoader };