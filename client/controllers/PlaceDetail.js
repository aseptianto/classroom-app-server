angular.module("ClassRoom").controller("PlaceDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function ($scope, $stateParams, $meteor) {
        $scope.placeId = $stateParams.placeId;

        $meteor.subscribe("places").then(function(){
            $scope.place = $meteor.object(Place, new Mongo.ObjectID($scope.placeId));
        });

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

        $meteor.subscribe("questions").then(function(){
            $scope.questions = $meteor.collection(function(){
                return Question.find({place: $scope.placeId});
            }, false);
        });

        $scope.addQ = function(newQ){

          Question.insert(
              {
                  place: $scope.placeId,
                  prompt: newQ.prompt,
                  choices: {
                    'type':0,
                  	'data':[newQ.choiceA,newQ.choiceB,newQ.choiceC,newQ.choiceD]
                  },
                  answer: newQ.answer
              }
          );
        };
    }
]);
