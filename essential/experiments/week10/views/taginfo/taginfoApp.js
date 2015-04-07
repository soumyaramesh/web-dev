var app = angular.module('taginfoApp',[])

app.controller('TagInfoCtrl', function ($scope, $http, $routeParams) {
    $scope.initial = function () {
        console.log($routeParams.id);
        getPostsByTag($routeParams.id);
    }

    var getPostsByTag = function (id) {
        {
            $http.get('/post/tag/' + id)
                .success(function (response) {
                    console.log(response);
                    $scope.posts = response;

                });
        }
    };
})
