fnList.pageLicense = function(){
	var legalContent = Data.getData('GetLegalNotice');
	var legalType = Data.getData('licenseParam');
	var legalTitle = {
		"ContactUs"		: "S1_15",
		"TermsOfUse"	: "S1_16",
		"PrivacyPolicy"	: "S1_17"
	}

	$(".header > h1").text(i18n(legalTitle[legalType], 'text'));
	$("#contentIframe").html(legalContent[legalType]);
}


