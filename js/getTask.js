$(document).ready(function () {
    
    getTask();
});

function getTask() {
    
    var add_html = 
    '<div class="new_list">'+
        '<p>Создать новую колонку</p>'+
        '<img src="pics/plus.png" alt="add">'+
    '</div>';
    
    if (!localStorage.getItem("data")){
        localStorage.setItem("data", JSON.stringify({ task: []}));
        $('.board-list').append(add_html); 
    } else {
        var data = localStorage.getItem("data");
        data = JSON.parse(data);
        
        if (Object.keys(data['task']).length > 0){
            data['task'].forEach(function(task){
                var task_html = '';
                task['item'].forEach(function(item){
                    if (!!item['id'] !== false){
                        task_html = task_html + 
                        '<div class="list-item sortable" data-id="'+ item['id'] +'" id="'+ item['id'] +'">'+
                            '<textarea placeholder="Новый пункт" rows="1" cols="20" wrap="hard" class="item-zag" maxlength="40" disabled >'+ item['text'] +'</textarea>'+
                            '<div class="time">'+
                                '<img src="pics/stopwatch.png" class="cal_img">'+
                                '<input type="text" value="'+ item['data'] +'" class="datepicker calendar" disabled/>'+
                            '</div>'+
                            '<img src="pics/cross.png" class="delete-item">' +
                        '</div>'
                    }                
                });
                
                $('.board-list').append(
                    '<div class="list" data-id="'+ task['id'] +'" >' +
                        '<div class="list-header">' +
                            '<input type="text" placeholder="Новая задача" value="'+ task['title'] +'" maxlength="26" class="task-text">' +
                        '</div>'+
                        '<div class="list-board" id="'+ task['id'] +'">'+
                            task_html + 
                        '</div>'+
                        '<div class="new-list-item">'+
                            '<p>Добавить пункт</p>'+
                            '<img src="pics/plus.png">'+
                        '</div>'+
                        '<img src="pics/delete.png" id="list_delete">'+
                    '</div>'
                )
            })
            $('.board-list').append(add_html);
        } else {
            $('.board-list').append(add_html); 
        }
    }
};