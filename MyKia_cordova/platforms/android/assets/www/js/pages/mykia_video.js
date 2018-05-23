fnList.pageMyKiaVideo = function(){
    console.log('pageMyKiaVideo')
    var playVideoId, player;
    var params = {
        'CustomerId' : Data.getData('Login').CustomerId
    }

    getApi('NewsListVideo', params, fnMakeList);

    function fnMakeList(data){
        Data.setData('NewsListVideo', data);

        var videoTemp = $('#video-list').find('li');

        $('#video-list').html('');

        $.each(data.Video, function(idx,item){
            var video = JsUtil.getVideo(item.VideoUrl);
            var temp = $(videoTemp).clone();

            temp.find('img').attr('src', video.thumbnailUrl);
            temp.find('p').text(item.VideoTitle);
            temp.data('url', item.VideoUrl);
            temp.data('NewsRead', item.NewsRead);
            temp.data('newsId', item.NewsId);
            temp.data('list', video.list);
            temp.data('videoId', video.videoId);

            $('#video-list').append(temp);
        });

        $('#video-list').find('li').click(function(){
            if(!$(this).data('NewsRead')){
                var params = {
                    'CustomerId' : Data.getData('Login').CustomerId,
                    'NewsCategory' : 3,
                    'NewsId' : $(this).data("newsId")
                }

                getApi('NewsRead', params, function(){
                    $(this).data("NewsRead", true);
                    Data.apiData.Login.Notification.How2VideoCnt--;
                    Data.put();

                    showYoutubeVideo($(this))
                })
            }else{
                showYoutubeVideo($(this))
            }
        });
    }

    var player;        
    function showYoutubeVideo(_temp){
        var temp = _temp;
        var targetId = 'youtube-player'+temp.index();
        var player_wrap = temp.find('.youtube-player');
        var player_frame = $('<div></div>').attr('id', targetId);

        hideYoutubeVideo();

        if(!temp.hasClass('on')){
            temp.addClass('on');

            player_wrap.append(player_frame);

            player_wrap.slideDown(500, function(){
                player = new YT.Player(targetId, {
                    height: '200px',
                    width: '100%',
                    playerVars: { 'list': temp.data('list'),'autoplay': 1},
                    videoId: temp.data('videoId'),
                    events: {
                    }
                });
            });
        }
    }

    function hideYoutubeVideo(){
        if(player != null && player != ''){
            player.clearVideo();
            player.destroy();
            player = null;
        }

        $('#video-list').find('li.on .youtube-player').slideUp(500, function(){
            $(this).html('');
            $(this).parent('li').removeClass('on');
        });
    }

    /* show search area */
    $('#srchOpen').click(function(){
        hideYoutubeVideo();

        $('.search-area-top').removeClass('none')
    });

    /* hide search area */
    $('#srchClose').click(function(){
        hideYoutubeVideo();

        $('#srchVal').val('');
        $('#video-list li').removeClass('none');
        $('.result-none').addClass('none');
        $('.search-area-top').addClass('none');
    });

    /* input search text */
    $('#srchVal').on('keyup', function(){
        var _searchTxt = ($(this).val()).toLowerCase();

        if(_searchTxt.length > 0){
            $('.btn-cancel').removeClass('none');
        }else{
            $('.btn-cancel').addClass('none');
        }

        /* list filter*/
        $.each($('#video-list li'), function(idx, li){
            var _title = $(li).find('p').text().toLowerCase();

            if(_title.indexOf(_searchTxt) > -1){
                $(li).removeClass('none')
            }else{
                $(li).addClass('none')
            }
        });

        /* toggle no result */
        if($('#video-list li:not(.none)').length == 0){
            $('.result-none').removeClass('none');
        }else{
            $('.result-none').addClass('none');
        }
    });

    /* remove search text */ 
    $('.btn-cancel').click(function(){
        $('#srchVal').val('');
        $('.result-none').addClass('none');
        $('#video-list li').removeClass('none')
    })
}


