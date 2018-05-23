fnList.pageSelectCountry = function(){
	function gfnInitList(){
		var supportList=[];
		supportList.push(
			{
				title:"België",
				culturecode:"nl-BE",
				marketid:"KMBE",
				open:true
			}
		);
		supportList.push(
			{
				title:"Belgique",
				culturecode:"fr-BE",
				marketid:"KMBE",
				open:true
			}
		);
		supportList.push(
			{
				title:"Luxembourg",
				culturecode:"fr-LU",
				marketid:"KMBE",
				open:true
			}
		);
		supportList.push(
			{
				title:"Česká Republika",
				culturecode:"cs-CZ",
				marketid:"KMCZ",
				open:true
			}
		);
		supportList.push(
			{
				title:"Deutschland",
				culturecode:"de-DE",
				marketid:"KMDE",
				open:true
			}
		);
		supportList.push(
			{
				title:"España",
				culturecode:"es-ES",
				marketid:"KMES",
				open:true
			}
		);
		supportList.push(
			{
				title:"France",
				culturecode:"fr-FR",
				marketid:"KMFR",
				open:true
			}
		);
		supportList.push(
			{
				title:"Ireland",
				culturecode:"en-IE",
				marketid:"KMIE",
				open:true
			}
		);
		supportList.push(
			{
				title:"Italia",
				culturecode:"it-IT",
				marketid:"KMIT",
				open:true
			}
		);
		supportList.push(
			{
				title:"Magyarország",
				culturecode:"hu-HU",
				marketid:"KMHU",
				open:true
			}
		);
		supportList.push(
			{
				title:"Österreich",
				culturecode:"de-AT",
				marketid:"KMAT",
				open:true
			}
		);
		supportList.push(
			{
				title:"Polski",
				culturecode:"pl-PL",
				marketid:"KMPL",
				open:true
			}
		);
		supportList.push(
			{
				title:"Slovensko",
				culturecode:"sk-SK",
				marketid:"KMSK",
				open:true
			}
		);
		supportList.push(
			{
				title:"Sverige",
				culturecode:"sv-SE",
				marketid:"KMSE",
				open:true
			}
		);
		
		// display list
		// 리스트를 화면에 표시한다.
		[].forEach.call(supportList,function(item,idx){
			var li=$('<li class="hbox jc" data-role="none"></li>'),
				label=$('<label for="country-rd'+idx+'" class="flex" data-role="none">'+item.title+'</label>'),
				input=$('<input type="radio" name="country-rd" data-role="none" data-culturecode="'+item.culturecode+'" id="country-rd'+idx+'" data-marketid="'+item.marketid+'"/>');
			li.append(label).append(input);
			$('#country-list').append(li);
		});

		// when selected a country
		// 국가 선택 시
		$('#country-list input').each(function(i,item){
			$(item).on('click', function(){
				$('.btn-select-country').removeClass('off');
				// $('.btn-select-country').prop('disabled',false);

				var languageCode = $(this).data('culturecode');

				Data.set('cultureCode', languageCode)

				if(languageCode == 'de-DE'){
					Data.set('serverFlag', 'KMD');
				}else{
					Data.set('serverFlag', 'EU');
				}

				Data.set('targetServer', checkServer());

				gfnSend(languageCode);
			});
		});
	}

	function gfnSend(languageCode){
		var params = {
			"CultureCode" : languageCode
		}

		getApi('TranslationList', params, selCountry)
	}

	function selCountry(data){
		var translation = {}

		$.each(data.Translations, function(k, j){
			for(var k in j){
				translation[k] = j[k];
			}
		});

		Data.set('Translations', translation);

		changeLang();
	}

	$('.btn-select-country').click(function(){
		if($(this).hasClass('off')){
			return false;
		}
	})

	gfnInitList();
}

