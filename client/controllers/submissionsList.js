angular.module('ClassRoom').controller('getSubmissions', ['$scope', '$meteor', function ($scope, $meteor) {
    $scope.$meteorSubscribe('submissions').then(function(subscriptionHandle){
        $scope.submissions = $meteor.collection(Submissions);
    });
}]);