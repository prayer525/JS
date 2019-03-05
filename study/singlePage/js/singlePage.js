(function( $, undefined ) {
    // python -m SimpleHTTPServer 8000

    /* 
        $.ajax : 링크가 걸린 페이지를 ajax로 불러오는 함수
        e = {
            url : 'data("href")'
            ...
        }
    */

    $.singlePage = {
        pageMove:function(e){
            console.log('getPage : ' , $.singlePage.getPage(e))
        },
        getPage:function(e){
            $('<div></div>').load(e.data('href') + ' > div', function(data){
                var content = $( $(this).html() );

                content.addClass('ui-page')
                
                $('body').append(content)
            });
        },
        createPage:function(e){
            console.log(typeof e)
            var el = $(e).find('body').html();

            console.log('e : ' , el)
        }
    };

    $.extend( $.singlePage, {
		// define the window and the document objects
		window: $( window ),
        document: $( document )
    });

    console.log('aa')
    $(document).off('click', '[data-href]').on('click', '[data-href]', function(){
        event.preventDefault();

        console.log('element click');

        $.singlePage.pageMove($(this));

        return false;
    })
})( jQuery );

