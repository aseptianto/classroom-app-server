angular.module("ClassRoom").controller("PlacesCtrl", ['$scope', '$meteor',
    function($scope, $meteor){
        $scope.heading = {title: 'Manage Place'};

        $scope.places = $meteor.collection(Place).subscribe('places');

        $scope.save = function(){
            $scope.places.save();
        };

        $scope.createPlace = function(newPlace){
            Place.insert({name: newPlace.name, questions: [], location: [], direction: ""});
            // Meteor.call('addSession', newSession);
        };
    }
]);
