angular.module("ClassRoom").controller("StudentsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.users = $meteor.collection(function() {
            return Meteor.users.find({isTeacher: 0});
        }).subscribe("students");

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
