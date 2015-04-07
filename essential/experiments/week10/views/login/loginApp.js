var app = angular.module('loginApp',[])

app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope,UserService) {
    $scope.login = function (user) {
        //console.log(user);
        
        $http.post("/login", user)
        .success(function (response) {
            //console.log(response);
            $rootScope.currentUser = response;
            
            UserService.login(response);
            //console.log($rootScope.currentUser);
            $location.url("/profile");
        });
        
    }
});