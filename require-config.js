/**
  *
 * @ Develop Desc 		: 1. requirejs 의존성 설정
 * @ Author 			: Justin Jang (<a mailto="prayer525@gmail.com">prayer525@gmail.com</a>)
 * @ Version 			: Release 1.0
 * @ Develop Date 		: 15 SEP 2016
 * @ Change History 	: 23 AUG 2016 - initial
 */

/**
 * requirejs 설정
 * 모듈 의존성 정의을 한다.
 */
(function(){

	'use strict';

	require.config({
		paths: {
			 'jquery': ['bower_components/jquery/dist/jquery.min'],
			 'bootstrap': ['bower_components/bootstrap/dist/js/bootstrap.min'],
			 'highlight':['javascripts/highlight'],
			 // 'moment':['bower_components/moment/min/moment.min'],
			 // 'datetimepicker':['bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min'],
			 // 'dataTable':['bower_components/datatables/jquery.dataTables.min'],
			 // 'dataTableBoot':['bower_components/datatables/dataTables.bootstrap.min'],
			 // 'sortable':['js/jquery.sortable'],
			 // 'textEditor':['bower_components/summernote/dist/summernote'],
			 'main': ['javascripts/main']
		},
		shim: {
			'bootstrap': ['jquery']
			// 'common':['jquery'],
			// 'sortable':['jquery'],
			// 'dataTableBoot':['dataTable']
		},
		baseUrl: './'
	});
	// , "cordova",  'moment', 'datetimepicker', 'dataTable', 'dataTableBoot', 'textEditor', 'bootstrap', 'moment', 'datetimepicker'
	require(['jquery','bootstrap','highlight'], function(){
		require(['main']);
		// require(['sortable'], function(){
		// 	require(['common']);
		// })
	});

}).call(this);
