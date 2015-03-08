'use strict';

describe('tree.iterative module', function() {

    var scope;
    var ctrl;
    var controller;

    beforeEach(module('tree.iterative'));

    beforeEach(inject(function($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl =  $controller("ListController", {$scope: scope});

        expect(ctrl).toBeDefined();
    }));

    beforeEach(inject(function() {
        scope.init();
    }));

    describe('iterative controller', function(){
        it('should inject scope', inject(function() {
            expect(ctrl).toBeDefined();
        }));
    });

    describe('iterative init', function(){
        it('should return true', inject(function() {

            expect(scope.list.length > 0).toBeTruthy();
            expect(scope.iterator > 0).toBeTruthy();
        }));
    });

    describe('iterative add', function(){
        it('should return true', inject(function() {

            scope.add(
                scope.list[0]
            );
            expect(scope.childCount(scope.list[0]) > 0).toBeTruthy();
        }));
    });

    describe('iterative remove', function(){
        it('should return true', inject(function() {

            scope.remove(
                scope.list[0]
            );
            expect(scope.childCount(scope.list[0])).toBeDefined();
        }));
    });

    describe('iterative remove', function(){
        it('should return true', inject(function() {

            scope.toggleNodes(
                scope.list[0]
            );
            expect(scope.childCount(scope.list[0])).toBeDefined();
        }));
    });

    describe('iterative start editing', function(){
        it('should return true', inject(function() {

            scope.showEdit(scope.list[0]);
            expect(scope.list[0].edit).toBeTruthy();
        }));
    });

    describe('iterative start editing', function(){
        it('should return true', inject(function() {

            var data = scope.list[0];

            scope.list[0].title = "New title" + Math.random();
            scope.submitEdit(scope.list[0]);
            expect(data.title != scope.list[0].title).toBeFalsy();
        }));
    });

});