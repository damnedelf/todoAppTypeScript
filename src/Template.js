"use strict";
const tasklist = document.querySelector('.task-list');
class Template {
    constructor() {
    }
    static insertTodo(todo) {
        let newTaskWrapper = document.createElement('div');
        let button = document.createElement('button');
        let checkbox = document.createElement('input');
        checkbox.checked = todo.isCompleted;
        let checkboxWrapper = document.createElement('div');
        let checkboxLabel = document.createElement('label');
        let taskName = document.createElement('div');
        button.className = 'close';
        button.id = `delete-${todo.id}`;
        if (todo.isCompleted) {
            newTaskWrapper.className = 'task-list-task completed';
        }
        else {
            newTaskWrapper.className = 'task-list-task';
        }
        newTaskWrapper.id = todo.id;
        taskName.innerHTML = todo.name;
        taskName.className = 'taskname';
        checkboxWrapper.className = 'checkbox';
        checkbox.setAttribute('type', 'checkbox');
        checkbox.id = `mark-${todo.id}`;
        checkbox.className = 'checkbox_input';
        checkboxLabel.className = 'checkbox_label';
        checkboxLabel.setAttribute('for', checkbox.id);
        checkboxLabel.id = `label-${todo.id}`;
        if (tasklist) {
            tasklist.append(newTaskWrapper);
            newTaskWrapper.append(button);
            checkboxWrapper.append(checkbox);
            checkboxWrapper.append(checkboxLabel);
            newTaskWrapper.append(checkboxWrapper);
            newTaskWrapper.append(taskName);
        }
        else {
            alert('no needed element error');
        }
    }
}
