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

    BooksApi.DetailsBook = function (bookId) {
        return $http.get('api/ApiBooks/GetBookById/' + bookId);
    };

    BooksApi.BooksFullInfoByTypeId = function (bookTypeId) {
        return $http.get('api/ApiBooks/BooksFullInfo/' + bookTypeId);
    };
    //url: 'api/ApiBooks/PutBook/'
    BooksApi.EditBook = function (bookToUpdate)
    {
        var request = $http({
            method: 'put',
            url: 'api/ApiBooks/PutBook/' + bookToUpdate.Id,
            data: bookToUpdate
        });
        return request;
    };
   
    BooksApi.DeleteBook = function (bookId)
    {
        var request = $http({
            method: 'delete',
            url: 'api/ApiBooks/DeleteBook/' + bookId           
        });
        return request;
    };
    return BooksApi;
});


