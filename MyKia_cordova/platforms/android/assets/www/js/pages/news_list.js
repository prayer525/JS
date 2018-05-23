fnList.pageNewsList = function(){
    var initialPage = 0, offset = 0, pageSize = 4, newsSize = 0;
    var arrMagazineCategory = ["", "MC_01", "MC_02", "MC_03", "MC_04"];

    function fnReqNews(){
        var params = {
            'CustomerId' : Data.getData('Login').CustomerId,
            'InitialPage' : initialPage,
            'Offset' : offset,
            'PageSize': pageSize
        }

        getApi('NewsListV2', params, function(data){
            newsSize = data.NewsRecordsFiltered;
            var newsList = data.News;
            var campaignList = data.Campaigns;

            fnMakeNewsList(newsList);
            fnMakeCampaignList(campaignList);
        });
    }

    function fnMakeNewsList(newsList){
        var newsDate, hasRead='';
        var newsTemp = $('<li><a href="#"><div class="thum"></div><p></p><i><span></span></i></a></li>');

        $.each(newsList, function(k, value){
            var _temp = newsTemp.clone();
            newsDate = JsUtil.fnMomentDate(value.NewsDate, 'LL');

            if (value.NewsRead == true) {
                hasRead = 'has-read';
            }else{
                hasRead = '';
            }

            _temp.data('news', value.NewsId).data('category', value.NewsCategory).addClass(hasRead);
            _temp.find('.thum').css({
                'background-image':'url('+value.NewsImageUrl+')'
            })
            _temp.find('p').text(value.NewsTitle);
            _temp.find('i').text(newsDate);
            _temp.find('i').prepend($('<span>'+i18n(arrMagazineCategory[value.MagazineCategory], 'text')+'</span>'));

            $('#news-list').append(_temp);
        });
    }

    function fnMakeCampaignList(campaignList){
        var campaignDate, hasRead='';
        var campaignTemp = $('<div class="swiper-slide"><button><img src=""><p></p></button></div>');

        $.each(campaignList, function(k, value){
            var _temp = campaignTemp.clone();
            campaignDate = JsUtil.fnMomentDate(value.NewsDate, 'LL');

            if (value.NewsRead == true) {
                hasRead = 'has-read';
            }else{
                hasRead = '';
            }

            _temp.data('news', value.NewsId).data('category', value.NewsCategory).addClass(hasRead);
            _temp.find('img').attr('src', value.NewsImageUrl);
            _temp.find('p').text(value.NewsTitle);

            $('.swiper-wrapper').append(_temp);
        })

        // create swiper
        if (campaignList.length == 0) {
            var noResult = '<div class="result-none-campaign"><p>'+i18n('D1_18', 'text')+'</p></div>'
            $(".swiper-wrapper").html(noResult);
            $(".btn-see-all").hide();
        }else{
            // 프로모션이 2개 이상일때만 swipe
            var slideCounter = 3
            if($(window).innerWidth() > 500) {
                slideCounter = 4
            }else if($(window).innerWidth() > 600) {
                slideCounter = 5
            }

            if(campaignList.length > 2){
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: slideCounter,
                    paginationClickable: true,
                    spaceBetween: 10
                });
            }
        }
    }

    function fnCheckHasRead(_target){
        console.log('click')
        var _newsId = _target.data('news');
        var _newsCategory = _target.data('category');

        // check has read
        if($(this).hasClass('has-read')){
            Data.setData('newsId', _newsId);
            // move to news detail page
            $.mobile.changePage( 'news_detail.html', { transition: 'slide'} );
        }else{
            var params = {
                'CustomerId' : Data.getData('Login').CustomerId,
                'NewsCategory' : _newsCategory,
                'NewsId' : _newsId
            }

            getApi('NewsRead', params, function(data){
                // Badge count modify
                Data.apiData.Login.Notification.SalesNProCnt--

                Data.setData('newsId', _newsId);
                // move to news detail page
                $.mobile.changePage( 'news_detail.html', { transition: 'slide'} );
            });
        }
    }

    $('.tit-campaign').text(i18n('B1_40', 'text'))
    
    $('#news-list').on('click', 'li', function(){ fnCheckHasRead($(this)) });

    $('.swiper-wrapper').on('click', '.swiper-slide', function(){ fnCheckHasRead($(this)) });

    // read more function
    $(".btn-more-news").click(function(){
        var params = {
            'CustomerId' : Data.getData('Login').CustomerId,
            'InitialPage' : ++initialPage,
            'Offset' : ++offset,
            'PageSize': pageSize
        }

        console.log('req news params : ' , params);

        getApi('NewsListV2', params, function(data){
            var newsList = data.News;

            fnMakeNewsList(newsList);
        });

        if(offset * pageSize >=  newsSize){
            $(this).hide();
        }
    });

    fnReqNews();
}


