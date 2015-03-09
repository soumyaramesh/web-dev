var app = angular.module("DeveloperApp", []);
app.controller("DeveloperController", function ($scope, $http) {
    $http.get("/book")
        .success(function (response) {
            $scope.books = response;
        });

    $scope.remove = function (id) {
        $http.delete("/book/" + id)
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
        //$http.delete("/book/" + $scope.selectedIndex + "/chapter/" + chapIndex)
        //.success(function (response) {
        //    $scope.books = response;
        //    $scope.book = response[$scope.selectedIndex];
        //})
        $scope.book.chapters.splice(chapIndex, 1);
        $http.put("/book/" + $scope.book._id, $scope.book)
       .success(function (response) {
           $scope.books = response;
       })
    }



    $scope.updateBook = function (book) {
        $http.put("/book/" + $scope.book._id, $scope.book)
        .success(function (response) {
            $scope.books = response
        })
    }

    $scope.addChapter = function (chapter) {
        if (typeof $scope.book.chapters == "undefined") {
            $scope.book.chapters = [];
        }
        var newChap = {
            name: chapter.name
        }
        $http.put("/book/" + $scope.book._id, $scope.book)
        .success(function (response) {
            $scope.books = response;
        })
        $scope.book.chapters.push(newChap);
    }
});