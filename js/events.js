$(document).ready(function() {

    // breadcrumbs
    let href = window.location.pathname;
    let links = href.split('/').filter(String);
    for (link of links) {
        $(".breadcrumb").append("<li><a href=" + link + ">" + link + "</a></li>");
    }






});