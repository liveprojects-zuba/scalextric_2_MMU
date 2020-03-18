(function () {
    'use strict';

    angular
        .module('welcomeState')
        .controller('welcomePageControl', welcomePageControl);

        welcomePageControl.$inject = [
            '$state',
        ];

    function welcomePageControl (
        $state,
    ) {
        //defining vm so that we may use it 
        var vm = angular.extend(this, {
            
        });

        //use this fucntion to navigate to the next page
        vm.getStarted = function() {
            $state.go('throttle_instructions');
        }
    }
})();