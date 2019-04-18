

define(function() {
    
    /**
     * public method 정의 
     */
    var util = {
        getContainer: getContainer,
        getKey: getKey
    }
    
    /**
     * private method
     */
    function getContainer(str) {
        return str.split('.')[0]
    }
    function getKey(str) {
        return str.split('.')[1]
    }

    return util;
})
