function createHtmlNewTask(task_index) {
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    $('.new_list').before(
        '<div class="list" data-id="' + data['task'][task_index]['id'] + '">' +
            '<div class="list-header">' +
                '<input type="text" placeholder="Новая задача" value="' + data['task'][task_index]['title'] + '" maxlength="26" class="task-text">' +
            '</div>' +
            '<div class="list-board" id="' + data['task'][task_index]['id'] + '"></div>' +
            '<img src="pics/delete.png" id="list_delete">' +
            '<div class="new-list-item">' +
                '<p>Добавить пункт</p>' +
                '<img src="pics/plus.png">' +
            '</div>' +
        '</div>'
    )
};
function removeHtmlTask(task_id) {
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    $('[data-id="'+task_id+'"]').remove();
};
function createHtmlNewItemTask(task_index, task_item_index, task_id) {
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    $('[data-id="'+task_id+'"]').children('.list-board').append(
        '<div class="list-item sortable" data-id="'+ data['task'][task_index]['item'][task_item_index]['id'] +'" id="'+ data['task'][task_index]['item'][task_item_index]['id'] +'">'+
            '<textarea placeholder="Новый пункт" rows="1" cols="20" wrap="hard" class="item-zag" maxlength="40">'+ data['task'][task_index]['item'][task_item_index]['text'] +'</textarea>'+
            '<div class="time">'+
                '<img src="pics/stopwatch.png" class="cal_img">'+
                '<input type="text" value="'+ data['task'][task_index]['item'][task_item_index]['data'] +'" class="datepicker calendar" disabled/>'+
            '</div>'+
            '<img src="pics/cross.png" class="delete-item">' +
        '</div>'
    )  
};
function removeHtmlItemTask(task_item_id) {
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    $('[data-id="'+task_item_id+'"]').remove();
};