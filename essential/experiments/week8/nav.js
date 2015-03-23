app.controller("NavCtrl", function ($scope, $http, $location) {
    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $location.url("/home");
        });
    }
});