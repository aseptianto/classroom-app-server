angular.module("ClassRoom").controller("recordsByActivitiesDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.activityId = $stateParams.activityId;


    }
]);
