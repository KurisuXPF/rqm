/*
 Code by kurisu
 */

//function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }
// 定义切换颜色组
window.onload=function()
{
    var colors = ['#555555', '#33ffee', '#22ccff', '#ffee11', '#349823', '#2f4c3e'];
    var currentQuote = '';//  获取的引言文字
    var currentAuthor = '';// 作者
    function tweetURL(c, a) {
        return ('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + c + '" ' + a));
    }

    function tumblrURL(c, a) {
        return ('https://www.tumblr.com/widgets/share/tool?data-posttype=quote&data-tags=quotes,freecodecamp&data-caption=' + encodeURIComponent(a) + '&data-content=' + encodeURIComponent(c));
    }

    function getQuote() { // 利用ajax获取引言
        $.ajax({
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: 'http://api.tianapi.com/txapi/dictum/?key=9e2835f96e3842d3a4243032a287a16e',
            success: function (response) {
                var r = response;
                currentQuote = r.newslist[0].content;
                currentAuthor = r.newslist[0].mrname;
                $('#tweet-fb').attr('href', tweetURL(currentQuote, currentAuthor));
                // $('#tumblr-fb').attr('href', tumblrURL(currentQuote, currentAuthor));
                $(".quote-text").animate({ //处理展示动态效果
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#text').text(currentQuote);
                    });
                $(".quote-author").animate({ //处理展示动态效果
                        opacity: 0
                    }, 500,
                    function () {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#author').html(currentAuthor);
                    });
                var color = Math.floor(Math.random() * colors.length);
                $("html body").animate({
                    backgroundColor: colors[color],
                    color: colors[color]
                }, 1000);
                $(".button").animate({
                    backgroundColor: colors[color]
                }, 1000);
            }
        });
    }

    $(document).ready(function () {
        getQuote();
        $('#new-quote').on('click', getQuote);
    });
};