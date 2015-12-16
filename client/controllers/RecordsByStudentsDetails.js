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

        $scope.getSubmission = function(questionId){
            return Submission.findOne({'question':questionId});
        }

        $scope.getSubmissionAns = function(questionId){
            $scope.submission = $scope.getSubmission(questionId);
            if($scope.submission){
                return $scope.submission.data;
            }
            else {
                return "";
            }
        };

        $scope.setTeacherResponse = function(submissionId, type){
            if(type != -1){
                Submission.update({_id: submissionId}, {$set: {teacher_response: type}});
            }
        };


        $scope.checkAnswer = function(question){
            if(question.answer == $scope.getSubmissionAns(question._id))
                return true;
            return false;
        };

    }
]);
