angular.module("ClassRoom").controller("SubmissionDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.stuId = $stateParams.stuId;
        $meteor.subscribe('submissionDetail', $scope.stuId).then(function(){
          $scope.submissions = $meteor.object(Meteor.users, $scope.stuId, false).submissions;
        });;
    }
]);
