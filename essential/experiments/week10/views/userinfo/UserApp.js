app.controller('UserCtrl', function ($scope, $http, $location, $rootScope,$routeParams) {

    $scope.intial = function () {
        $scope.thisuser = getUserById($routeParams.id);
        $scope.userposts = getUserPosts($routeParams.id);
       
    }

    var getUserById = function (id) {
        $http.get('/rest/user/' + id)
        .success(function (response) {
            $scope.user = response;
        });
    };

    var getUserPosts = function (userid) {
        $http.get('/rest/' + userid + '/posts')
        .success(function (response) {
            $scope.userposts= response;

        });
    }
   
    

   
})

