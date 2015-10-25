angular.module("ClassRoom").controller("PlacesCtrl", ['$scope', '$meteor',
    function($scope, $meteor){
        $scope.heading = {title: 'Manage Place'};

        $scope.places = $meteor.collection(Place).subscribe('places');

        $scope.save = function(){
            $scope.places.save();
        };


        $scope.map = {
            center: {
                latitude: 22.319149,
                longitude: 114.155440
            },
            zoom: 10,
            events: {},
            marker: {}
        };

        $scope.createPlace = function(newPlace){
            Place.insert(
                {
                    name: newPlace.name,
                    questions: [],
                    location: {
                        center: {
                            latitude: 22.319149,
                            longitude: 114.155440
                        },
                        zoom: 10,
                        events: {}
                    },
                    direction: ""
                }
            );
        };

        $scope.removePlace = function(placeId){
            Place.remove({_id: new Mongo.ObjectID(placeId)});
        }
    }
]);
