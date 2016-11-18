/// <reference path="../angular.js" />

var MyApp = angular.module("MyApp", ['ngRoute', 'BooksService']);

MyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/Add', {
            templateUrl: '/Home/Add',
            controller: 'AddController'
        }).
        when('/Edit', {
            templateUrl: '/Home/Edit',
            controller: 'EditController'
        }).
        when('/Details', {
            templateUrl: '/Home/Details',
            controller: 'DetailsController'
        }).
        when('/Books', {
            templateUrl: 'Home/Books',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/Books'
        });
    }]);


MyApp.controller("AddController", function ($scope, BooksApi) {

    $scope.addBook = function ()
    {
        var bookModel = {
            'Id': $scope.id,
            'Name': $scope.name,
            'Age': $scope.age,
            'Book_Type': $scope.book_type,
            'Author_Name': $scope.author_Name,
            'Publication': $scope.publication
        };
        
        BooksApi.CreateBook(bookModel)
            .success(function (response) {
                alert('book added');

                $scope.name = undefined,
                $scope.age = undefined,
                $scope.book_type = undefined,
                $scope.author_Name = undefined,
                $scope.publication = undefined;
            })
            .error(function (response)
            {
                alert('Current book type does not exist!!!');
            });
    };
   

});
MyApp.controller("EditController", function ($scope, BooksApi) {

    $scope.selectedItem = "Select Book";
    $scope.isDeleteItemVisible = false;
    getBooks();

    function getBooks()
    {
        BooksApi.BooksFullInfo().success(function (books) {
           
            $scope.books = books;           
           
        })
       .error(function (error) {
           $scope.status = 'Unable to load books data' + error.message;
       })

    };

    $scope.dropboxitemselected = function (item)
    {
        $scope.isDeleteitemVisible = true;
        $scope.selectedItem = item.Name;
        $scope.name = item.Name;
        $scope.age =  item.Age;        
        $scope.publication = item.Publication;
        $scope.id = item.Id;
    };

    $scope.UpdateBook = function(){
        var bookToUpdate =
            {
                'Id': $scope.id,
                'Name': $scope.name,
                'Age': $scope.age,                
                'Publication': $scope.publication
            };
    
    BooksApi.EditBook(bookToUpdate)
        .success(function (response) {
      
            alert('book updated');
            
       
            $scope.name = undefined,
            $scope.age = undefined,           
            $scope.publication = undefined;
            $scope.isDeleteitemVisible = false;
            $scope.selectedItem = "Select Book";

        }).
            error(function (response)
            {
                alert('Current book does not exist!!!');
            });
    };
});
MyApp.controller("DetailsController", function ($scope, BooksApi) {
    $scope.selectedItem = "Select Book";
    getBooks();

    function getBooks() {
        BooksApi.BooksFullInfo().success(function (books) {

            $scope.books = books;

        })
       .error(function (error) {
           $scope.status = 'Unable to load books data' + error.message;
       })

    };

    $scope.DeleteBook = function ()
    {

        $scope.selectedItem = "Select Book";
        BooksApi.DeleteBook($scope.id) 
        .success(function (response) {
           
            getBooks();
          
            
            $scope.id = undefined;
            $scope.book_type =  undefined;
            $scope.author_Name = undefined;
            $scope.name = undefined;
            $scope.age = undefined;           
            $scope.publication = undefined;
            alert('book deleted');
       
        }).
            error(function (response)
            {
                alert('Select book at first!!!');
            });
    };
        
    

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteitemVisible = true;
        $scope.selectedItem = item.Name;
        $scope.name = item.Name;
        $scope.age = item.Age;
        $scope.publication = item.Publication;
        $scope.id = item.Id;
        $scope.book_type =  item.Book_Type;
        $scope.author_Name = item.Author_Name;
    };

    $scope.DetailsBook = function () {        

        BooksApi.DetailsBook($scope.id)
            .success(function (response) {

                $scope.name = undefined,
                $scope.age = undefined,
                $scope.publication = undefined;
                $scope.isDeleteitemVisible = false;
                $scope.selectedItem = "Select Book";

            }).
                error(function (response) {
                    alert('Current book does not exist!!!');
                });
    };
});


MyApp.controller("HomeController", function ($scope, BooksApi) {
 
    BooksFullInfo();
    GetGenres();
    $scope.hiddenCount = document.getElementsByClassName('alert-success')[0];
    $scope.ShowAll = function ()
    {
        $scope.hiddenCount.style.visibility = "hidden";
        $scope.books = $scope.initial;
    };
    $scope.FindByTypeId = function ($event)
    {
        OnGenreChange($event.currentTarget.dataset['bookTypeId']);
    };

    function OnGenreChange(bookTypeId)
    {
        BooksApi.BooksFullInfoByTypeId(bookTypeId).success(function (booksByTypeId) {
           
            //get counts of books in type
            var count = Object.keys(booksByTypeId).length;
    
            $scope.count = count;
            $scope.Total = 'Total count: ';
            $scope.books = booksByTypeId;
           
            $scope.hiddenCount.style.visibility = "visible";
        })
       .error(function (error) {
           $scope.status = 'Unable to load booksByTypeId data' + error.message;
       })

    };


    function GetGenres()
    {
        BooksApi.GetGenres().success(function (genres)
        {
            $scope.genres = genres;
        })
        .error(function (error) {
            $scope.status = 'Unable to load genre data' + error.message;
        })
    };


    function BooksFullInfo() {       

        BooksApi.BooksFullInfo().success(function (books) {
            $scope.books = books;
            $scope.initial = books;
        })
            .error(function (error) {
                $scope.status = 'Unable to load books data' + error.message;
            })
    };
});