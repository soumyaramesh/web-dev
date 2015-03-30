﻿var app = angular.module('PassportApp', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home/home.html'
    })
    .when('/profile', {
        templateUrl: 'views/profile/profile.html',
        resolve: {
            loggedin: checkLoggedin
        }
    })
     .when('/login', {
         templateUrl: 'views/login/login.html',
         controller: 'LoginCtrl'
     })
    .when('/register', {
        templateUrl: 'views/register/register.html',
        controller: 'RegisterCtrl'
    })

    .otherwise({
        redirectTo: '/home'
    });
});

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        if(user!='0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else {
            $rootScope.errorMessage = "Please log in";
            deferred.reject();
            $location.url('/login');
        }
    })
}




