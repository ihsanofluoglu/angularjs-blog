/**
 * Created by ali on 01.08.2016.
 */
'use strict';

angular.module('myApp.Login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'Login/login.html',
            controller: 'LoginCtrl'
        });
    }])
    .controller('LoginCtrl', ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.master_username = "";
        $scope.master_password = "";

        $scope.login = function (username, password) {
            $scope.master_username = angular.copy(username);
            $scope.master_password = angular.copy(password);

            var data = $.param({
                username: $scope.master_username,
                password: $scope.master_password
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            $http.post("http://127.0.0.1:8001/api/auth/", data, config)
                .success(function (data, status, headers, config) {
                    $scope.PostDataResponse = data;
                    sessionStorage.setItem("token", $scope.PostDataResponse.token);
                    sessionStorage.setItem("id", $scope.PostDataResponse.id);
                    location.reload();
                    window.location = "#!/index";
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
        }
    }]);
