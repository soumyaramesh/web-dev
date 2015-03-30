var app = angular.module("MainApp", ["ngRoute"]);

(app.config(function ($routeProvider, $httpProvider) {
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
      .when('/newpost', {
          templateUrl: 'views/new_post/newpost.html',
          controller: 'NewpostCtrl'
      })
        .when('/rest/user/:id', {
            templateUrl: 'views/userinfo/userinfo.html',
            controller:'UserCtrl'
        })
        .when('/rest/postinfo/:content', {
            templateUrl: 'views/postinfo/postinfo.html',
            controller: 'PostInfoCtrl'
        })
      .otherwise({
          redirectTo: '/home'
      });
})
    );


var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
            // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

app.controller("MainCtrl", function ($scope, $http, $location) {
    

    $http.get("/rest/users")
                    .success(function (response) {
                        $scope.users = response;
                    });


    $http.get('/rest/posts')
        .success(function (response) {
            $scope.posts = response;
        });


    
        


    $http.get('/rest/tags')
        .success(function (response) {
            $scope.tags = response;
        });

    $scope.getTagById = function (id) {
        $http.get('/rest/tag/' + id)
            .success(function (response) {
                $scope.tag = response;
            });
    };


    $scope.incrementUpvotes = function (post) {
        $http.put('/rest/posts/' + post._id + '/vote')
        .success(function (response) {
            post.upvotes += 1
        });
    }

    $scope.decrementUpvotes = function (post) {
        $http.put('/rest/posts/' + post._id + '/vote')
        .success(function (response) {
            post.upvotes -= 1
        });
    }

   

    $scope.getCommentsByContent = function (content) {
        $http.get('/rest/' + content + '/comments')
        .success(function (response) {
            $scope.comments = response;
        });
    }

});






