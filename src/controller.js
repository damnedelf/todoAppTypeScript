"use strict";
//check if any data in local
let data = Store.get();
if (data && data !== '[]') {
    let todosArray = JSON.parse(data);
    todos.setTodos(todosArray);
    View.printTodos();
    View.filter(Store.getFilterStatus());
}
emitter.subscribe(`event:onEnter`, function (name) {
    let todo = new TodoModel(name);
    View.printTodo(todo);
    Store.post(todos.getTodos());
});
emitter.subscribe('event:Delete', function (id) {
    View.delete(id);
    Store.post(todos.getTodos());
});
emitter.subscribe('event:Mark', function (id) {
    View.mark(id);
    Store.post(todos.getTodos());
});
emitter.subscribe('event:MarkAll', function (condition) {
    View.markAll(condition);
    Store.post(todos.getTodos());
});
emitter.subscribe('filter:all', function (filterCondition) {
    View.filter(filterCondition);
});
emitter.subscribe('filter:completed', function (filterCondition) {
    View.filter(filterCondition);
});
emitter.subscribe('filter:active', function (filterCondition) {
    View.filter(filterCondition);
});
