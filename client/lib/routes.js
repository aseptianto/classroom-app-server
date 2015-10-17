
angular.module('ClassRoom').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'client/views/home.ng.html',
          controller: 'getSubmissions'
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
        .state('submissions', {
          url: '/submissions',
          templateUrl: 'client/views/submissions-page.ng.html'
        })
        .state('page', {
          url: '/page',
          templateUrl: 'client/views/page.ng.html',
          views: {
            "sidebar": { template: 'client/views/sidebar.ng.html' },
            "topbar": { template: 'client/views/topbar.ng.html' }
          }
        })
        ;

      $urlRouterProvider.otherwise("/404");
}]);
