!function(){"use strict";function MainController($scope,appConstants,trafficMeister,log){function showVehicleData(data){vm.nonFilteredVehicles=data.data[1].vehicles,vm.vehicles=vm.nonFilteredVehicles}function showErrorMessage(){vm.error=!0}function filterVehicleList(newValue,sub){var filteredVehicles=_.filter(vm.vehicles,function(value,key){return value[sub]===newValue[sub]});vm.vehicles=filteredVehicles}var vm=this;trafficMeister.fetchData().then(showVehicleData)["catch"](showErrorMessage),$scope.$watch("vehicleType",function(newValue,oldValue){filterVehicleList(newValue,"type")}),$scope.$watch("vehicleBrand",function(newValue,oldValue){filterVehicleList(newValue,"brand")}),$scope.$watch("vehicleColor",function(newValue,oldValue){filterVehicleList(newValue,"color")})}angular.module("app.zugmeister",[]).component("zugmeister",{bindings:{},templateUrl:"zugmeister/module.html",controller:MainController}).filter("unique",function(){return function(collection,keyname){var output=[],keys=[];return angular.forEach(collection,function(item){var key=item[keyname];-1===keys.indexOf(key)&&(keys.push(key),output.push(item))}),output}}),MainController.$inject=["$scope","appConstants","trafficMeister","$log"]}(),angular.module("app.zugmeister").constant("appConstants",{vehiclesApi:"http://localhost:9000/vehicles"}),function(){"use strict";function abortRequestService(){function abort(id,abortHttpRequestList){function abortRequestFn(promise,i){promise.resolve(),abortHttpRequestList.splice(i,1)}angular.isDefined(id)?abortRequestFn(abortHttpRequestList[id],id):angular.forEach(abortHttpRequestList,abortRequestFn)}return{remove:abort}}angular.module("app.zugmeister").factory("abortRequestService",abortRequestService),abortRequestService.$inject=[]}(),function(){"use strict";function trafficMeister($http,$q,appConstants,abortRequestService){function fetchData(){var response=$q.defer(),abortHttpRequest=$q.defer(),settings={method:"GET",url:appConstants.vehiclesApi,timeout:abortHttpRequest.promise},id=abortHttpRequestList.length;return abortHttpRequestList.push(abortHttpRequest),$http(settings).then(function(data){response.resolve(data)},function(error){response.reject(error)})["finally"](function(){abortRequestService.remove(id,abortHttpRequestList)}),response.promise}var abortHttpRequestList=[];return{fetchData:fetchData}}angular.module("app.zugmeister").factory("trafficMeister",trafficMeister),trafficMeister.$inject=["$http","$q","appConstants","abortRequestService"]}(),angular.module("app.zugmeister").run(["$templateCache",function($templateCache){"use strict";$templateCache.put("zugmeister/module.html",'<section class="zugmeister">\r\n    <form name="zugmeisterForm">\r\n        <label>Vehicle</label><br>\r\n        <select name="vehicleType" data-ng-options="vehicle.type for vehicle in $ctrl.vehicles | unique : \'type\'" ng-model="vehicleType"></select><br>\r\n        <label> Brand </label><br>\r\n        <select name="vehicleBrand" data-ng-options="vehicle.brand for vehicle in $ctrl.vehicles track by vehicle.brand" ng-model="vehicleType"></select><br>\r\n        <label> Color </label><br>\r\n        <select name="vehicleColor" data-ng-options="color for vehicle.color for vehicle in $ctrl.vehicles" ng-model="selectedIvehicleTypetem"></select><br>\r\n    </form>\r\n</section>\r\n')}]);