
angular.module('ClassRoom').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'client/views/index.ng.html',
          controller: 'getSubmissions'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'client/views/404.ng.html'
        });
 
      $urlRouterProvider.otherwise("/404");
}]);
