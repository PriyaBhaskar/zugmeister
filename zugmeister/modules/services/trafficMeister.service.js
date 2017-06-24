(function() {
    'use strict';

angular.module('app.zugmeister')
    .factory('trafficMeister', trafficMeister);

    trafficMeister.$inject= [
        '$http',
        '$q',
        'appConstants',
        'abortRequestService'];

        function trafficMeister($http, $q, appConstants, abortRequestService) {
            'use strict';

            var abortHttpRequestList = [];

            function fetchData() {
                var response = $q.defer(),
                    abortHttpRequest = $q.defer(),
                    settings = {
                        method: 'GET',
                        url: appConstants.vehiclesApi,
                        timeout: abortHttpRequest.promise
                    },
                    id = abortHttpRequestList.length;

                abortHttpRequestList.push(abortHttpRequest);

                $http(settings).then(function (data) {
                        response.resolve(data);
                    },function (error) {
                        response.reject(error);
                    }).finally(function () {
                        abortRequestService.remove(id, abortHttpRequestList);
                    });
                return response.promise;
            }

            return {
                fetchData: fetchData
            };
        }
})();