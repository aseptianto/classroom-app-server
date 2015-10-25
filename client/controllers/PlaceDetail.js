angular.module("ClassRoom").controller("PlaceDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function ($scope, $stateParams, $meteor) {
        $scope.placeId = $stateParams.placeId;

        $scope.place = $meteor.object(Place, new Mongo.ObjectID($scope.placeId));
        $scope.place.subscribe("places");

        /*
        we might need to do a change on the database
        location might be:
        location: {
            center: {
                latitude: 22.319149,
                longitude: 114.155440
            },
            zoom: 15,
            events: {}
        }
         */

        $scope.getGoogleMapsCoordinates = function(){
            console.log($scope.place);
            if(typeof $scope.place.location === "undefined") return $scope.map.center;
            var coordinates = {
                latitude: $scope.place.location[0],
                longitude: $scope.place.location[1]
            };
            console.log(coordinates);
            return coordinates;
        }

        $scope.map = {
            center: {
                latitude: 22.319149,
                longitude: 114.155440
            },
            zoom: 10,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    if (!$scope.place) return;

                    if (!$scope.place.location)
                        $scope.place.location = {};

                    $scope.place.location.latitude = originalEventArgs[0].latLng.lat();
                    $scope.place.location.longitude = originalEventArgs[0].latLng.lng();

                    $scope.$apply();
                }
            },
            marker: {
                options: {draggable: true},
                events: {
                    dragend: function (marker, eventName, args){
                        if(!$scope.place.location){
                            $scope.place.location = {};
                        }

                        $scope.place.location.latitude = marker.getPosition().lat();
                        $scope.place.location.longitude = marker.getPosition().lng();
                    }
                }
            }
        };



        $scope.save = function(){
            $scope.place.save();
        };
    }
]);