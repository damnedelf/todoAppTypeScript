"use strict";
//input field
const input = document.querySelector('#input');
//counts and buttons block
const butCountBar = document.querySelector('.task_list_footer_wrapper');
//filter buttons
const allBtn = document.querySelector('#all');
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
//markallBtn(visible label)
const markallBtn = document.querySelector('#label-mark-all');
//display none checkbox
const markAllCheckbox = document.querySelector('#mark-all');
//filter status
let filterCondition = '';
//emits events
//onEnter
input === null || input === void 0 ? void 0 : input.addEventListener('keydown', function (e) {
    if (e.keyCode == 13 && this.value != '') {
        emitter.emit('event:onEnter', this.value);
        this.value = '';
    }
});
//Mark&Delete
tasklist === null || tasklist === void 0 ? void 0 : tasklist.addEventListener('click', function (e) {
    let x = e.target;
    let id;
    if (x.className == 'close') {
        id = x.id.slice(7);
        emitter.emit('event:Delete', id);
    }
    else if (x.className == 'checkbox_label') {
        id = x.id.slice(6);
        emitter.emit('event:Mark', id);
    }
});
//mark all
markallBtn === null || markallBtn === void 0 ? void 0 : markallBtn.addEventListener('click', function () {
    emitter.emit('event:MarkAll', markAllCheckbox === null || markAllCheckbox === void 0 ? void 0 : markAllCheckbox.checked);
});
//filters
allBtn === null || allBtn === void 0 ? void 0 : allBtn.addEventListener('click', function () {
    filterCondition = 'all';
    emitter.emit('filter:all', filterCondition);
});
activeBtn === null || activeBtn === void 0 ? void 0 : activeBtn.addEventListener('click', function () {
    filterCondition = 'active';
    emitter.emit('filter:active', filterCondition);
});
completedBtn === null || completedBtn === void 0 ? void 0 : completedBtn.addEventListener('click', function () {
    filterCondition = 'completed';
    emitter.emit('filter:completed', filterCondition);
});
class View {
    constructor() { }
    static printTodo(todo) {
        Template.insertTodo(todo);
        this.showFooter(true);
        todos.push(todo);
        this.count();
    }
    static printTodos() {
        let todosArray = JSON.parse(Store.get());
        for (let todo of todosArray) {
            Template.insertTodo(todo);
        }
        this.showFooter(true);
        this.count();
    }
    static delete(id) {
        let task = document.getElementById(id);
        task === null || task === void 0 ? void 0 : task.remove();
        todos.delete(id);
        this.count();
    }
    static mark(id) {
        let task = document.getElementById(id);
        task === null || task === void 0 ? void 0 : task.classList.toggle('completed');
        let value = task === null || task === void 0 ? void 0 : task.classList.contains('completed');
        todos.mark(value, id);
    }
    static markAll(condition) {
        todos.markAll(condition);
        let todosArray = document.querySelectorAll('.task-list-task');
        for (let todo of todosArray) {
            console.log(todo);
            let checkbox = todo.querySelector(".checkbox_input");
            checkbox.checked = condition;
            if (condition) {
                todo.className = 'task-list-task completed';
            }
            else {
                todo.className = 'task-list-task';
            }
        }
    }
    static showFooter(param) {
        if (param) {
            butCountBar === null || butCountBar === void 0 ? void 0 : butCountBar.setAttribute('style', 'display:block');
        }
        else {
            butCountBar === null || butCountBar === void 0 ? void 0 : butCountBar.setAttribute('style', 'display:none');
        }
    }
    static count() {
        let counter = document.querySelector('.counter');
        let x = todos.getTodos().length;
        counter.innerHTML = `todo amount: ${x}`;
        if (x == 0) {
            this.showFooter(false);
        }
    }
    static filter(condition) {
        let todosArray = Array.from(document.querySelectorAll('.task-list-task'));
        Store.setFilterStatus(condition);
        if (condition == 'completed') {
            for (let todo of todosArray) {
                if (todo.classList.contains('completed')) {
                    todo.setAttribute('style', 'display:inline-flex');
                }
                else {
                    todo.setAttribute('style', 'display:none');
                }
            }
        }
        else if (condition == 'active') {
            for (let todo of todosArray) {
                if (todo.classList.contains('completed')) {
                    todo.setAttribute('style', 'display:none');
                }
                else {
                    todo.setAttribute('style', 'display:inline-flex');
                }
            }
        }
        else {
            {
                for (let todo of todosArray) {
                    todo.setAttribute('style', 'display:inline-flex');
                }
            }
        }
    }
}
