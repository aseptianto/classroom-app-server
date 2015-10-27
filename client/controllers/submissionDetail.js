angular.module("ClassRoom").controller("SubmissionDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.stuId = $stateParams.stuId;
    /*
    $meteor.subscribe('submissions').then(function(){
        $scope.submissions = $meteor.object(Meteor.users, $scope.stuId, false).submissions;
    });
    */


        $meteor.subscribe("users").then(function(){

            $scope.stu = $meteor.object(Meteor.users, $scope.stuId, false);
            console.log($scope.stu);
        });

        $meteor.subscribe("submissions").then(function(){

            $scope.submissions = $meteor.collection(function(){
                return Submission.find({"_id":{"$in":$scope.stu.submissions}});
            }, false);

        });

        $meteor.subscribe("questions");

        $scope.getQuestion = function(objId){
            var q = Question.findOne({'_id':objId});
            return q.prompt;
        };
    }
]);
