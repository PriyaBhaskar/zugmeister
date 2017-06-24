(function() {
    'use strict';

    angular
        .module('app.mock')
        .factory('stubDataBackend', stubDataBackend);

    stubDataBackend.$inject = ['$location', 'mockHttp'];

    function stubDataBackend($location, mockHttp) {
        var service = {
            respond: respond
        };

        return service;

        function respond(path) {
            if(path === '/vehicles') {
                return mockHttp.get('/stubs/services/vehicles-data-backend.json');
            }
        }
    }
})();