angular.module("ClassRoom").controller("SessionsCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

        $scope.sessions = $meteor.collection(Session).subscribe('session');
        console.log($scope.sessions);

        $scope.save = function(){
            $scope.sessions.save();
        };

        $scope.createSession = function(newSession){
            alert(Meteor.userId());
            Session.insert({name: newSession.name, description: newSession.description, teachers: [Meteor.userId()], students: []});
           // Meteor.call('addSession', newSession);
        };
    }
]);