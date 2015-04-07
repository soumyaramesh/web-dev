var app = angular.module('profileApp', [])

app.controller("ProfileCtrl", function ($scope, $http, $location, $rootScope, UserService) {
   
    

    $scope.intial = function () {
        $scope.user = UserService.getCurrentUser();
        getUserPosts($scope.user._id);
    }

    var getUserPosts = function (userid) {
        $http.get('/rest/' + userid + '/posts')
        .success(function (response) {
            $scope.userposts = response;


        });
    }
    

})