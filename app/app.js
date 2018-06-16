'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.Home',
    'myApp.Category',
    'myApp.Post',
    'myApp.addCat',
    'myApp.addPost',
    'myApp.Login',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/index'});
}]);

app.controller("myCtrl", function ($scope, $http) {
    $scope.token = window.sessionStorage.getItem("token");
    $http.get("http://127.0.0.1:8001/api/category/")
        .then(function (response) {
            $scope.Categories = response.data;
        });
    $http.get("http://127.0.0.1:8001/api/post/")
        .then(function (response) {
            $scope.Posts = response.data;
        });

    $scope.Logout = function (token) {
        $http.delete('http://127.0.0.1:8001/api/token/' + token + '/')
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
                sessionStorage.clear();
                location.reload();
                window.location = "#!/login";
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = "Data: " + data +
                    "status: " + status +
                    "headers: " + header +
                    "config: " + config;
                sessionStorage.clear();
            });
    };

    $scope.delete_cat = function (id) {
        $scope.cat_id = angular.copy(id);
        $http.post("http://127.0.0.1:8001/api/users/", {token: $scope.token})
            .success(function (data, status, headers, config) {
                $scope.er = status;

                if ($scope.er == 200) {
                    $http.delete('http://127.0.0.1:8001/api/category/' + $scope.cat_id + '/')
                        .success(function (data) {
                            $scope.ServerResponse = data;
                            location.reload();
                            window.location = "#!/index";
                        })
                        .error(function (data, status, header, config) {
                            $scope.ServerResponse = "Data: " + data +
                                "status: " + status +
                                "headers: " + header +
                                "config: " + config;
                            sessionStorage.clear();
                        });
                }
                else {
                    $scope.error = "İzniniz Bulunmamaktadır.";
                }
            });
    };

    $scope.register = function(username, password, email) {
        $scope.username = angular.copy(username);
        $scope.password = angular.copy(password);
        $scope.email = angular.copy(email);

        var data = $.param({
            username : $scope.username,
            password : $scope.password,
            email : $scope.email,
            is_active : "true"
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            }
        };
        $http.post("http://127.0.0.1:8001/api/user/", data, config)
            .success(function (data, status, headers, config) {
                $scope.dat = data;
                location.reload();
                window.location = "#!/login";
            })
            .error(function (data, status, header, config) {
                $scope.dat = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    }
});
