angular.module("ClassRoom").controller("recordsByActivitiesDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.activityId = $stateParams.activityId;

        $meteor.subscribe("activities").then(function(){
            $scope.activity = $meteor.collection(function(){
                return Activity.find({_id: $scope.activityId });
            }, false);
            console.log($scope.activity);
        });

        $meteor.subscribe("users").then(function(){
            $scope.students = $meteor.collection(function(){
                return Meteor.users.find();
            }, false);
        });

        $meteor.subscribe("questionsByActivity", $scope.activityId).then(function(){
            $scope.questions = $meteor.collection(function(){
                return Question.find({}, {sort: {order: 1}});
            }, false);

            //console.log($scope.questions);
        });

        $meteor.subscribe("submissionsByActivity", $scope.activityId).then(function(){
            $scope.submissions = $meteor.collection(function(){
                return Submission.find();
            }, true);

            //console.log($scope.submissions);
        });

        $scope.setTeacherResponse = function(submissionId, type){
            Meteor.call('setTeacherResponse', submissionId, type);
        };

        $scope.checkAnswer = function(question, submission){
            if(question.answer == submission.data.content)
                return true;
            return false;
        };
    }
]);
