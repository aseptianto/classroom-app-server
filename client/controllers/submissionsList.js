angular.module('ClassRoom').controller('SubmissionsCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.$meteorSubscribe('submissions').then(function(subscriptionHandle){
        $scope.submissions = $meteor.collection(Submissions);
    });

    $scope.$meteorSubscribe('users').then(function(subscriptionHandle){
      $scope.users = $meteor.collection(Meteor.users, false);
    });
}]);
