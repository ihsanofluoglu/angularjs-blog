/**
 * Created by ali on 02.08.2016.
 */
'use strict';

angular.module('myApp.addCat', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-cat', {
            templateUrl: 'addCat/addCat.html',
            controller: 'addCatCtrl'
        });
    }])
    .controller('addCatCtrl', ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.tokens = window.sessionStorage.getItem("token");
        $http.post("http://127.0.0.1:8001/api/users/", {token:$scope.tokens})
            .success(function (data, status, headers, config) {
                $scope.er = status;
            })
            .error(function (data, status, header, config) {
                $scope.er = "status: " + status;
            });

        $scope.save = function (cat) {
            $scope.cat = angular.copy(cat);
            var data = $.param({
                cat_title: $scope.cat
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'WWW-Authenticate': 'Token ' + $scope.tokens
                }
            };
            if($scope.er == 200) {
                $http.post("http://127.0.0.1:8001/api/category/", data, config)
                    .success(function (data, status, headers, config) {
                        $scope.dat = data;
                        location.reload();
                        window.location = "#!/index";
                    })
                    .error(function (data, status, header, config) {
                        $scope.dat = "Data: " + data +
                            "<hr />status: " + status +
                            "<hr />headers: " + header +
                            "<hr />config: " + config;
                    });
            } else {
                $scope.error = "İzniniz Bulunmamaktadır.";
            }
        }
    }]);
