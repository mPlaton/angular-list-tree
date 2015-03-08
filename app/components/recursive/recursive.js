var app = angular.module('tree.recursive', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/recursive', {
        templateUrl: 'components/recursive/recursive.html',
        controller: 'TreeController'
    });
}]);

app.controller("TreeController", ['$scope', function($scope) {

    $scope.storage  = "treeData";
    $scope.defTitle = "New node";
    $scope.tree     = [];

    /**
     * On init app
     */
    $scope.init = function() {
        var data = localStorage.getItem($scope.storage);
        $scope.tree = (data && data != []) ? JSON.parse(data) : [{title: "Tree", state: false, edit : false, nodes: []}];
    };

    /**
     * Remove all child nodes
     *
     * @param data
     */
    $scope.remove = function(data) {
        data.state = false;
        data.nodes = [];
        $scope.saveStorage();
    };

    /**
     * Add child node and show child elements
     *
     * @param data
     */
    $scope.add = function(data) {
        data.state = true;
        data.nodes.push({title: $scope.defTitle, state: false, edit : false, nodes: []});

        $scope.saveStorage();
    };

    /**
     * Toggle child nodes show/hide
     *
     * @param data
     */
    $scope.toggleNodes = function(data) {
        if (data.nodes.length > 0) {
            data.state = !data.state;
            $scope.saveStorage();
        }
    };

    /**
     * Show edit form
     *
     * @param data
     */
    $scope.showEdit = function(data) {
        data.edit = true;
    };

    /**
     * Change node title
     *
     * @param data
     */
    $scope.submitEdit = function(data) {

        data.edit = false;
        if (data.title == "") {
            data.title = $scope.defTitle;
        }

        $scope.saveStorage();
    };

    /**
     * Save storage data
     */
    $scope.saveStorage = function() {
        localStorage.setItem(
            $scope.storage,
            JSON.stringify($scope.tree)
        );
    };

}]);