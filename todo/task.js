const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');
const tasksForm = document.getElementById('tasks__form');


function taskAdd(taskValue) {
    tasksList.insertAdjacentHTML('beforeend', `
        <div class="task">
            <div class="task__title"></div>
            <a href="#" class="task__remove">&times;</a>
        </div>`);
        
        let taskTextItems = tasksList.querySelectorAll('.task__title');
        taskTextItems[taskTextItems.length - 1].textContent = taskValue;
        
        tasksForm.setAttribute('onsubmit', 'return false');
        
        for (let i = 0; i < taskTextItems.length; i++) { 
     
            let deletRef = taskTextItems[i].nextElementSibling;
            
            if (deletRef !== null) {
            deletRef.onclick = taskRemove;
            };
        };


};    

function taskRemove (event) {
    elem = event.target;
    elem.parentElement.remove();
};

taskInput.onchange = () => {

    taskAdd(taskInput.value);
    taskInput.value = "";
};