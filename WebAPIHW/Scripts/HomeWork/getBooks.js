$(document).ready(function () {
    new BooksFullInfo();
    new GetGenres();

    $('#ShowCreateForm').on('click', function () {
        document.getElementById('divCreateNewBook').style.visibility='visible';
    });
    $('#buttonEditBook').on('click', function (ev) {
        ev.preventDefault();

        var info = $('#formEditBook').serializeArray();

        book = {};

        for (var key in info) {
            book[info[key].name] = info[key].value;
        }

        $.ajax(
            {
                url: 'api/ApiBooks/PutBook/'+ ev.currentTarget.dataset['id'] ,

                type: "PUT",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(book),
                async: true,
                success: function (data) {
                    $('#MyTable').empty();
                    BooksFullInfo();
                    document.getElementById('divEditBook').style.visibility = 'hidden';
                },

                processData: false,
                cache: false
            })



    });
    $('#buttonCreateNewBook').on('click', function (ev) {
        ev.preventDefault();
        var info = $('#formCreateNewBook').serializeArray();
              
        item = {};

        for (var key in info) {
            item[info[key].name] = info[key].value;
        }
              
        $.ajax(
            {
                url: 'api/ApiBooks/CreateBook',
               
                type: "POST",
                contentType: 'application/json; charset=utf-8',              
                data: JSON.stringify(item),
                async: true,
                success: function (data)
                {
                    var dvTable = document.getElementById('BooksTable');

                    var row = dvTable.insertRow(-1);
                    

                    for (var key in data) {
                        var cell = row.insertCell(-1);

                        cell.innerText = data[key];

                        cell.className = 'col-lg-2';
                        cell.style.paddingTop = '5px';
                    }

                    DrawCrud(row, data);

                    document.getElementById('divCreateNewBook').style.visibility = 'hidden';
                   
                         
                },
                error : function()
                {
                    alert('Current book type does not exist!!!');
                },
                processData: false,
                cache: false
            })
        
    });
    $('#ShowAll').on('click', function(){
        $('#MyTable').empty();
        BooksFullInfo();
    } );

    function onGenreChange(bookTypeId) {
        $.ajax({
            url: 'api/ApiBooks/BooksFullInfo/' + bookTypeId,
            type: 'GET',
            datatype: "json",
            async: true,
            success: function (data) {

                $('#MyTable').empty();
                DrawTable(data);

            }
        });
    }
    function createTH()
    {
        return document.createElement('th');
    }    
    function GetGenres() {
        $.ajax({
            url: 'api/ApiBooks/GetGenres',
            type: 'GET',
            datatype: "json",
            success: function (data) {
                var dropDown = document.getElementById('MyDropdown');

                $.each(data, function (index, item) {
                    var li = document.createElement('li');
                    li.innerText = item.Genre;

                    li.addEventListener('click', function () {
                        onGenreChange(item.BookTypeId);
                    });

                    dropDown.appendChild(li);

                });

            }

        });
    };
    function DrawTable(data)
    {
        var tableDOM = document.getElementById('MyTable');

        var dvTable = document.createElement('table');
        dvTable.id = "BooksTable";
        dvTable.className = 'table table-striped';

        var tableHead = document.createElement('tr');

        var Id = createTH();
        Id.innerText = 'Id';
        Id.className = 'col-lg-1'

        var Name = createTH();
        Name.innerText = 'Name';
        Name.className = 'col-lg-3';

        var Age = createTH();
        Age.innerText = 'Age';
        Age.className = 'col-lg-2';

        var Book_Type = createTH();
        Book_Type.innerText = 'Type';
        Book_Type.className = 'col-lg-2';

        var Author_Name = createTH();
        Author_Name.innerText = 'Author';
        Author_Name.className = 'col-lg-2';
        

        var Publication = createTH();
        Publication.innerText = 'Publication';
        Publication.className = 'col-lg-2';

        var CRUD = createTH();
        CRUD.innerText = 'CRUD';
        CRUD.className = 'col-lg-1';
               


        tableHead.appendChild(Id);
        tableHead.appendChild(Name);
        tableHead.appendChild(Age);
        tableHead.appendChild(Book_Type);
        tableHead.appendChild(Author_Name);
        tableHead.appendChild(Publication);
        tableHead.appendChild(CRUD);


        dvTable.appendChild(tableHead);

        tableDOM.appendChild(dvTable);        

        $.each(data, function (index, item) {
            var row = dvTable.insertRow(-1);
           
            for (var key in item) {
                var cell = row.insertCell(-1);
                cell.innerText = item[key];
               
                cell.className = 'col-lg-2';
                cell.style.paddingTop = '5px';
            }

            var crudcell = row.insertCell(-1);

            DrawCrud(crudcell, item);
                        

        });

    };  
    function DrawCrud(crudcell, item)
    {
        var editIcon = document.createElement('span');
        editIcon.className = "glyphicon glyphicon-pencil";
        editIcon.style.margin = '0 2px 0 2px';
        editIcon.addEventListener('click', function () {

            EditBook(item);
        });

        var deleteIcon = document.createElement('span');
        deleteIcon.className = "glyphicon glyphicon-remove";
        deleteIcon.style.margin = '0 2px 0 2px';
        deleteIcon.addEventListener('click', function () {

            DropBook(item['Id']);
        });
        

        var detailsIcon = document.createElement('span');
        detailsIcon.className = "glyphicon glyphicon-list";
        detailsIcon.style.margin = '0 2px 0 2px';
        detailsIcon.addEventListener('click', function () {

            DetailsBook(item.Id);
        });


        crudcell.appendChild(editIcon);
        crudcell.appendChild(deleteIcon);
        crudcell.appendChild(detailsIcon);
    };
    function BooksFullInfo()
    {
        $.ajax({

            url: 'api/ApiBooks/BooksFullInfo',
            type: 'GET',
            datatype: "json",
            success: function (data) {
                DrawTable(data);
            }
        });
    };
    function DropBook(bookId)
    {
        $.ajax({
            url: 'api/ApiBooks/DeleteBook/' + bookId,
            type: 'DELETE',
            datatype: "json",
            async: true,
            success: function (data) {

                $('#MyTable').empty();
                new BooksFullInfo();;

            }
        });       
       
    };
    function EditBook(item) {

        document.getElementById('divEditBook').style.visibility = "visible"; 
        document.getElementById('buttonEditBook').dataset['id'] = item.Id;

        document.getElementById('EditName').value = item.Name;
        document.getElementById('EditAge').value = item.Age;
        document.getElementById('EditPublication').value = item.Publication;

       
    };
    function DetailsBook(bookId) {

        $.ajax({
            url: 'api/ApiBooks/GetBookById/' + bookId,
            type: 'GET',
            datatype: "json",
            async: true,
            success: function (data) {

                $('#MyTable').empty();
                DrawTable(data);

            }
        });
    };


});