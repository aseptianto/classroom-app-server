angular.module("ClassRoom").controller("ManagePlaceQsCtrl", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.heading = {title: 'Manage Place and Questions'};

        $meteor.subscribe("sessions").then(function(){
            $scope.sessions = $meteor.collection(function(){
                return Session.find();
            }, false);
        });

        $scope.sessionId = $stateParams.sessionId;
        $scope.placeId = $stateParams.placeId;
        $meteor.subscribe("sessions").then(function(){
            if($stateParams.sessionId)
                $scope.session = $meteor.object(Session, new Mongo.ObjectID($stateParams.sessionId));
            else
                $scope.session = null;
        });

        $meteor.subscribe("places").then(function(){
            if($stateParams.sessionId){
                var sessionPlaces = Session.findOne({"_id" : new Mongo.ObjectID($stateParams.sessionId)}, { places: 1});
                sessionPlaces = sessionPlaces.places;
                $scope.places = $meteor.collection(function(){
                    return Place.find({"_id" : {$in: sessionPlaces}});
                }, false);
                console.log($scope.places);
            }
            else{
                //$scope.places = $meteor.collection(function(){
                //    return Place.find();
                //}, false);
                $scope.places = null;
            }
        });

        $meteor.subscribe("questions").then(function(){
            if($stateParams.placeId){
                var placeQuestions = Place.findOne({"_id" : new Mongo.ObjectID($stateParams.placeId)}, { questions: 1});
                placeQuestions = placeQuestions.questions;
                $scope.questions = $meteor.collection(function(){
                    return Question.find({"_id" : {$in : placeQuestions}});
                }, false);
                console.log($scope.questions);
            }
            else{
                $scope.questions = null;
            }
            //$scope.questions = $meteor.collection(function(){
            //    return Question.find();
            //});
        });

        $scope.save = function(){
            $scope.places.save();
        };

        $scope.getSessionName = function(sessionId){
            var result = $filter('filter')($scope.sessions, {_id:sessionId});
            if(typeof result === "undefined") return "";
            if(result.length > 0){
                return result[0].name;
            }
            return false;
        };

        $scope.getPlaceName = function(placeId){
            var result = $filter('filter')($scope.places, {_id:placeId});
            if(typeof result === "undefined") return "";

            if(result.length > 0){
                return result[0].name;
            }
            return false;
        };

        // Editor options.
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
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

        $scope.getPlaceDetails = function(placeID){
            alert(placeID);
        };

        $scope.removePlace = function(placeId){
            Place.remove({_id: new Mongo.ObjectID(placeId)});
        }
    }
]);
