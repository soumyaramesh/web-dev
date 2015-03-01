var app = angular.module("DeveloperApp", []);
app.controller("DeveloperController", function ($scope, $http) {
    $http.get("/book")
        .success(function (response) {
            $scope.books = response;
        });

    $scope.remove = function (index) {
        $http.delete("/book/" + index)
        .success(function (response) {
            $scope.books = response;
        });
    };


    $scope.addBook = function (book) {
        $http.post("/book", book)
        .success(function (response) {
            $scope.books = response;
        });
    }

    $scope.selectedIndex = null;

    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.book = $scope.books[index]
    }

    $scope.removeChapter = function (chapIndex) {
        $http.delete("/book/" + $scope.selectedIndex + "/chapter/" + chapIndex)
        .success(function (response) {
            $scope.books = response;
            $scope.book = response[$scope.selectedIndex];
        })
    }



    $scope.updateBook = function (book) {
        $http.put("/book/" + $scope.selectedIndex, book)
        .success(function (response) {
            $scope.books = response
        })
    }
});