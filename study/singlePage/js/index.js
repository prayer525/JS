$(function(){
    var pageOption = {
        contentWrapper : '.content-wrap'
    }
    $.extend($.singlePage.option, pageOption);

    // GNB menu 
    $('.btn-toggle-menu').off('click').on('click', function(){
        if($(this).hasClass('show-menu')){
            $(this).removeClass('show-menu');
            $('html, body').removeClass('over-hidden');
            $('.content-wrap').removeClass('show-menu');
        }else{
            $(this).addClass('show-menu');
            $('html, body').addClass('over-hidden');
            $('.content-wrap').addClass('show-menu');
        }

        return false;
    });
    
    // custom scroll tab
    var tab1 = $('#custom-list').swipeTab({
        selIdx:2,
        pageNavigation:$('#custom-list-navi'),
        moveEnd : function(idx){
            console.log('move end callback : ' , idx)
        }
    });

    $('.btn-execution').off('click').on('click', function(){
        var idx = $('#moveIdx').val();
        tab1.moveTab(idx)
    })

    var tab2 = $('#custom-list2').swipeTab({
        selIdx:1
    });
})