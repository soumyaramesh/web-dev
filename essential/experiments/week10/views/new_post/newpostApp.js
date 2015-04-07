var app = angular.module('newpostApp', [])


app.controller("NewpostCtrl", function ($scope, $http,$location,$rootScope) {
    $scope.submitPost = function (newpost) {
            $http.post("/rest/post", newpost)
            .success(function (response) {
                $rootScope.posts = response;
                $location.url('/home');
        
            });
        }
});