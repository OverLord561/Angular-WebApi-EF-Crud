/// <reference path="../angular.js" />

var BooksService = angular.module('BooksService', []);
//'api/ApiBooks/PutBook/
BooksService.factory('BooksApi', function($http){

    var BooksApi = {};

    BooksApi.BooksFullInfo = function()
    {
        return $http.get('api/ApiBooks/BooksFullInfo');
    };
    BooksApi.CreateBook = function (book)
    {
        return $http.post('api/ApiBooks/CreateBook', book);
    };

    BooksApi.GetGenres = function ()
    {
        return $http.get('api/ApiBooks/GetGenres');
    };

    BooksApi.BooksFullInfoByTypeId = function (bookTypeId) {
        return $http.get('api/ApiBooks/BooksFullInfo/' + bookTypeId);
    };
   

    return BooksApi;
});


