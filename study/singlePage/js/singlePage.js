(function( $, undefined ) {
    $.singlePage = {}

    $.extend( $.singlePage, {
		// define the window and the document objects
		window: $( window ),
        document: $( document ),
        pageMove:function(e){
            
        },
        getPage:function(e){

        },
        createPage:function(e){

        }
    });

    $(document).off('click', '[data-href]').on('click', '[data-href]', function(){
        console.log($(this).data())

        $.singlePage.pageMove($(this));

        return false;
    })
})( jQuery );

