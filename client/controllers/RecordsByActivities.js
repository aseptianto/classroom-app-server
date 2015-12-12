angular.module("ClassRoom").controller("recordsByActivitiesCtrl", ['$scope', '$meteor','$window',
    function($scope, $meteor, $window){
        $scope.heading = {title: 'Show records by Activities'};

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



        $scope.popup = function(Id){
          var url = 'recordsByActivities/' + Id;
          var newwindow= $window.open(url,'_blank','height=600,width=800');
          if ($window.focus) {newwindow.focus()}
          return false;
        };
    }
]);
