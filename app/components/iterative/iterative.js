var app = angular.module('tree.iterative', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/iterative', {
        templateUrl: 'components/iterative/iterative.html',
        controller: 'ListController'
    });
}]);

app.controller("ListController", ['$scope', function($scope) {

    $scope.storage  = "listData";
    $scope.defTitle = "New Node";
    $scope.list     = [];
    $scope.iterator = 1;

    /**
     * On init app
     */
    $scope.init = function() {

        var iteratorData = localStorage.getItem("iterator");
        if (iteratorData) {
            $scope.iterator = iteratorData;
        }

        var data = localStorage.getItem($scope.storage);
        $scope.list = (data && data != []) ? JSON.parse(data) : [{id : $scope.iterator, title: "List", level : 1, visible : true, state: false, edit : false, parent: []}];
    };

    /**
     * Get iteration, for auto increment node ID
     *
     * @returns {number}
     */
    $scope.iterate = function() {
        $scope.iterator++;
        localStorage.setItem("iterator",  $scope.iterator);

        return $scope.iterator;
    };

    /**
     * Recursively get child indexes
     *
     * @param list
     * @param data
     * @param indexes
     * @returns {*}
     */
    $scope.iterateIndexes = function(list, data, indexes) {
        list.forEach(function(val, key) {
            if (val.parent == data.id) {
                indexes.push(key);
                $scope.iterateIndexes(list, val, indexes);
             }
        });

        return indexes;
    };


    /**
     * Recursively change state of child elements
     *
     * @param list
     * @param data
     */
    $scope.iterateShow = function(list, data) {
        list.forEach(function(val, key) {
            if (val.parent == data.id) {
                $scope.list[key].visible = (data.state && data.visible) ? true : false;
                $scope.iterateShow(list, val);
            }
        });
    };

    /**
     * Remove child elements, at one time starting from highest to lowest list index
     *
     * @param data
     */
    $scope.remove = function(data) {
        data.state = false;

        var indexes = $scope.iterateIndexes($scope.list, data, []);
        indexes.sort(function(a, b) { return b-a }).forEach(function(index) {
            $scope.list.splice(index, 1);
        });

        $scope.saveStorage($scope.list);
    };

    /**
     * Add child node
     *
     * @param data
     */
    $scope.add = function(data) {

        data.state = true;

        var level = data.level + 1;
        var index = $scope.list.indexOf(data);
        $scope.list.forEach(function(val) {
            if (val.parent == data.id) {
                index = $scope.list.indexOf(val);
            }
        });

        $scope.list.splice(index + 1, 0, {id : $scope.iterate(), title: $scope.defTitle, level : level, visible : true, state: false, edit : false, parent: data.id });

        /** Show child nodes */
        $scope.iterateShow($scope.list, data);
        $scope.saveStorage($scope.list);
    };



    /**
     * Count child nodes
     *
     * @param data
     * @returns {number}
     */
    $scope.childCount = function(data) {
        var count = 0;
        $scope.list.forEach(function(val) {
            if (val.parent == data.id) {
                count++;
            }
        });

        return count;
    };

    /**
     * Toggle child nodes, show/hide
     *
     * @param data
     */
    $scope.toggleNodes = function(data) {
        if ($scope.childCount(data) > 0) {
            data.state = !data.state;

            $scope.iterateShow($scope.list, data);
            $scope.saveStorage(data);
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
     * Change element title
     *
     * @param data
     */
    $scope.submitEdit = function(data) {

        data.edit = false;
        if (data.title == "") {
            data.title = $scope.defTitle;
        }

        $scope.saveStorage(data);
    };

    /**
     * Save storage data
     *
     * @param data
     */
    $scope.saveStorage = function(data) {
        localStorage.setItem(
            $scope.storage,
            JSON.stringify($scope.list)
        );
    };

}]);

