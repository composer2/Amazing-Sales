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
    //pros n con labels

    $(".cons").click(function() {
        $(this).addClass("active");
        $(this).prev().removeClass("active");
        $(this).parent().parent().next().find(".tab-pros").removeClass("active")
        $(this).parent().parent().next().find(".tab-cons").addClass("active")
    });
    $(".pros").click(function() {
        $(this).addClass("active");
        $(this).next().removeClass("active");
        $(this).parent().parent().next().find(".tab-cons").removeClass("active")
        $(this).parent().parent().next().find(".tab-pros").addClass("active")
    });
    //pros n con labels
    //controlers thumbs
     $(".l").click(function() {
        $(this).css("border","3px solid red");
        $(this).next().next().css("borderColor","#DDDDDD");
    });
     $(".r").click(function() {
        $(this).css("border","3px solid green");
        $(this).prev().prev().css("borderColor","#DDDDDD");
    });
    //controlers thumbs
});