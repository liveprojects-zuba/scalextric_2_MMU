(function () {
    'use strict';

    angular
        .module('throttleinstructionState')
        .controller('throttleInstructionPageControl', throttleInstructionPageControl);

    throttleInstructionPageControl.$inject = [
        '$state',
    ];

    function throttleInstructionPageControl(
        $state,
    ) {
        //defining vm so that we may use it 
        var vm = angular.extend(this, {
        });

        //use this fucntion to navigate to the next page
        vm.getStarted = function () {
            $state.go('track_selection_page');
        }
    }
})();