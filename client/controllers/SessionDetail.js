angular.module("ClassRoom").controller("SessionDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){

        $meteor.collection(Session).stop();
        $scope.sessionId = $stateParams.sessionId;
        $scope.sessionDetail = $meteor.collection(Session).subscribe('sessionDetail', $scope.sessionId);

        $scope.save = function(){
            $scope.session.save();
        };

        $scope.addStudent = function(newStudentUsername){
            Meteor.call('getUserId', newStudentUsername, function(err, userId){
                if(err) alert(err);
                if(userId != -1){
                    Session.update({_id: $scope.sessionId}, {$push: {students: userId}});
                    console.log("update " + $scope.sessionId + " with " + userId);
                }
                else alert("username not exist");
            });
        };
    }
]);