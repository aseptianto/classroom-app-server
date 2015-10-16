angular.module("ClassRoom").controller("StudentsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.$meteorSubscribe('users').then(function(subscriptionHandle){
          $scope.users = $meteor.collection(Meteor.users, false);
        });

        $scope.save = function(){
          $scope.users.save();
        };

        $scope.createStu = function(newStu){
          Accounts.createUser({username: newStu.username, password: newStu.password}, function(err){
            if(!err){
              var createdUser = $meteor.object(Meteor.users, {username: newStu.username}, false);
              console.log(createdUser);
              Meteor.users.update(createdUser._id, {$set: {dob: newStu.dob, isTeacher:0}});
            }
          });
        };
    }
]);
