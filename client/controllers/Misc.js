angular.module("ClassRoom").factory("Misc", ['$window',
    function($window){
        return{
            popup: function(url){
              var newwindow= $window.open(url,'_blank','height=600,width=800');
              if ($window.focus) {newwindow.focus()}
              return false;
            }
            /*
            checkValueEqual: function(v1, v2){
                if(v1 == v2)
                    return true;
                return false;
            }*/

        };
    }
]);
