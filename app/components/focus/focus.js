var app = angular.module('tree.focus', []);

/**
 * Focus directive
 */
app.directive('setFocus', function() {
    return {
        restrict: 'A',
        scope: {
            focus: "=setFocus"
        },
        link: function($scope, $element) {
            $scope.$watch("focus", function(value) {
                if (value == true) {
                    setTimeout(function () {
                        $element[0].focus();
                    }, 100)
                }
            });
        }
    }
});