(function () {
    'use strict';

    angular
        .module('throttlecontrolState')
        .controller('throttleControl', throttleControl);

    throttleControl.$inject = [
        '$scope',
        '$stateParams',
        'brokerDetails',
        'messageService',
        'aloneService',
        '$timeout',
        '$interval'
    ];

    function throttleControl(
        $scope,
        $stateParams,
        brokerDetails,
        messageService,
        aloneService,
        $timeout,
        $interval
    ) {

        var vm = this;
        var stateName = "car_control";

        var changed = false;

        var channel = $stateParams.channel;

        const DEFAULT_THROTTLE = 0;

        var slider = document.getElementById("throttle");

        /*
        throttle : is the throttle percentage the user is demanding.
        actualThrottle : is the throttle percentage the real world car is at.
        resources : is the array holding the available special weapons
        */
        vm.throttle = DEFAULT_THROTTLE;

        vm.actualThrottle = DEFAULT_THROTTLE;
        vm.stateName = stateName;

        //Used to show error message when there is a server error.
        vm.throttleError = false;

        vm.stop = stop;

        //weapons listeners for enabling and disabling weapons
        aloneService.checkOtherTrack();

        //function called every 5 seconds to check if a player has left
        function dataTime() {
            aloneService.checkIfPlayerHasLeft();
        }
        // start interval 
        var interval = $interval(dataTime, 10000);

        //set topics for mqtt on new message
        var throttleTopic = `${brokerDetails.UUID}/control/${channel}/throttle`;

        //subscribe to channel throttle
        messageService.subscribe(throttleTopic);

        //Stops the car and returns user back to the splashscreen
        function stop() {
            var retryOrNot = false;
            messageService.disconnect(retryOrNot);
        }

        messageService.subscribe(throttleTopic, stateName, function (message) {
            if (message.topic == throttleTopic) {
                console.log(message.payloadString.replace(/"/g, ""));
                var throttle = JSON.parse(message.payloadString);
                //filter out any set throttle messages
                if (throttle.hasOwnProperty("throttle")) {
                    vm.actualThrottle = throttle.throttle;
                }
            }
        });

        /*
        When users changes car throttle a change request is sent to server. 
        */
        $scope.$watch("vm.throttle", function (newThrottle, oldThrottle) {
            if (newThrottle != oldThrottle) {
                var payload = {
                    set: newThrottle
                }
                messageService.publish(throttleTopic, JSON.stringify(payload));
                console.log(newThrottle);
            }
        })
    }
})();
