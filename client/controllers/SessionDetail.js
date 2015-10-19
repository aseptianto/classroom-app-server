angular.module("ClassRoom").controller("SessionDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function ($scope, $stateParams, $meteor) {
        $scope.sessionId = $stateParams.sessionId;

        $scope.session = $meteor.object(Session, new Mongo.ObjectID($scope.sessionId));
        $scope.session.subscribe("session");

        console.dir($scope.session);

        /*$scope.session.students.forEach(function(studentId){
            var student = Meteor.users.find({_id : studentId}).fetch();
            console.log(student);
        });*/

        $scope.places = $meteor.collection(Place).subscribe('places');
        //console.log($scope.places);

        $scope.studentList = $meteor.collection(function () {
            return Meteor.users.find({isTeacher: 0});
        }).subscribe("students");

        console.log($scope.studentList);
        $scope.addStudent = function (newStudentId) {
            console.log($scope.session.students);
            if($scope.session.students.indexOf(newStudentId) === -1 && newStudentId !== ""){
                Session.update({_id: new Mongo.ObjectID($scope.sessionId)}, {$push: {students: newStudentId}});
            }
            else if(newStudentId === "");
            else alert("student exists");
        };

        $scope.addPlace = function (newPlaceId) {
            console.log(newPlaceId);
            if($scope.session.places.indexOf(newPlaceId) === -1 && newPlaceId !== ""){
                Session.update({_id: new Mongo.ObjectID($scope.sessionId)}, {$push: {places: newPlaceId}});
            }
            else if(newPlaceId === "");
            else alert("place exists");
        };
    }
]);