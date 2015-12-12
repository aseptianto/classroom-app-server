angular.module('ClassRoom', ['angular-meteor', 'ui.router', 'uiGmapgoogle-maps', 'monospaced.qrcode', 'ui.sortable', 'textAngular']);

function onReady() {
  angular.bootstrap(document, ['ClassRoom']);

  Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
