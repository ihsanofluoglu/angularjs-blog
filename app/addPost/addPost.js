/**
 * Created by ali on 03.08.2016.
 */
'use strict';

angular.module('myApp.addPost', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-post', {
            templateUrl: 'addPost/addPost.html',
            controller: 'addCatCtrl'
        });
    }])
    .controller('addPostCtrl', ["$scope", "$routeParams", "$http", function ($scope, $routeParams, $http) {
        $scope.tokens = window.sessionStorage.getItem("token");
        $scope.id = window.sessionStorage.getItem("id");

        $http.get("http://127.0.0.1:8001/api/category/")
            .success(function (data, status, headers, config) {
                $scope.categories = data;
            });

        $scope.save = function (cat, title, content) {
            $scope.cat = angular.copy(cat);
            $scope.title = angular.copy(title);
            $scope.content = angular.copy(content);

            var day = "2016-01-31T23:00:00Z";

            var data = $.param({
                post_cat: $scope.cat,
                post_author:$scope.id,
                post_title: $scope.title,
                post_content: $scope.content,
                post_updatedAd: day,
                post_like: 0,
                post_dislike: 0
            });
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'WWW-Authenticate': 'Token ' + $scope.tokens
                }
            };
            $http.post("http://127.0.0.1:8001/api/post/", data, config)
                .success(function (data, status, headers, config) {
                    $scope.dat = data;
                    $scope.status = status;
                    if(status == 201) {
                        location.reload();
                        window.location = "#!/index";
                    }
                    else {
                        $scope.dat = "İzniniz Bulunmamaktadır."
                    }
                })
                .error(function (data, status, header, config) {
                    $scope.dat = status;
                    if(status == 400) {
                        $scope.error = "izniniz bulunmamaktadır."
                    }
                });
        }
    }]);
