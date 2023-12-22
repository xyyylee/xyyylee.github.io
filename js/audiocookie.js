$(function(){ 
    $(".buttonpush").click(function (event) {
        $(".neirong").addClass('neirong-show');
        $(".nav_cont").show();
        $(".fix_css").addClass("hide_css");
    });
    $(".neirong-close").click(function (event) {
        $(".neirong").removeClass('neirong-show');
        $(".nav_cont").removeClass("active1").hide();
        $(".fix_css").removeClass("hide_css");
    });
    $(window).on('scroll', function(event) {
        if($(window).scrollTop()>0){
            $(".buttonpush").stop().addClass('show');
        }else{
            $(".buttonpush").stop().removeClass('show');
        }
    });
    //header
    var W = $(window).width();
    if(W<1025){ 
        $(".head1 .float-sec li").click(function(){
            $(this).children(".nav_cont").toggleClass("active1");
        }); 
    }
    else{
        $(window).scroll(function(){
            var _top=$(window).scrollTop();
            if(_top>100){
                $(".head1").addClass("fix");
            }
            else{
                $(".head1").removeClass("fix");
            }
        });
    }
}
);
$(".mplayer").hide()
var audios = document.getElementsByTagName("audio");
function pauseAll() {
    var self = this;
    [].forEach.call(audios, function (i) {
        i !== self && i.pause();
    })
}
$(".table-nav a").click(function () {
    $(".music-box").remove();
    $("#lbyeshu").val(1)
    $(".table-nav a").removeClass("active")
    $(this).addClass("active")
    tojiazaiList();
})

function tojiazaiList() {
  
    var lbyeshu = $("#lbyeshu").val()
    $.ajax({
        url: "/Ajax/AudioCookieHandler.ashx",   //一级分类
        type: "POST",
        dataType: 'json',
        data: { lbyeshu: lbyeshu},
        success: function (data) {
            if (data.code != "") {
                $("#loadMoreList").html("<img src='/img/loading.gif' alt=''>正在努力加载中...")
                $(".Clear").html(data.code)
                $(this).addClass("Close");
                $(".close_btn").click(function () {
                    var id = $(this).attr("id")
                    var ids = Cookie.get("ids")
                   
                    $(this).removeClass("active")
                    if (ids.indexOf(",") > 0) {
                        ids = ids.replace(id + ",", "")
                        ids = ids.replace("," + id, "");
                        Cookie.set("ids", ids, 1)
                    } else {
                        Cookie.set("ids", ids, -1)
                    }
                    $(".head_list").load(location.href + " .head_list>*", "");
                    $(this).parents(".list").remove()
                })
                $(".music-box .mplayer").click(function () {
                    var audio = $(this).next("audio")[0]
                    var ss = audio.paused;
                    if (ss) {
                        pauseAll()
                        audio.play();
                        $(".list").removeClass("mplaying")
                        $(this).parents(".list").addClass("mplaying");
                        timer = setInterval(() => {
                            if (audio.ended) {
                                $(this).parents(".list").removeClass("mplaying");
                            } else {
                                var timeDisplay = Math.floor(audio.currentTime);
                            }
                        }, 100);
                    }
                    else {
                        audio.pause();
                        $(".list").removeClass("mplaying")
                    }
                })
                $(".music-box").hover(function () {
                    $(this).find(".mplayer").show()
                    var color = $(this).attr("data-color");
                    $(this).css("background", color);
                }, function () {
                    $(".music-box").css("background", "#fff");
                    $(".mplayer").hide()
                })
            } else {
                $("#loadMoreList").hide();
            }
        }
    })
}
tojiazaiList();
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();//浏览器可视窗口顶端距离网页顶端的高度（垂直偏移）
    var seeHeight = $(window).height();//浏览器可视窗口高度
    var totalHeight = $(document).height();//整个文档高度
    if (scrollTop + seeHeight + 1 > totalHeight) {
        var pagenum = $("#lbyeshu").val();
        document.getElementById("lbyeshu").value = parseInt(pagenum) + 1;
        //tojiazaiList();
    }
});

$(".empty_btn").click(function ()
{
    Cookie.set("ids", "", -1)
    $(".Clear").load(location.href + " .Clear>*", "");
    $(".head_list span").text("0");
})

//$(".keep_btn").click(function () {
//    var count = $(".music-box").length;
//    tolist(0)
//})
//function tolist(index) {
//    var audio = $(".Clear audio").eq(index)[0]
//    var ss = audio.paused;
//    if (ss) {
//        pauseAll()
//        audio.play();
//        $(".list").removeClass("mplaying")
//        $(this).parents(".list").addClass("mplaying");
//        timer = setInterval(() => {
//            if (audio.ended) {
//                $(this).parents(".list").removeClass("mplaying");
//                index++;
//                tolist(index)
//            } else {
//                var timeDisplay = Math.floor(audio.currentTime);
//            }
           
//        }, 100);
//    }
//    else {
//        audio.pause();
//        $(".list").removeClass("mplaying")
//    }
//}
var Cookie = {
    set: function (key, value, exdays) {
        let exdate = new Date() // 获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
        // 字符串拼接cookie
        // eslint-disable-next-line camelcase
        window.document.cookie = key + '=' + value + ';path=/;expires=' + exdate.toGMTString()
    },

    get: function (key) {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
            for (let i = 0; i < arr.length; i++) {
                let arr2 = arr[i].split('=') // 再次切割
                // 判断查找相对应的值
                if (arr2[0] === key) {
                    return arr2[1]
                }
            }
        }
    },
};











