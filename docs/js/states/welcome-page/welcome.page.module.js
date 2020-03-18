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
                    url: '/index?uuid&brokerHost&brokerPort&username&password&ssl',
                    params: {
                        uuid: {
                            dynamic: false
                        },
                        brokerHost: {
                            dynamic: false
                        },
                        brokerPort: {
                            dynamic: false
                        },
                        username: {
                            dynamic: false
                        },
                        password: {
                            dynamic: false
                        },
                        ssl: {
                            dynamic: false
                        }
                    },
                    templateUrl: 'js/states/welcome-page/welcome.page.html',
                    controller: 'welcomePageControl as vm',
                    resolve: {
                        broker: ['$stateParams', 'brokerDetails', function ($stateParams, brokerDetails) {
                            if ($stateParams.uuid) brokerDetails.UUID = $stateParams.uuid;
                            if ($stateParams.brokerHost) brokerDetails.HOST = $stateParams.brokerHost;
                            if ($stateParams.brokerPort) brokerDetails.PORT = $stateParams.brokerPort;
                            if ($stateParams.username) brokerDetails.USERNAME = $stateParams.username;
                            if ($stateParams.password) brokerDetails.PASSWORD = $stateParams.password;
                            if ($stateParams.ssl) brokerDetails.SSL = ($stateParams.ssl.toLowerCase() == 'true');
                        }]
                    }
                })
        })
})();