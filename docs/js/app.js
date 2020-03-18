(function () {
    angular.module('app', [
        'ui.router', // ADDED for page navigation
        'welcomeState', //ADDED for welcome page state
        'throttleinstructionState', // ADDED for throttle instruction state
        'trackSelectionState', //ADDED for track selection state
        'throttlecontrolState' // ADDED for throttle control state
    ])

    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('throttle_instructions')
    })

    .run(function ($state, $rootScope) {
        $rootScope.$on('stateChangeError', function(event, toState, toParams) {
            console.log('$stateChangeStart to' + toState.to + '- fired when the transition begins .toState,toParams : \n', toState, toParams);

            event.preventDefault();

            $state.get('throttle_instructions').error = { code: 123, descriptions: 'Exception stack trace'}
            return $state.go('throttle_instructions');
        })
    })
})();