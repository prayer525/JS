fnList.pageContactUs = function(){
    $('.contact_type_btn>li>a').on('click', function(){
        $('.contact_type_btn div').css('visibility', 'hidden');

        $(this).next('div').css('visibility', 'visible');

        return false;
    })

    $('.btn_phone>a').attr("href", "tel:"+i18n("W0_phone", "text"))
    $('.btn_phone>a>strong').text(i18n("W0_phone", "text"))
    //$(".btn_phone>a").data(Scheme.PhoneNumber,i18n("W0_phone", "text"));
    $(".btn_phone>a").click(function(){
        directCall($(this).text())
    });

    $('.btn_email>a').attr("href", "mailTo:"+i18n("W0_email", "text"))
    $('.btn_email>a>strong').text(i18n("W0_email", "text"))
    //$(".btn_email>a").data(Scheme.Email,i18n("W0_email", "text"));
    $(".btn_email>a").click(function(){
        // Direct Email
    });
}


