(function () {
    var thisPage;
    if (document.getElementById('pageMain')) {
        thisPage = document.getElementById('pageMain').getAttribute('data-page');
    }
    switch (thisPage) {
        case 'index':
            $(function () {
                var e, i = document.getElementById("indexVideo");
                function t() {
                    document.getElementById("indexVideoSlide") && (document.getElementById("indexVideoSlide").offsetWidth / document.getElementById("indexVideoSlide").offsetHeight < 16 / 9 ? (i.style.width = "auto", i.style.height = "100%") : (i.style.width = "100%", i.style.height = "auto"))
                }
                function n(t) {
                    i ? (clearTimeout(e), 0 === t.activeIndex && document.body.offsetWidth > 960 ? i.play() : (i.pause(), i.currentTime = 0, e = setTimeout((function () {
                        t.isEnd ? t.slideTo(0, 400, !0) : t.slideNext()
                    }), 1e3 * $(".index-banner .swiper-slide").eq(t.activeIndex).data("duration")))) : (clearTimeout(e), e = setTimeout((function () {
                        t.isEnd ? t.slideTo(0, 400, !0) : t.slideNext()
                    }), 1e3 * $(".index-banner .swiper-slide").eq(t.activeIndex).data("duration")))
                }
                document.body.offsetWidth <= 960 && i && document.getElementById("indexVideoSlide").remove(), t(), i && i.addEventListener("ended", (function () {
                    a.slideNext()
                }), !1);
                var swiper01 = new Swiper('.index_banner .swiper-container', {
                    speed: 1000,
                    loop: true,
                    autoplay: {
                        delay: 6000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    watchOverflow: !0,
                    on: {
                        init: function () {
                            this.$el.addClass("isready")
                        }
                    },
                    pagination: {
                      el: '.swiper-pagination',
                    },
                    on: {
                        init: function() {
                            swiperAnimateCache(this); //隐藏动画元素 
                            swiperAnimate(this); //初始化完成开始动画
                        },
                        slideChangeTransitionEnd: function() {
                            swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                            //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                        }
                    }
                });

                $(".ind01-nav .nav-item").click(function(){
                    var w = $(window).width();
                    if (w > 1200) {
                        if (!(/msie[6|7|8|9]/i.test(navigator.userAgent))) {
                            console.log(111)
                            new WOW({
                                callback: function (box) {
                                    $(box).addClass("wow1");
                                }
                            }).init();
                        }
                        $(window).resize(function () {
                            new WOW({
                                callback: function (box) {
                                    $(box).addClass("wow1");
                                }
                            }).init();
                        });
                    }
                    $(this).addClass('active').siblings().removeClass('active');
                    var _ind=$(".ind01-nav .nav-item").index($(this));
                    console.log(_ind)
                    $(".ind01-lists .list-item").eq(_ind).addClass("active").siblings().removeClass("active");
                })
                $(".index-page02 .item").hover(function(){
                    $(this).addClass("active").siblings().removeClass("active");
                })
            })
            break;

            case 'newsDetail':
                $(".head-page").addClass("head-paged")
                break;

            case 'listing':
              $(".shut_btn").click(function(){
                console.log(111)
                $(this).parent().addClass("active");
              })
              break;
            
            
               
                
            default:
                break;
    }

})();



!function(e){var t={};function o(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=0)}([function(e,t,o){o(1),e.exports=o(2)},function(e,t,o){"use strict";function i(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}o.r(t);var n=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t,this.type=""}var t,o,n;return t=e,(o=[{key:"initial",value:function(){var e=this;$(e.id+">.c-modal-bg").on("click",(function(){e.off()})),$(e.id+" .c-modal-close").on("click",(function(){e.off()}))}},{key:"open",value:function(e,t){if("img"===e)this.type=e,$(this.id+" .c-modal-main.imgbox").addClass("active").html('<img src="'.concat(t,'" alt="">'));else if("video"===e)this.type=e,$(this.id+" .c-modal-main.videobox").addClass("active").html('<video class="video-js vjs-default-skin vjs-big-play-centered" id="cModalVideo"><source src="'.concat(t,'" type="video/mp4"></video>')),this.videojs=videojs("cModalVideo",{muted:!1,controls:!0,loop:!1,autoplay:!0});else{if("contact"!==e)return!1;this.type=e,$(this.id+" .c-modal-main.contactbox").addClass("active")}$(this.id).addClass("show")}},{key:"off",value:function(){var e=this;"img"===e.type?setTimeout((function(){$(e.id+" .c-modal-main.imgbox").removeClass("active").html("")}),300):"video"===e.type&&setTimeout((function(){e.videojs&&e.videojs.dispose(),$(e.id+" .c-modal-main.videobox").removeClass("active").html("")}),300),e.type="",$(e.id).removeClass("show")}}])&&i(t.prototype,o),n&&i(t,n),e}())("#cModal");n.initial(),$(".j-modal-open").click((function(){n.open($(this).attr("data-type"),$(this).attr("data-url"))}))},function(e,t){}]);