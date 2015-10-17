angular.module("ClassRoom").controller("SessionsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.$meteorSubscribe('session').then(function(subscriptionHandle){
            $scope.session = $meteor.collection(Meteor.session, false);
        });

        $scope.save = function(){
            $scope.session.save();
        };

        $scope.createSession = function(newSession){
            alert(Meteor.userId());
            Session.insert({name: newSession.name, description: newSession.description, teachers: [Meteor.userId()]});
           // Meteor.call('addSession', newSession);
        };
    }
]);