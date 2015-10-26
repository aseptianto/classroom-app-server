angular.module("ClassRoom").controller("SessionsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){
        $scope.heading = {title: 'Manage Session'};

        //$scope.sessions = $meteor.collection(Session).subscribe('session');
        $meteor.subscribe("sessions").then(function(){

            $scope.sessions = $meteor.collection(function(){
                return Session.find();
            }, false);
            console.log($scope.sessions);
        });

        $scope.createSession = function(newSession){
            console.log(Meteor.userId());
            if(Meteor.userId() != null)
                Session.insert({name: newSession.name, description: newSession.description, teachers: [Meteor.userId()], students: []});
            else
                Session.insert({name: newSession.name, description: newSession.description, teachers: [], students: []});
           // Meteor.call('addSession', newSession);
        };
    }
]);
