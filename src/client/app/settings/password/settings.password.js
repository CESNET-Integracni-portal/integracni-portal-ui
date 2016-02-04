(function () {
    var pswmod = angular.module('settings.module');

    // CONTROLLER
    pswmod.controller('pswCtrl', function ($scope, userService) {
        var that = this;
        $scope.message = null;

        $scope.changePassword = function ($oldpw, $newpw, $newpw2) {
            $scope.message = null;
            userService.changePassword(userService.getLoggedUserId(), $oldpw, $newpw,$newpw2, 'application/json').success(function () {
                // change was successfull
                $scope.message = "Změna hesla proběhla úspěšně.";
            }).error(function(){
                // change failed
                $scope.message = "Nastala chyba při změně hesla.";
            });
            that.reset();
        };

        this.reset = function() {
            $scope.oldPsw = "";
            $scope.newPsw1 = "";
            $scope.newPsw2 = "";
        };

        $scope.checkPass2 = function(){
            if($scope.newPsw1 != $scope.newPsw2){
                $scope.newPsw2Error = "Hesla se neshodují.";
                return(false);
            }
            else{
                $scope.newPsw2Error = "";
                return(true);
            }
        };
    });
})();
