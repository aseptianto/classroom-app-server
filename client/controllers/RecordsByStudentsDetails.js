angular.module("ClassRoom").controller("recordsByStudentsDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.stuId = $stateParams.stuId;
        $scope.activityId = $stateParams.activityId;

        $meteor.subscribe("users").then(function(){
            $scope.students = $meteor.collection(function(){
                return Meteor.users.find({_id: $scope.stuId});
            }, false);
        });

        $meteor.subscribe("activities").then(function(){
            $scope.activities = $meteor.collection(function(){
                return Activity.find({_id: $scope.activityId});
            }, false);
        });

        $meteor.subscribe("questionsByActivity", $scope.activityId).then(function(){
            $scope.questions = $meteor.collection(function(){
                return Question.find({}, {sort: {order: 1}});
            }, false);

            //console.log($scope.questions);
            //console.log($scope.questions.length);
        });

        console.log($scope.stuId);
        console.log($scope.activityId);
        // $meteor.subscribe("submissions", $scope.stuId, $scope.activityId).then(function(){
        //     $scope.getSubmission = function(questionId){
        //         $scope.sub = $meteor.object(function(){
        //             return Submission.find();
        //         }, {'question':questionId}, false);
        //         return $scope.sub;
        //     }
            $meteor.subscribe("submissions", $scope.stuId, $scope.activityId).then(function(){
                $scope.studentSubmissions = $meteor.collection(function(){
                    return Submission.find({student : $scope.stuId, activity: $scope.activityId});
                }, false);
            });

            /*
            $scope.getSubmission = function(questionId){
                return Submission.findOne({'question':questionId});
            }*/

            $scope.getSubmission = function(questionId){

                for(var i = 0; i < $scope.studentSubmissions.length; i++){
                    if($scope.studentSubmissions[i].question == questionId){
                        console.log( $scope.studentSubmissions[i]);
                        return $scope.studentSubmissions[i];
                    }
                }
                // $scope.submission = $scope.getSubmission(questionId);
                // if($scope.submission){
                //     return $scope.submission.data;
                // }
                // else {
                //     return "";
                // }
            };

            $scope.setTeacherResponse = function(submissionId, type){
                if(type != -1){
                    Submission.update({_id: submissionId}, {$set: {teacher_response: type}});
                }
            };


            $scope.checkAnswer = function(question){
                if($scope.getSubmission(question._id)){
                    if(question.answer == $scope.getSubmission(question._id).data)
                        return 1;
                    return 0;
                }
                else return -1;
            };




    }
]);
