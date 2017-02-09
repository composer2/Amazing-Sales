$(document).ready(function() {
    // media bar options
    $('#media').carousel({
        pause: true,
        interval: 10000,
    });
    // breadcrumbs
    let href = window.location.pathname;
    let links = href.split('/').filter(String);
    for (link of links) {
        $(".breadcrumb").append("<li><a href=" + link + ">" + link + "</a></li>");
    }
    // breadcrumbs
    //sign in/out
    $("#sign-in-out").click(function() {
        var text = $(this).html();
        if (text === "Sign in") {
            text = "Sign out"
        } else if (text === "Sign out") {
            text = "Sign in"
        }
        $(this).html(text);
    });
    //sign in/out
});