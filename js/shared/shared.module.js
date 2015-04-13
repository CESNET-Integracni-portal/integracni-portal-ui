(function () {
    var shrmod = angular.module('shared.module', ['services.module', 'utils.module']);

    // route controller
    shrmod.controller('sharedCtrl', function () {
        $('.sidebar').sidebar('attach events', 'span');
    });
})();