angular.module("ClassRoom").controller("recordsByStudentsDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.stuId = $stateParams.stuId;
        $scope.activityId = $stateParams.activityId;

        $meteor.subscribe("users").then(function(){
            $scope.students = $meteor.collection(function(){
                return Meteor.users.find({_id: $scope.stuId});
            }, false);
        });

        $meteor.subscribe("activities").then(function(){
            $scope.activities = $meteor.collection(function(){
                return Activity.find({_id: $scope.activityId});
            }, false);
        });

        $meteor.subscribe("questionsByActivity", $scope.activityId).then(function(){
            $scope.questions = $meteor.collection(function(){
                return Question.find({}, {sort: {order: 1}});
            }, false);

            //console.log($scope.questions);
        });


        $meteor.subscribe("submissions", $scope.stuId, $scope.activityId);

        $scope.getSubmissionAns = function(questionId){
            var submission = Submission.findOne({'question':questionId});
            if(submission){
                return submission.data;
            }
            else {
                return "";
            }
        };

        $scope.checkAnswer = function(question, submission){
            if(question.answer == submission.data.content)
                return true;
            return false;
        };
    }
]);
