$(document).ready(function() {

    // breadcrumbs
    let href = window.location.pathname;
    let links = href.split('/').filter(String);
    for (link of links) {
        $(".breadcrumb").append("<li><a href=" + link + ">" + link + "</a></li>");
    }


    // media bar options
    $('#media').carousel({
        pause: true,
        interval: 10000,
    });


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

    //controlers thumbs
    $(".l").click(function() {
        $(this).css("border", "3px solid red");
        $(this).next().next().css("borderColor", "#DDDDDD");
    });
    $(".r").click(function() {
        $(this).css("border", "3px solid green");
        $(this).prev().prev().css("borderColor", "#DDDDDD");
    });
});