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
            }, false);

            //console.log($scope.submissions);
        });

        $scope.setTeacherResponse = function(submissionId, type, detail){
            Meteor.call('setTeacherResponse', submissionId, type, detail);
        };

    }
]);
