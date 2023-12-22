$(function () {

    if (window.ActiveXObject) {
        var reg = /10\.0/;
        var str = navigator.userAgent;
        if (reg.test(str)) {
            window.location.href = 'https://support.dmeng.net/upgrade-your-browser.html';
        }
    }
    
    $('.scroll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); 

    $(window).scroll(function() {
        if($(window).scrollTop() > 100) {
            $('.page-asides').addClass('show');
        } else {
            $('.page-asides').removeClass('show');
        }
    });
})