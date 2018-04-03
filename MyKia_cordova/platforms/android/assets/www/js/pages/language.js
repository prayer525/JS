fnList.pageLanguage = function(){
    var UserInfo = Data.getData('UserInformation');
    var marketId = UserInfo.MarketId;
    var wasTraslationCode = Data.get('Translations');
    var languageCode = Data.get('LanguageCode');

    function fnInitList(){
        var supportList=[];
        var langGroup = {
            "KMSW":[{
                title:"Svenska-Sverige",
                culturecode:"sv-SE",
                open:true
            }],
            "KMIT":[{
                title:"Italiano-Italia",
                culturecode:"it-IT",
                open:true
            }],
            "KMBE":[{
                title:"Français-Belgique",
                culturecode:"fr-BE",
                open:true
            },{
                title:"Nederlands-België",
                culturecode:"nl-BE",
                open:true
            }],
            "KMCZ":[{
                title:"Čeština-Česká Republika",
                culturecode:"cs-CZ",
                open:true
            }],
            "KMAT":[{
                title:"Deutsch-Österreich",
                culturecode:"de-AT",
                open:true
            }],
            "KMDE":[{
                title:"Deutsch-Deutschland",
                culturecode:"de-DE",
                open:true
            }],
            "KMES":[{
                title:"Español-España",
                culturecode:"es-ES",
                open:true
            }],
            "KMFR":[{
                title:"Français-France",
                culturecode:"fr-FR",
                open:true
            }],
            "KMIT":[{
                title:"Italiano-Italia",
                culturecode:"it-IT",
                open:true
            }],
            "KMHU":[{
                title:"Magyar-Magyarország",
                culturecode:"hu-HU",
                open:true
            }],
            "KMPL":[{
                title:"Polski-Polska",
                culturecode:"pl-PL",
                open:true
            }],
            "KMSK":[{
                title:"Slovenčina-Slovensko",
                culturecode:"sk-SK",
                open:true
            }],
            "KMSE":[{
                title:"Svenska-Sverige",
                culturecode:"sv-SE",
                open:true
            }]
        }

        if(marketId != 'KMBE'){
            supportList.push(
                {
                    title:"English",
                    culturecode:"en-IE",
                    open:true
                }
            );
        }

        $.each(langGroup[marketId], function(i, v){
            supportList.push(
                {
                    title:v.title,
                    culturecode:v.culturecode,
                    open:v.open
                }
            );
        })

        // make language list
        $.each(supportList,function(idx, item){
            var li=$('<li class="hbox jc"></li>'),
            label=$("<label for='rd"+idx+"' class='flex'>"+item.title+"</label>"),
            input=$("<input type='radio' name='rd01' data-culturecode='"+item.culturecode+"' id='rd"+idx+"'/>");
            li.append(label).append(input);
            $("#language-list").append(li);
        });

        // select language
        $("#language-list input").click(function(){
            languageCode = $(this).data('culturecode');
            var params = {
                "CultureCode" : languageCode
            }

            getApi('TranslationList', params, function(data){
                var translation = {}

                $.each(data.Translations, function(k, j){
                    for(var k in j){
                        translation[k] = j[k];
                    }
                });

                Data.set('Translations', translation);

                changeLang();
            })
        });

        $('#language-save').click(function(){
            Data.set('LanguageCode', languageCode);
            wasTraslationCode = Data.get('Translations');
        });

        $('.back').click(function(){
           Data.set('Translations', wasTraslationCode);

           changeLang();
        });
    }

    fnInitList();
}


