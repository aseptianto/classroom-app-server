angular.module("ClassRoom").controller("HomeCtrl", ['$scope', '$meteor',
    function($scope, $meteor){
        $scope.heading = {title: 'Welcome Message',
                            title_zh: '歡迎'};
    }
]);
