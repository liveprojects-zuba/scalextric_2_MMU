(function () {
    'use strict';

    angular
        .module('throttlecontrolState', [
            'ui.router',
            'ngAnimate'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('throttle_control_page', {
                    cache: false,
                    url: '/throttle_control_page',
                    templateUrl: 'js/states/throttle-control-page/throttle.control.page.html',
                    controller: 'throttleControl as vm'
                })
        })
})();