(function () {
    'use strict';

    angular
        .module('throttleinstructionState', [
            'ui.router',
            'ngAnimate'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('throttle_instructions', {
                    cache: false,
                    url: '/throttle_instructions',
                    templateUrl: 'js/states/throttle-instruction-page/throttle.instruction.page.html',
                    controller: 'throttleInstructionPageControl as vm'
                })
        })
})();