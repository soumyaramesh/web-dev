var app = angular.module('postinfoApp', []);

app.controller('PostInfoCtrl', function ($scope, $http, $routeParams, $location, UserService) {
    $scope.initial = function () {
        console.log($routeParams.id);
        getPostByContent($routeParams.id);

        
    }
    var getPostByContent = function (id) {
        {
            $http.get('/post/' + id)
                .success(function (response) {
                    console.log(response);
                    $scope.post = response;

                });
        }
    };

    $scope.incrementCommentUpvotes = function (comment) {
        $http.put('/comment/' + comment._id + '/uvote')
        .success(function (response) {
            comment.upvotes += 1
        });
    }

    $scope.decrementCommentUpvotes = function (comment) {
        $http.put('/comment/' +  comment._id + '/dvote')
        .success(function (response) {
            comment.upvotes -= 1
        });
    }

    $scope.addComment = function (newcomment) {
        $http.post('/rest/post/'+ '/comment', newcomment)
        .success(function (response) {
            $scope.post = response;
            $location.url('/rest/postinfo/' + $routeParams.postid);

        });
    }

    
})

