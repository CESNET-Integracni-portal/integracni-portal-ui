(function() {

  app = angular.module('app', []);

  app.controller('MainController', function($scope, oauthService) {
    $scope.errorMessage = null;
    $scope.superAdmin = function(){
      $scope.errorMessage = null;
      var that = this;
      /*var error = function(data, status, headers, config) {
        console.log(status);
      };
      oauthService.loginWithPass("admin", "admin", error);*/
      
      var deffered = oauthService.loginWithPass("admin", "admin");
      deffered.error(function(data, status, headers, config) {
        if (status === 401){
          $scope.errorMessage = "Špatné přihlašovací údaje";
        } else {
          $scope.errorMessage = "Někde se stala chyba";
        }
      });
    }
  });

})();