

define(['component/utils'], function(util) {
    
    /**
     * public method 정의 
     */
    var dataBind = {
        update: dataUpdate
    }
    
    /**
     * 양방향 bind 업데이트
     */
    function dataUpdate(container) {

		return new Promise(function(resolve, reject){
			$('[data-bind^="' + container + '."]')
        
			// view에 데이터 바인딩한다.
			.each(function(i, e) {
				var  $this = $(e)
					,bindContainer = util.getContainer($this.data('bind'))
					,key = util.getKey($this.data('bind'))
					,bindData = $.kia[bindContainer]
				
				
				// <input type="text"> 일 경우
				if ($this.is('input[type="text"]')) {
					return $this.val($.kia[bindContainer][key]);    
				}

				// <div> 일 경우
				if ($this.is('div')) {
					return $this.html($.kia[bindContainer][key]);    
				}
			})

			// model에 데이터 바인딩 힌다.
			.on('change', function(e) {
				var  $this = $(e.currentTarget)
					,bindKey = $this.data('bind')
					,bindContainer = _getContainer(bindKey)
					,key = _getKey(bindKey)
					,value = $this.val()

				$.kia[bindContainer][key] = value
			})
		}).catch(function(err){
			console.error('error : ' , err)
		})
		
    }

    return dataBind;
})
