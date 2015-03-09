app.controller('NavController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {


    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        var user = UserService.login(username, password);
        $scope.currentUser = user;
    }

    $scope.logout = function () {
        UserService.logout();
        $scope.currentUser = null;

        console.log($location.path());
        /*Redirect to home*/
        if ($location.path() == '/profile' || $location.path() == '/profile_static') {
            $location.path('/home');
        }
        console.log($location.path());

    }
}]);