$(document).ready(function () {
    
    $(document).on('click', '.new_list', function(){
        
        addNewTask();
    });
    
    $(document).on('click', '#list_delete', function(){
        
        const task_id = $(this).parent('.list').attr('data-id');
        deleteTask(task_id);
        
    });
    
    $(document).on('click', '.new-list-item', function(){
        
        var task_id = $(this).parent('.list').attr('data-id');
        addTaskItem(task_id);
        
    });
    
    $(document).on('click', '.delete-item', function(){
        
        var task_item_id = $(this).parent('.list-item').attr('data-id');
        var task_id = $(this).parent('.list-item').parent('.list-board').parent('.list').attr('data-id');
        deleteTaskItem(task_item_id, task_id);
        
    });
    
    $(document).on('change', '.item-zag', function(){
        
        var task_item_text = $(this).val();
        var task_item_id = $(this).parent('.list-item').attr('data-id');
        var task_id = $(this).parent('.list-item').parent('.list-board').parent('.list').attr('data-id');
        
        updateTaskItem(task_item_id, task_id, task_item_text);
        
    });
    
    $(document).on('change', '.calendar', function(){
        
        var task_date = $(this).val();
        var task_item_id = $(this).parent('.time').parent('.list-item').attr('data-id');
        var task_id = $(this).parent('.time').parent('.list-item').parent('.list-board').parent('.list').attr('data-id');
        
        updateTaskDate(task_date, task_id, task_item_id)
        
    });
    
    $(document).on('change', '.task-text', function(){
        
        var task_text = $(this).val();
        var task_id = $(this).parent('.list-header').parent('.list').attr('data-id');
        
        updateTask(task_id, task_text);
    });  
    
});

function addNewTask() {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    data['task'].push({id: getRandomInRange(1, 5000), title: 'Новая задача', item: []});
    localStorage.setItem("data", JSON.stringify(data));
    createHtmlNewTask(data['task'].length - 1);
};

function deleteTask(task_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    task_id = parseInt(task_id);
    data['task'] = data['task'].filter(function(item){
        return item['id'] !== task_id;
    });
    localStorage.setItem("data", JSON.stringify(data));
    removeHtmlTask(task_id);
};

function updateTask(task_id, task_text) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var task_index;
    data['task'].some(function(item, index){
        if (item['id'] == task_id){
            task_index = index;
            return item;
        }
    });

    data['task'][task_index]['title'] = task_text;
    localStorage.setItem("data", JSON.stringify(data));
};

function addTaskItem(task_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var currect_date = new Date();
    var Year = currect_date.getFullYear();
    var Month = currect_date.getMonth() + 1;
    var Day = currect_date.getDate();
    
    var task_index;
    data['task'].some(function(item, index){
        if (item['id'] == task_id){
            task_index = index;
            return item;
        }
    });
    
    var random_int = getRandomInRange(1, 5000) 
    
    data['task'][task_index]['item'].push({id: random_int, text: 'Новый пункт', data: Day+"."+Month+"."+ Year});
    
    
    var task_item_index;
    data['task'][task_index]['item'].some(function(item, index){
        if (item['id'] == random_int){
            task_item_index = index;
            return item;
        }
    });
    localStorage.setItem("data", JSON.stringify(data));
    createHtmlNewItemTask(task_index, task_item_index, task_id);
    console.log(data['task']);
};

function deleteTaskItem(task_item_id, task_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var task_index;
    data['task'].some(function(item, index){
        if (item['id'] == task_id){
            task_index = index;
            return item;
        }
    });
    
    task_item_id = parseInt(task_item_id);
    var item_array = data['task'][task_index]['item'];
    item_array = item_array.filter(function(item){
        return parseInt(item['id']) !== task_item_id;
    });
    
    data['task'][task_index]['item'] = item_array;
    localStorage.setItem("data", JSON.stringify(data));
    removeHtmlItemTask(task_item_id);
};

function updateTaskItem(task_item_id, task_id, task_item_text) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var task_index;
    data['task'].some(function(item, index){
        if (item['id'] == task_id){
            task_index = index;
            return item;
        }
    });
    
    var task_item_index;
    data['task'][task_index]['item'].some(function(item, index){
        if (item['id'] == task_item_id){
            task_item_index = index;
            return item;
        }
    });

    data['task'][task_index]['item'][task_item_index]['text'] = task_item_text;
    localStorage.setItem("data", JSON.stringify(data));
};

function updateTaskDate(task_date, task_id, task_item_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var task_index;
    data['task'].some(function(item, index){
        if (item['id'] == task_id){
            task_index = index;
            return item;
        }
    });
    
    var task_item_index;
    data['task'][task_index]['item'].some(function(item, index){
        if (item['id'] == task_item_id){
            task_item_index = index;
            return item;
        }
    });

    data['task'][task_index]['item'][task_item_index]['data'] = task_date;
    localStorage.setItem("data", JSON.stringify(data));
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}