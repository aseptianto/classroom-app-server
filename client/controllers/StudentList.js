angular.module("ClassRoom").controller("StudentsCtrl", ['$scope', '$meteor',
function($scope, $meteor){
    $scope.heading = {title: 'Manage Student'};

    $meteor.subscribe("users").then(function(){

        $scope.studs = $meteor.collection(function(){
            return Meteor.users.find({isTeacher:0});
        }, false);

    });

    $scope.save = function(stu){
        $scope.studs.save(stu);
    };

    $scope.createStu = function(newStu){
        Meteor.call('addStu', newStu); //call the server side function
    };
}
]);

Template.body.rendered=function() {
    $('.mdatepicker').datepicker();
}
