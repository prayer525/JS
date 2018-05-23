fnList.pageNewsDetail = function(){
    console.log('News Detail');
    var hasCarousel = false, galleryData=[];
    var arrMagazineCategory = ["", "MC_01", "MC_02", "MC_03", "MC_04"];
    var _NewsTitle = $('<div class="news-title"><div class="news-content"><h2></h2><i></i><div class="news-text"><p></p></div></div><div class="news-title-back"></div></div>');

    function newsInit(){
        var newsId = Data.getData('newsId');

        var params = {
            'CustomerId' : Data.getData('Login').CustomerId,
            'NewsId' : newsId
        }

        getApi('NewsDetails', params, fnMakeDetail);
    }

    function fnMakeDetail(data){
        Data.setData('NewsDetails', data);

        var parsingNewsDetail = reParsing(data);

        _NewsTitle.find('h2').text( data.NewsTitle );
        _NewsTitle.find('.news-content i').text(i18n( arrMagazineCategory[data.MagazineCategory], 'text') )
        _NewsTitle.find('.news-text p').text(data.NewsText)
        _NewsTitle.find('.news-title-back').css('background-image', 'url('+data.NewsImageDetailUrl+')');

        $('.news-detail-wrap').append(_NewsTitle);

        $.each(parsingNewsDetail, function(idx,value){
            $('.news-detail-wrap').append($(convertNewsContent(value)))
        })

        // youtube player import
        $('img[data-video]').each(function() {
            $(this).on('load', function(){
                var url = $(this).data('video');
                var h = $(this).height();
                var targetId = 'player'+$(this).data('order');

                player = new YT.Player(targetId, {
                    height: h+'px',
                    width: '100%',
                    playerVars: { 'autoplay': 1},
                    videoId: $.trim(url),
                    events: {
                    }
                });
            });
        });

        /*
            Text Block 내부에 News Link가 있을 경우 처리
        */
        $('.text-block').find('a').not('.action').on('click', function(){
            var _url = $(this).attr('href');

            if(_url.indexOf('newsId=') > -1){
                var _newsId = _url.split('newsId=')[1];

                Data.setData('newsId', _newsId);

                newsInit();

                return false;
            }
        });

        // initial carousel
        if (hasCarousel) {
            initCarousel();
            $('.carousel-block').css('height', $('.carousel-item').first().css('height'));
        }

        // initial gallery
        if(galleryData.length>0){
            for(var i=0; i<galleryData.length; i++){
                initGallery(galleryData[i]);
                $('.gallery-block-'+i).css('height', $('.gallery-item').first().css('height'));
            }
        }


    }

    function convertNewsContent(content) {
        var  items
            ,str = ''
            ,activeClass = ''

        if (content.block == 'ImageGalleryBlocks') {
            items = content.Items;
            if (items.length < 1) {
                return str;
            }
            str += '<div class="gallery-block gallery-block-'+content.Order+'">';
            str += '    <ol class="gallery-indicators">';
            
            // paging
            for (var i in items) {
                if (i == 0) {
                    activeClass = 'class="active"'
                } else {
                    activeClass = ''
                }
                str += '    <li data-target="#gallery-example-generic" data-slide-to="' + i + '" ' + activeClass + '></li>'
            }
            str += '    </ol>'

            // controller
            str += '    <div id="touchSlider'+content.Order+'" class="swipe">';
            str += '        <ul class="gallery-item">';
            
            // gallery
            for (var i in items) {
                str += '            <li>';
                str += '                <div class="gallery-image"><img src="' + items[i].Image + '" alt=""></div>';
                str += '            </li>';
            }
            str += '        </ul>';
            str += '    </div>';
            str += '    <a class="gallery-con left" data-page="-1">';
            str += '        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
            str += '        <span class="sr-only">Previous</span>';
            str += '    </a>';
            str += '    <a class="gallery-con right" data-page="1">';
            str += '        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
            str += '        <span class="sr-only">Next</span>';
            str += '    </a>';
            str += '</div>';
            galleryData.push(content.Order);
            return str;
        }
        if(content.block == 'ImageRatioBlocks'){
            str += '<div class="image-ratio-block">';
            str += '    <img src="'+content.Image+'" />';
            str += '    <small>'+content.CreditText+'</small>';
            str += '</div>'

            return str;
        }
        if (content.block == 'VideoBlocks') {
            str += '<div class="video-block">';
            str += '<div id="player'+content.Order+'">';
            str += '    <img src="http://img.youtube.com/vi/' + getYoutubeId(content.VideoUrl) + '/hqdefault.jpg" data-video="'+getYoutubeId(content.VideoUrl)+'" data-order="'+content.Order+'">';
            str += '</div></div>';

            return str;
        }
        if (content.block == 'CarouselBlocks') {
            items = content.Items;
            if (items.length < 1) {
                return str;
            }
            str += '<div class="carousel-block">';
            str += '    <ol class="carousel-indicators">';
            
            // paging
            for (var i in items) {
                if (i == 0) {
                    activeClass = 'class="active"'
                } else {
                    activeClass = ''
                }
                str += '    <li data-target="#carousel-example-generic" data-slide-to="' + i + '" ' + activeClass + '></li>'
            }
            str += '    </ol>'

            // controller

            str += '    <div id="touchSlider" class="swipe">';
            str += '        <ul class="carousel-item">';
            
            // carousel
            for (var i in items) {
                str += '            <li>';
                str += '                <div class="carousel-image"><img src="' + items[i].Image + '" alt=""></div>';
                str += '                <div class="news-text">';
                str += '                    <div class="carousel-title">' + items[i].Title + '</div>';
                str += '                    <div class="carousel-text">' + items[i].Text + '</div>';
                str += '                </div>';
                str += '            </li>';
            }
            str += '        </ul>';
            str += '    </div>';
            str += '    <a class="carousel-con left" data-page="-1">';
            str += '        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
            str += '        <span class="sr-only">Previous</span>';
            str += '    </a>';
            str += '    <a class="carousel-con right" data-page="1">';
            str += '        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
            str += '        <span class="sr-only">Next</span>';
            str += '    </a>';
            str += '</div>';
            hasCarousel = true;
            return str;
        }
        if (content.block == 'TextBlocks') {
            content.Text = content.Text.replace(/\[bq\]/gi, '<blockquote>"');
            content.Text = content.Text.replace(/\[\/bq\]/gi, '"</blockquote>');
            content.Text = content.Text.replace(/\[title\]/gi, '<h3 class="title">');
            content.Text = content.Text.replace(/\[\/title\]/gi, '</h3>');
            
            str += '<div class="text-block theme-' + content.Theme + '">';
            str += '    <h2>' + content.Title + '</h2>';
            str += '    <div class="news-text">' + content.Text + '</div>';

            //if(content.ActionButton){
            if(content.ActionButton.ButtonText != '' && content.ActionButton.ActionURL != ''){
                str += '<a href="'+content.ActionButton.ActionURL+'" class="action">'+content.ActionButton.ButtonText+'</a>';
            }
            str += '</div>';
            
            return str;
        }
        if (content.block == 'ImageBlocks') {
            str += '<div class="image-block">';
            str += '    <div class="news-content">';
            str += '        <h2>' + content.Title + '</h2>';
            str += '        <div class="news-text">' + content.Text + '</div>';
            str += '    </div>';
            str += '    <div class="news-back" style="background-image: url(' + content.Image + '"></div>';
            str += '</div>';
            return str;
        }
        return str;
    }

    function reParsing(data) {
        var result = []
        for (var i in data) {
            if ($.isArray(data[i])) {
                if (data[i].length > 0) {
                    addBlockText(data[i], i)
                }
            }

        }
        return result.sort(function(a, b){
            return a.Order - b.Order
        })
        function addBlockText(obj, title) {
            for (var i in obj) {
                obj[i]['block'] = title;
                result.push(obj[i])
            }
        }
    }

    function initCarousel() {
        var total = $('.carousel-image').length
            ,current = 0

        $("#touchSlider").touchSlider({
            transition:false,
            initComplete : function (e) {
                var  _this = this
                    ,$this = $(this)
                $('[data-page]').on('click', function(e){
                    var pageStatus = $(this).data('page')
                    current += pageStatus
                    if (current == total) {
                        current = 0
                    } else if (current == 0) {
                        current = total
                    }
                    _this.go_page( current );
                })
            },
            counter : function (e) {
                var page = e.current - 1;
                current = page;
                $('[data-slide-to]').removeClass('active');
                $('[data-slide-to="' + page + '"]').addClass('active');
            }
        });

        $(".carousel-image img").bind('load', function() {
            var  controlerTop = ($('.carousel-image img').height() - $('.carousel-con').height() / 2)
                ,indicatorTop = ($('.carousel-image img').height() - 20)

            $('.carousel-con').css('top', controlerTop + 'px');
            $('.carousel-indicators').css('top', indicatorTop + 'px');
            getCarouselHeight();
        });

        function getCarouselHeight() {
            var  heights = []
                ,carouselHeight
            $('.carousel-block .news-text').each(function(){
                heights.push($(this).height())
            })
            carouselHeight = Math.max.apply(Math, heights) + $('.carousel-image img').height() + 20;
            $('.carousel-block').height( carouselHeight )
        }
    }

    // initial gallery
    function initGallery(num) {
        var parentBlock = ".gallery-block-"+num;
        var total = $(parentBlock +' .gallery-image').length
            ,current = 0

        $("#touchSlider"+num).touchSlider({
            transition:false,
            initComplete : function (e) {
                var  _this = this
                    ,$this = $(this)
                $('[data-page]').on('click', function(e){
                    var pageStatus = $(this).data('page')
                    current += pageStatus
                    if (current == total) {
                        current = 0
                    } else if (current == 0) {
                        current = total
                    }
                    _this.go_page( current );
                })
            },
            counter : function (e) {
                var page = e.current - 1;
                current = page;
                $('[data-slide-to]').removeClass('active');
                $('[data-slide-to="' + page + '"]').addClass('active');
            }
        });

        $(parentBlock+" .gallery-image img").bind('load', function() {
            var galleryHeight = $('.gallery-block .gallery-image img').height();
            $(parentBlock).height( galleryHeight )
        });
    }

    function getYoutubeId(url) {
        if(url.indexOf('v=') > -1){
            return url.split('v=')[1].split('&')[0]
        }else{
            var param = url.split('/')
            return param[param.length-1];
        }
    }

    function removeSpecificTag(str) {
        return str.replace(/<.?iframe.*\/iframe>/ig, '');
    }

    newsInit();
}


