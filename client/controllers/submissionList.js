angular.module('ClassRoom').controller('SubmissionsCtrl', ['$scope', '$meteor', '$window', function ($scope, $meteor, $window) {
    $scope.heading = {title: 'Submission Records'};

    $scope.$meteorSubscribe('submissions').then(function(subscriptionHandle){
        $scope.submissions = $meteor.collection(Submissions);
    });

    $scope.$meteorSubscribe('users').then(function(subscriptionHandle){
      $scope.users = $meteor.collection(Meteor.users, false);
    });

    $scope.popup = function(userId){
      var url = 'submissions/' + userId;
      var newwindow= $window.open(url,'_blank','height=600,width=800');
      if ($window.focus) {newwindow.focus()}
      return false;
    }
}]);
