(function () {
    angular.module('app', [
        'ui.router', // ADDED for page navigation
        'welcomeState', //ADDED for welcome page state
        'throttleinstructionState', // ADDED for throttle instruction state
        'trackSelectionState', //ADDED for track selection state
        'throttlecontrolState', // ADDED for throttle control state
        'angular-uuid' // ADDED for the UUID generation
    ])

    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('welcome_page')
    })

    .run(function ($state, $rootScope) {
        $rootScope.$on('stateChangeError', function(event, toState, toParams) {
            console.log('$stateChangeStart to' + toState.to + '- fired when the transition begins .toState,toParams : \n', toState, toParams);

            event.preventDefault();

            $state.get('welcome_page').error = { code: 123, descriptions: 'Exception stack trace'}
            return $state.go('welcome_page');
        })
    })
})();