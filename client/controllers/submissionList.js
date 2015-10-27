angular.module('ClassRoom').controller('SubmissionsCtrl', ['$scope', '$meteor', '$window', '$filter',
 function ($scope, $meteor, $window, $filter) {
    $scope.heading = {title: 'Submission Records'};

    $meteor.subscribe("questions").then(function(){

        $scope.questions = $meteor.collection(function(){
            return Question.find();
        }, false);

    });

    /*var callGetSubMapReduce = function(){

        Meteor.call('getSubMapReduce', function(err, data){
            $scope.subMapReduce = data;

        });

    };*/

    $meteor.subscribe("submissions").then(function(){

        $scope.submissions = $meteor.collection(function(){
            return Submission.find();
        }, false);


    });


    $meteor.subscribe("users").then(function(){

        $scope.studs = $meteor.collection(function(){
            return Meteor.users.find({isTeacher:0});
        }, false);

    });

    $scope.addSub = function(newSub){
      var subId = Submission.insert({
        'grade': newSub.grade,
        'question': new Mongo.ObjectID(newSub.qs),
        'student': newSub.stu,
        'subTime': Date(),
        'data': {
          'type': 0,
          'content': newSub.data
        }
      });

      console.log(subId);
      if(newSub.stu != null)
        Meteor.call('addSubmissionToUserCollection', newSub.stu, subId);
    };

    /*
    $scope.getNumberOfSubmission = function(stu){
        var result = $filter('filter')($scope.subMapReduce, {_id:stu._id});
        console.log(result);
        if(result.length > 0){
            return result[0].value;
        }
        return 0;
    };
    */
    $scope.getSubmissionNumber = function(stu){
        if(stu.submissions != null)
            return stu.submissions.length;
        else
            return 0;
    }

    $scope.getLastSubmission = function(stu){
        console.log('run time');
        if(stu.submissions != null){
            console.log('run time2');
            var result = Submission.find({"_id":{"$in":stu.submissions}}, {'subTime': 1 , "sort":{'subTime':-1}, "limit": 1}).fetch();
            console.log(result);
            return result[0].subTime;
        }
        else{
            return 'No Records';
        }
    }

    $scope.popup = function(userId){
      var url = 'submissions/' + userId;
      var newwindow= $window.open(url,'_blank','height=600,width=800');
      if ($window.focus) {newwindow.focus()}
      return false;
    };
}]);
