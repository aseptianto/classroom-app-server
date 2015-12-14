
angular.module('ClassRoom').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('root', {
                url: '/',
                templateUrl: 'client/views/home.ng.html',
                controller: 'HomeCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'client/views/404.ng.html'
            })
            .state('recordsByStudents', {
                url: '/recordsByStudents',
                templateUrl: 'client/views/recordsByStudents.ng.html',
                controller: 'recordsByStudentsCtrl'
            })
            .state('recordsByStudentsDetails', {
                url: '/recordsByStudents/:stuId/:activityId',
                templateUrl: 'client/views/recordsByStudentsDetails.ng.html'

            })
            .state('recordsByActivities', {
                url: '/recordsByActivities',
                templateUrl: 'client/views/recordsByActivities.ng.html',
                controller: 'recordsByActivitiesCtrl'
            })
            .state('recordsByActivitiesDetails', {
                url: '/recordsByActivities/:activityId',
                templateUrl: 'client/views/recordsByActivitiesDetails.ng.html',
                controller: 'recordsByActivitiesDetailsCtrl'
            })
            .state('managePlacenQs', {
                url: '/managePlacenQs',
                templateUrl: 'client/views/managePlacenQs.ng.html',
                controller: 'ManagePlaceQsCtrl'
            })
            .state('managePlacenQsDetails', {
                url: '/managePlacenQs/:activityId',
                templateUrl: 'client/views/managePlacenQs.ng.html',
                controller: 'ManagePlaceQsCtrl'
            })
            .state('managePlaceQsQuestions', {
                url: '/managePlacenQs/:activityId/question/:questionId',
                templateUrl: 'client/views/managePlacenQs.ng.html',
                controller: 'ManagePlaceQsCtrl'
            })


            /***************************************************************************/
            .state('students', {
                url: '/students',
                templateUrl: 'client/views/students-page.ng.html',
                controller: 'StudentsCtrl'
            })
            .state('sessions', {
                url: '/sessions',
                templateUrl: 'client/views/sessions-page.ng.html',
                controller: 'SessionsCtrl'
            })
            .state('sessionDetail', {
                url: '/sessions/:sessionId',
                templateUrl: 'client/views/session-detail.ng.html',
                controller: 'SessionDetailCtrl'
            })
            .state('placeDetail', {
                url: '/places/:placeId',
                templateUrl: 'client/views/place-detail.ng.html',
                controller: 'PlaceDetailCtrl'
            })
            .state('places', {
                url: '/places',
                templateUrl: 'client/views/places-page.ng.html',
                controller: 'PlacesCtrl'
            })
            .state('submissions', {
                url: '/submissions',
                templateUrl: 'client/views/submissions-page.ng.html',
                controller: 'SubmissionsCtrl'
            })
            .state('submissionDetail', {
                url: '/submissions/:stuId',
                templateUrl: 'client/views/submission-detail.ng.html',
                controller: 'SubmissionDetailCtrl'
            })
        ;

        $urlRouterProvider.otherwise("/404");
    }]);
