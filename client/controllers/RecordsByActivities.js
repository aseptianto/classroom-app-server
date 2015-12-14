angular.module("ClassRoom").controller("recordsByActivitiesCtrl", ['$scope', '$meteor','Misc',
    function($scope, $meteor, Misc){
        $scope.heading = {title: 'Records by Activities'};

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

        $scope.popup = Misc.popup;
    }
]);
