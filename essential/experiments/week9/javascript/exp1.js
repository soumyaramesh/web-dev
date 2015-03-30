var app = angular.module("RoutingApp", ['ngRoute','ngSanitize']);
app.controller("RoutingController", function ($scope) {
    $scope.hello = "Hello from RC";
})

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
        }).
        when('/about', {
            templateUrl: 'partials/about.html'
        }).
        when('/codeSnippet', {
            templateUrl: 'partials/codeSnippet.html'
        }).
        when('/sourceCode', {
            templateUrl: 'partials/sourceCode.html'
        }).
        when('/references', {
            templateUrl: 'partials/references.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);