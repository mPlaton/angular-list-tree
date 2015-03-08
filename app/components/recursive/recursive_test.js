'use strict';

describe('tree.recursive module', function() {

    var scope;
    var ctrl;
    var controller;

    beforeEach(module('tree.recursive'));

    beforeEach(inject(function($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl =  $controller("TreeController", {$scope: scope});

        expect(ctrl).toBeDefined();
    }));

    beforeEach(inject(function() {
        scope.init();
    }));

    describe('recursive controller', function(){
        it('should inject scope', inject(function() {
            expect(ctrl).toBeDefined();
        }));
    });

    describe('recursive init', function(){
        it('should return true', inject(function() {

            expect(scope.tree.length > 0).toBeTruthy();
        }));
    });

    describe('recursive add', function(){
        it('should return true', inject(function() {

            scope.add(
                scope.tree[0]
            );
            expect(scope.tree[0].nodes.length > 0).toBeTruthy();
        }));
    });

    describe('recursive remove', function(){
        it('should return true', inject(function() {

            scope.remove(
                scope.tree[0]
            );
            expect(scope.tree[0].nodes).toBeDefined();
        }));
    });

    describe('recursive remove', function(){
        it('should return true', inject(function() {

            scope.toggleNodes(
                scope.tree[0]
            );
            expect(scope.tree[0].nodes).toBeDefined();
        }));
    });

    describe('recursive start editing', function(){
        it('should return true', inject(function() {

            scope.showEdit(scope.tree[0]);
            expect(scope.tree[0].edit).toBeTruthy();
        }));
    });

    describe('recursive start editing', function(){
        it('should return true', inject(function() {

            var data = scope.tree[0];

            scope.tree[0].title = "New title" + Math.random();
            scope.submitEdit(scope.tree[0]);
            expect(data.title != scope.tree[0].title).toBeFalsy();
        }));
    });

});