//we need to use the instruction page as our splash screen to make the connection to the database MQTT
(function () {
    'use strict';

    angular
        .module('welcomeState')
        .controller('welcomePageControl', welcomePageControl);

    welcomePageControl.$inject = [
        '$state',
        'mqttService',
        'brokerDetails',
        'messageService',
        'uuid',
        'aloneService'
    ];

    function welcomePageControl(
        $state,
        mqttService,
        brokerDetails,
        messageService,
        uuid,
        aloneService
    ) {
        var vm = angular.extend(this, {
        });
        var hashed = uuid.v4();

        vm.makeConnection = function () {
            console.log(brokerDetails);

            //initialise the connection to mqtt and the message service
            mqttService.initialize(brokerDetails.HOST, brokerDetails.PORT);
            messageService.initialize();

            //now need to have listeners that will listen to new messages that are resubscribing too topics
            mqttService.setMessageListener(messageService.onNewMessage);
            mqttService.setResubscribeListener(messageService.resubscribe);

            //setting the detaisl for mqtt connnection
            var mqttDetails = {};

            if (brokerDetails.SSL) { mqttDetails.useSSL = brokerDetails.SSL; }
            if (brokerDetails.USERNAME) {
                mqttDetails.userName = brokerDetails.USERNAME;
                if (brokerDetails.PASSWORD) {
                    mqttDetails.password = brokerDetails.PASSWORD;
                }
            }

            //making the connection to mqtt
            mqttService.connect(function (success, error) {
                if (success) {
                    console.log("the user has successfully connected to MQTT");
                    aloneService.initialize(hashed);
                    $state.go('throttle_instructions');
                } else if (error) {
                    console.log(error)
                    alert(`There was an error connecting to ${brokerDetails.HOST}:${brokerDetails.PORT}`)
                }
            }, mqttDetails)
        }
    }
})();