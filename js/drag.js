$(document).ready(function () {
    
    $('body').on('mouseover', '#draggable',
        function(){ 
            $(this).draggable({
                containment: ".board"
            }); 
    });
    
    $('body').on('dblclick',".item-zag", function(){
        $(this).prop('disabled', false);
        $(this).focus();
    });
    $('body').on('blur',".item-zag", function(){
        $(this).prop('disabled', true);
    });
    
    $('body').on('dblclick',".datepicker", function(){
        $(this).prop('disabled', false);
        $(this).focus();
    });
    $('body').on('blur',".datepicker", function(){
        $(this).prop('disabled', true);
    });
    
    $('body').on('focus',".datepicker", function(){
        $(this).datepicker({
            constrainInput: true,
            minDate: "0",
            dateFormat: "dd.mm.yy"
        });
        
    });
    
    var sortable_array;
    $('.list-board').each(function(e){
        if (!sortable_array){
            sortable_array = '#' + $(this).attr("id");;
        } else {
            sortable_array = sortable_array + ', #' + $(this).attr("id");;
        }
    });

    $.ajax({complete: function() {
                $(''+ sortable_array +'').sortable({
                    connectWith: ''+ sortable_array +'',
                    update: function(event, ui) {
                        var currect_list = $(this).parent('.list');
                        var list_id = $(this).parent('.list').attr('data-id');
                        var list_array = [];
                        
                        var data = localStorage.getItem("data");
                        data = JSON.parse(data);
                        
                        var task_index;
                        data['task'].some(function(item, index){
                            if (item['id'] == list_id){
                                task_index = index;
                                return item;
                            }
                        });
                        
                        currect_list.children('.list-board').children('.list-item').each(function(){
                            let e_id = $(this).attr('data-id');
                            let e_text = $(this).children('.item-zag').val();
                            let e_date = $(this).children('.time').children('.calendar').val();
                            list_array.push({id: e_id, text: e_text, data: e_date});
                        });
            
                        data['task'][task_index]['item'] = list_array;
                        localStorage.setItem("data", JSON.stringify(data));
                        console.log(list_array);
                    },
                });
          }
    });
});