
angular.module('ClassRoom').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'client/views/index.ng.html'
        });
 
      //$urlRouterProvider.otherwise("/");
}]);
