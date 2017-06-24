(function() {
    'use strict';

    angular
        .module('app.zugmeister', [])
        .component('zugmeister', {
            bindings: {
            },
            templateUrl: 'zugmeister/module.html',
            controller: MainController
        })
        .filter('unique', function() {
            return function(collection, keyname) {
                var output = [],
                    keys = [];
                angular.forEach(collection, function(item) {
                    var key = item[keyname];
                    if(keys.indexOf(key) === -1) {
                        keys.push(key);
                        output.push(item);
                    }
                });
                return output;
            };
        });


    MainController.$inject = ['$scope', 'appConstants', 'trafficMeister', '$log'];

    function MainController($scope, appConstants, trafficMeister, log) {

        /*jshint validthis: true */
        var vm = this;

        trafficMeister.fetchData()
            .then(showVehicleData)
            .catch(showErrorMessage);

        function showVehicleData (data) {
            vm.nonFilteredVehicles = data.data[1].vehicles;
            vm.vehicles = vm.nonFilteredVehicles;

        }

        function showErrorMessage () {
            vm.error = true;
        }

        function filterVehicleList (newValue, sub) {
            var filteredVehicles = _.filter(vm.vehicles, function(value, key) {
                return (value[sub] === newValue[sub]);
            });
            vm.vehicles = filteredVehicles;
        }

        $scope.$watch('vehicleType', function(newValue, oldValue) {
            filterVehicleList(newValue, 'type');
        });

        $scope.$watch('vehicleBrand', function(newValue, oldValue) {
            filterVehicleList(newValue, 'brand');
        });

        $scope.$watch('vehicleColor', function(newValue, oldValue) {
            filterVehicleList(newValue, 'color');
        });

    }

})();

