var dane = {
    "pracownicy":[
  {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "dateOfBirth": "1.7.1990 11:35",
    "company": "XSolve",
    "note": 90
  },
  {
    "id": 4,
    "firstName": "Justyna",
    "lastName": "Kowalska",
    "dateOfBirth": "4.02.1976 14:37",
    "company": "XSolve",
    "note": 91
  },
  {
    "id": 2,
    "firstName": "Krzysztof",
    "lastName": "Krawczyk",
    "dateOfBirth": "28.10.1950 2:15",
    "company": "Chilid",
    "note": 27
  },
  {
    "id": 3,
    "firstName": "Bogusław",
    "lastName": "Linda",
    "dateOfBirth": "03.01.1963 23:10",
    "company": "XSolve",
    "note": 50
  },
  {
    "id": 5,
    "firstName": "Krzysztof",
    "lastName": "Kononowicz",
    "dateOfBirth": "10.10.1910 18:00",
    "company": "Chilid",
    "note": 77
  },
  {
    "id": 6,
    "firstName": "Maryla",
    "lastName": "Rodowicz",
    "dateOfBirth": "29.02.1936 11:35",
    "company": "XSolve",
    "note": 8
  },

  {
    "id": 7,
    "firstName": "Edyta",
    "lastName": "Górniak",
    "dateOfBirth": "14.11.1972 06:35",
    "company": "XSolve",
    "note": 25
  },
  {
    "id": 8,
    "firstName": "Dawid",
    "lastName": "Podsiadło",
    "dateOfBirth": "23.05.1993 16:15",
    "company": "Chilid",
    "note": 19
  },
  {
    "id": 9,
    "firstName": "Elvis",
    "lastName": "Presley",
    "dateOfBirth": "09.01.1935 01:35",
    "company": "XSolve",
    "note": 8
  },
]
    };

window.onload = function () {
    paginateStart();
    navButtons();
};

//Create rows with json data
dane.pracownicy.forEach(function (element, index) {
    $(".js-table__cont").append("<tr class='datatable__item js-table__item'>" + "<td class='datatable__bit'>" + element.id + "</td>" + "<td class='datatable__bit'>" + element.firstName + "</td>" + "<td class='datatable__bit'>" + element.lastName + "</td>" + "<td class='datatable__bit'>" + element.dateOfBirth + "</td>" + "<td class='datatable__bit'>" + element.company + "</td>" + "<td class='datatable__bit'>" + element.note + "</td>" + '</tr>')
});

//On clicking top row elements sort them
$('th').click(function(){
    var table = $(this).parents('.js-table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
     if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    this.asc = !this.asc
    $('.active').trigger("click");
});

//Compare cells from one column
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index); 
        var valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
};

function getCellValue(row, index){ 
    return $(row).children('td').eq(index).text() 
};

//Pagination
function paginateStart(){
        var i;
        $('.js-table').after('<div class="datatable__nav js-table__nav"><button class="datatable__back js-table__back">< back</button><button class="datatable__next js-table__next">next ></button</div>');
        var rowsShown = 5;
        var rowsTotal = $('.js-table .js-table__cont .js-table__item').length;
        var numPages = rowsTotal/rowsShown;
        for(i = 0;i < numPages;i++) {
            var pageNum = i + 1;
            $('.js-table__next').before('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
        }
        $('.js-table .js-table__cont .js-table__item').hide();
//    Show only 5 first rows
        $('.js-table .js-table__cont .js-table__item').slice(0, rowsShown).show();
       $('.js-table__nav a:first').addClass('active');
    
//    Distribute rows between table pages
    $('.js-table__nav a').bind('click',function () {
            $('.js-table__nav a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('.js-table .js-table__cont .js-table__item').css('opacity','0.0').hide().slice(startItem, endItem).
                    css('display','table-row').animate({opacity:1}, 300);
        });
    };

//Navigation buttons
function navButtons(){
$('.js-table__next').click(function () {
$('.active').nextUntil("button").trigger('click');
});
$('.js-table__back').click(function () {
$('.active').prevUntil("button").trigger('click');
})
};

