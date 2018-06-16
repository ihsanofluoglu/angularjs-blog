'use strict';

angular.module('myApp.Category', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/category/:id', {
            templateUrl: 'Category/Category.html',
            controller: 'PostCtrl'
        });
    }])
    .controller('PostCtrl', ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.category = $routeParams;
        $http.get("http://127.0.0.1:8001/api/post/")
            .then(function (response) {
                $scope.Posts = response.data;
            });
        $http.get("http://127.0.0.1:8001/api/user/")
            .then(function (response) {
                $scope.Users = response.data;
            });
        $http.get("http://127.0.0.1:8001/api/category/")
            .then(function (response) {
                $scope.Categories = response.data;
            });
        $scope.click = function () {
            $http.get("http://127.0.0.1:8001/api/post/")
                .then(function (response) {
                    $scope.Posts = response.data;
                });
        }
    }]);