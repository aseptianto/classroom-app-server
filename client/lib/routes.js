
angular.module('ClassRoom').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'client/views/home.ng.html',
          controller: ''
        })
        .state('404', {
          url: '/404',
          templateUrl: 'client/views/404.ng.html'
        })
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
