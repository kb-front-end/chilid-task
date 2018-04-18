window.onload = function () {
    getData();
};

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
        $('.js-table').after('<div class="datatable__nav js-table__nav"><button class="datatable__back js-table__back">< back</button><button class="datatable__next js-table__next">next ></button></div>');
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
//after pagination sort by id and reset Navpage
    $('.active').trigger("click");
    $('th').eq(0).trigger('click');
    $('th').eq(0).trigger('click');
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

if($(window).width() <= 760){
    sortName();  
};

//show "Sort by:"
function sortName(){
    $('.datatable__item').eq(0).before('<p style="text-align:center;margin:3px 0;">Sort by:</p>');
    
};

//get data from json file
function getData(){
    $.ajax({
        type:'GET',
        dataType: 'json',
        url:'https://kb-front-end.github.io/chilid-task/dane/db.json',
        success: function(employees){
            $.each(employees, function (index, element) {
    $(".js-table__cont").append("<tr class='datatable__item js-table__item'>" + "<td class='datatable__bit'>" + element.id + "</td>" + "<td class='datatable__bit'>" + element.firstName + "</td>" + "<td class='datatable__bit'>" + element.lastName + "</td>" + "<td class='datatable__bit'>" +  element.dateOfBirth + "</td>" + "<td class='datatable__bit'>" + element.company + "</td>" + "<td class='datatable__bit'>" + element.note + "</td>" + '</tr>');
});
    paginateStart();
    navButtons();
        },
        error: function(){
        alert('ERROR! Data unaccesible.')
    }
    });
};
