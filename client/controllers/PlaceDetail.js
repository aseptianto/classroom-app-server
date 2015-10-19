angular.module("ClassRoom").controller("PlaceDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function ($scope, $stateParams, $meteor) {
        $scope.placeId = $stateParams.placeId;

        $scope.place = $meteor.object(Place, new Mongo.ObjectID($scope.placeId));
        $scope.place.subscribe("places");



        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            events: {}
        };
        var temp = $scope.place;
        console.log(temp);

        $scope.save = function(){
            $scope.place.save();
        };
    }
]);