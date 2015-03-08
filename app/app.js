'use strict';

angular.module('tree', [
    'ngRoute',
    'tree.focus',
    'tree.recursive',
    'tree.iterative'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo : '/recursive'});
}]);
