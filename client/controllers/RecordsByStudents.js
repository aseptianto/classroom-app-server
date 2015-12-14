angular.module("ClassRoom").controller("recordsByStudentsCtrl", ['$scope', '$meteor', 'Misc',
    function($scope, $meteor, Misc){
        $scope.heading = {title: 'Records by Students'};

        $meteor.subscribe("users").then(function(){
            $scope.students = $meteor.collection(function(){
                return Meteor.users.find();
            }, false);
        });

        $meteor.subscribe("activities").then(function(){
            $scope.activities = $meteor.collection(function(){
                return Activity.find();
            }, false);
            $scope.deployedActivities = $meteor.collection(function(){
                return Activity.find({status: 1});
            }, false);
            $scope.undeployedActivities = $meteor.collection(function(){
                return Activity.find({status: 0});
            }, false);
        });

       $scope.popup = Misc.popup; //And call the method on the Scope.

        /*
        $scope.popup = function(Id){
          var url = 'recordsByStudentsDeta/' + Id;
          var newwindow= $window.open(url,'_blank','height=600,width=800');
          if ($window.focus) {newwindow.focus()}
          return false;
        };
*/

    }
]);
