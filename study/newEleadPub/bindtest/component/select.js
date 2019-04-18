

define(function() {
    
    /**
     * public method 정의 
     */
    var select = {
        update: dataUpdate
    }
    
    /**
     * 양방향 bind 업데이트
     */
    function dataUpdate(container) {
        
        $('[data-select^="' + container + '"]')
        
        // view에 데이터 바인딩한다.
        .each(function(i, e) {
            var  $this = $(e)
                ,key = $this.data('select')
                ,bindData = $.kia[key]
                ,str = ''
            
           
            if ($.isArray(bindData)) {
                bindData.forEach(function(data, i) {
                    str += '<option value="' + data.value + '">' + data.key + '</option>'
                })
                $this.html(str)
            }
            
        })

        // model에 데이터 바인딩 힌다.
        .on('change', function(e) {
            
        }) 
    }

    return select;
})
