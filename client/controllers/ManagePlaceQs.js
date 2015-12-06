angular.module("ClassRoom").controller("ManagePlaceQsCtrl", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.heading = {title: 'Manage Place and Questions'};

        // first part, return all activities and do things with them
        $meteor.subscribe("activities").then(function(){
            $scope.activities = $meteor.collection(function(){
                return Activity.find();
            }, false);
        });

        $scope.getActivityName = function(activityId){
            var result = $filter('filter')($scope.activities, {_id:activityId});
            if(typeof result === "undefined") return "";
            if(result.length > 0){
                return result[0].name;
            }
            return false;
        };

        $scope.addActivity = function(){
            Activity.insert({name: "New Activity", description: "", teachers: [], students: [], questions: []});
        };

        // second part, return all activities, then get details on a clicked activity
        // can also add remove questions for that activity


        $scope.activityId = $stateParams.activityId;
        $meteor.subscribe("activities").then(function(){
            if($stateParams.activityId)
                $scope.activity = $meteor.object(Activity, $stateParams.activityId);
            else
                $scope.activity = null;
        });

        // get all questions related to that activity
        $meteor.subscribe("questions").then(function(){
            if($stateParams.activityId){
                $scope.questions = $meteor.collection(function(){
                    return Question.find({"activity" : $stateParams.activityId});
                }, false);
            }
            else{
                $scope.questions = null;
            }
        });

        $scope.removeActivity = function(activityId){
            // remove all questions related to that activity
            // do a meteor call apparently for this to work
            Meteor.call("removeActivityQuestions", activityId);
            Activity.remove({_id: activityId});
            if (!location.origin)
                location.origin = location.protocol + "//" + location.host;
            window.location.href = location.origin + "/managePlacenQs";
        };

        $scope.addQuestion = function(){
            var choice = [
                {index: 0, content: ""},
                {index: 1, content: ""},
                {index: 2, content: ""},
                {index: 3, content: ""}
            ];
            var question = {activity:$stateParams.activityId,
                tips: null,
                prompt: "Enter your question here",
                hint_image: null,
                difficulty: 0,
                type: 0,
                numChoices: 2,
                choices: choice,
                answer: 0};
            Question.insert(question);
        };

        $scope.removeQuestion = function(questionId){
            Question.remove({_id: questionId});
        };

        // third part, show question detail for a question clicked above
        // edit question type, choices, etc
        // add tips (place), how to get there etc.

        $scope.questionId = $stateParams.questionId;
        $scope.question = null;
        $meteor.subscribe("questions").then(function(){
            if($stateParams.questionId){
                $scope.question = $meteor.object(Question, $stateParams.questionId);
            }
            else{
                $scope.question = null;
            }
        });

        $scope.choiceNumOptions = [
            {name: '2', value: 2},
            {name: '3', value: 3},
            {name: '4', value: 4}
        ];

        // in case for example,
        // there are 4 answers, answer is D (3)
        // then admin change num of choices to two
        // answer becomes A (0) by default
        $scope.onChoiceNumChange = function(){
            if($scope.question.answer >= $scope.question.numChoices){
                $scope.question.answer = 0;
            }
            $scope.question.tips = null;
        };

        $scope.typeOptions = [
            { name: 'MC', value: 0 },
            { name: 'Text Response', value: 1 },
            { name: 'Photo Upload', value: 2 },
            { name: 'Video Upload', value: 3 },
            { name: 'Audio Upload', value: 4 }
        ];

        $scope.difficultyOptions = [
            {name: 'Low', value: 0},
            {name: 'Medium', value: 1},
            {name: 'High', value: 2}
        ];

        $scope.answerOptions = [
            {name: "1", value:0},
            {name: "2", value:1}
        ];

        $scope.getAnswerOptions = function(){
            // prevent digest overflow by returning the same thing if numchoices is same as current length
            if($scope.answerOptions.length == $scope.question.numChoices){
                return $scope.answerOptions;
            }
            // apparently javascript thinks that ({name:"1"} != {name:"1"})
            var result = [
                {name: "1", value:0},
                {name: "2", value:1}
            ];
            // get num of choices then show appropriate options
            if($scope.question.numChoices > 2){
                result.push({name: "3", value:2});
            }
            if($scope.question.numChoices > 3){
                result.push({name: "4", value:3});
            }
            $scope.answerOptions = result;
            return $scope.answerOptions;
        };

        $scope.createTips = function(newTips){
            var tips = {
                name: newTips.name,
                direction: newTips.direction
            };
            Tips.insert(tips, function(err, docsInserted){
                Question.update({_id: $scope.question._id}, {$set: {tips: docsInserted}});
            });
            location.reload();
        };

        $meteor.subscribe("tips").then(function(){
            if($scope.question.tips){
                $scope.activeTips = $meteor.object(Tips, $scope.question.tips);
            }
            else{
                $scope.activeTips = null;
            }
        });

        // question details
        //$meteor.subscribe("questions").then(function(){
        //    if($stateParams.placeId){
        //        var placeQuestions = Place.findOne({"_id" : $stateParams.placeId}, { questions: 1});
        //        placeQuestions = placeQuestions.questions;
        //        $scope.questions = $meteor.collection(function(){
        //            return Question.find({"_id" : {$in : placeQuestions}});
        //        }, false);
        //        console.log($scope.questions);
        //    }
        //    else{
        //        $scope.questions = null;
        //    }
        //    //$scope.questions = $meteor.collection(function(){
        //    //    return Question.find();
        //    //});
        //});


        $scope.getPlaceName = function(placeId){
            var result = $filter('filter')($scope.places, {_id:placeId});
            if(typeof result === "undefined") return "";

            if(result.length > 0){
                return result[0].name;
            }
            return false;
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
            Place.remove({_id: placeId});
        }
    }
]);
