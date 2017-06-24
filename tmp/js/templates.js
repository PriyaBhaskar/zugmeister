angular.module('app.zugmeister').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('zugmeister/module.html',
    "<section class=\"zugmeister\">\r" +
    "\n" +
    "    <form name=\"zugmeisterForm\">\r" +
    "\n" +
    "        <label>Vehicle</label><br>\r" +
    "\n" +
    "        <select name=\"vehicleType\" data-ng-options=\"vehicle.type for vehicle in $ctrl.vehicles | unique : 'type'\" ng-model=\"vehicleType\"></select><br>\r" +
    "\n" +
    "        <label> Brand </label><br>\r" +
    "\n" +
    "        <select name=\"vehicleBrand\" data-ng-options=\"vehicle.brand for vehicle in $ctrl.vehicles track by vehicle.brand\" ng-model=\"vehicleType\"></select><br>\r" +
    "\n" +
    "        <label> Color </label><br>\r" +
    "\n" +
    "        <select name=\"vehicleColor\" data-ng-options=\"color for vehicle.color for vehicle in $ctrl.vehicles\" ng-model=\"selectedIvehicleTypetem\"></select><br>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</section>\r" +
    "\n"
  );

}]);
