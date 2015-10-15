angular.module('ClassRoom', ['angular-meteor', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['ClassRoom']);
}
 
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);