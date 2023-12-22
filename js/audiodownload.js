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
        url: "/Ajax/AudioDownloadHandler.ashx",   //一级分类
        type: "POST",
        dataType: 'json',
        data: { lbyeshu: lbyeshu},
        success: function (data) {
            if (data.code != "") {
                $("#loadMoreList").html("<img src='/img/loading.gif' alt=''>正在努力加载中...")
                $(".Clear").html(data.code)
                $(".down_btn").click(function ()
                {
                    var url = $(this).attr("url")
                    location.href = "~/down.aspx?fn=" + url;
                })
                $(this).addClass("Close");
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
