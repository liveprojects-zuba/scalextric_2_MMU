(function () {
    'use strict';

    angular
        .module('trackSelectionState', [
            'ui.router',
            'ngAnimate'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('track_selection_page', {
                    cache: false,
                    url: '/track_selection_page',
                    templateUrl: 'js/states/track-selection-page/track.selection.page.html',
                    controller: 'trackSelectionControl as vm'
                })
        })
})();