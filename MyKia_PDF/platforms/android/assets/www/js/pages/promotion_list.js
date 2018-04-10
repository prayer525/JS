fnList.pagePromotionList = function(){
    var params = {
        'CustomerId' : Data.getData('Login').CustomerId
    }

    getApi('NewsList', params, fnMakeList);


    function fnMakeList(data){
        console.log('data : ' , data)
        var promotionTemp = $('<li><button><p class="ellipsis"></p><p class="date"></p></button></li>');
        var newsList = sortList(data.News);

        $.each(newsList, function(key, value){
            console.log('value.NewsCategory : ' , value.NewsCategory)
            if(value.NewsCategory == 1){
                var _temp = promotionTemp.clone();

                _temp.data('newsId', value.NewsId).data('isRead', value.NewsRead)
                _temp.find('.ellipsis').html(value.NewsTitle);
                _temp.find('.date').html(JsUtil.fn);

                if(value.NewsRead){
                    _temp.addClass('has-read');
                    _temp.find('button').addClass('read');
                }

                $('#promotion-list').append(_temp)
            }
        })
    }

    function fnCheckHasRead(_target){
        console.log('click')
        var _newsId = _target.data('news');

        // check has read
        if($(this).hasClass('has-read')){
            Data.setData('newsId', _newsId);
            // move to news detail page
            $.mobile.changePage( 'news_detail.html', { transition: 'slide'} );
        }else{
            var params = {
                'CustomerId' : Data.getData('Login').CustomerId,
                'NewsCategory' : 1,
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

    // news 날짜순 정렬
    function sortList(list) {
        list.sort(function(a, b) {
            if (a.NewsDate > b.NewsDate) {
                return -1;
            }
            return 1;
        })
        return list;
    }

    $('#promotion-list').on('click', 'li', function(){ fnCheckHasRead($(this)) });
}


