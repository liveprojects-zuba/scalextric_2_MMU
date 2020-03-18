(function () {
    'use strict';

    angular
        .module('welcomeState', [
            'ui.router',
            'ngAnimate'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('welcome_page', {
                    cache: false,
                    url: '/welcome_page',
                    templateUrl: 'js/states/welcome-page/welcome.page.html',
                    controller: 'welcomePageControl as vm'
                })
        })
})();