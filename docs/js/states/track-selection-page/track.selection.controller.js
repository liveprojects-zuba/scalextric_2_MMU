(function () {
    'use strict';

    angular
        .module('trackSelectionState')
        .controller('trackSelectionControl', trackSelectionControl);

    trackSelectionControl.$inject = [
        'aloneService'
    ];

    function trackSelectionControl (
        aloneService
    ) {
        var vm = angular.extend(this, {
        });
        vm.go = go;
        
        vm.channels = Array.apply(null, {
            length: 2
        }).map(Function.call, Number);

        vm.channel = 0;

        function go(valid) {
            if(!valid) {
                alert("Invalid choice")
            } else {
                aloneService.checkResponse(vm.channel);
            }
        }
    }
})();