angular.module("ClassRoom").controller("StudentsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.$meteorSubscribe('users').then(function(subscriptionHandle){
          $scope.users = $meteor.collection(Meteor.users, false);
        });

        $scope.save = function(){
          $scope.users.save();
        };

        $scope.createStu = function(newStu){
          Meteor.call('addStu', newStu); //call the server side function
        };
    }
]);

Template.body.rendered=function() {
    $('.my-datepicker').datepicker();
}
