angular.module("ClassRoom").controller("StudentsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.$meteorSubscribe('users').then(function(subscriptionHandle){
          $scope.users = $meteor.collection(Meteor.users);
        });

        $scope.save = function(){
          $scope.users.save();
        };
    }
]);
