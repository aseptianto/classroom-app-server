angular.module('ClassRoom').controller('SubmissionsCtrl', ['$scope', '$meteor', '$window', function ($scope, $meteor, $window) {
    $scope.heading = {title: 'Submission Records'};

    $meteor.subscribe("submissions").then(function(){

        $scope.submissions = $meteor.collection(function(){
            return Submissions.find();
        }, false);

    });


    $meteor.subscribe("users").then(function(){

        $scope.studs = $meteor.collection(function(){
            return Meteor.users.find({isTeacher:0});
        }, false);

    });

    $scope.popup = function(userId){
      var url = 'submissions/' + userId;
      var newwindow= $window.open(url,'_blank','height=600,width=800');
      if ($window.focus) {newwindow.focus()}
      return false;
    }
}]);
