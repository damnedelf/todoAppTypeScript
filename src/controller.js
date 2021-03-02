"use strict";
function buildDom(callback) {
    StoreTodos.getAll(View.printTodos);
    setTimeout(() => {
        callback(StoreFilterStatus.getFilterStatus());
    }, 2000);
}
buildDom(View.filter);
// async function foo() {
//   await StoreTodos.getAll(View.printTodos);
// }
// foo().then(() => View.filter(StoreFilterStatus.getFilterStatus()));
// document.addEventListener("DOMContentLoaded", function () {
//   View.filter(StoreFilterStatus.getFilterStatus());
// });
// window.onload = View.filter(StoreFilterStatus.getFilterStatus());
emitter.subscribe(`event:onEnter`, function (name) {
    let todo = new TodoModel(name);
    View.printTodo(todo);
    StoreTodos.post(todo);
});
emitter.subscribe("event:Delete", function (id) {
    View.delete(id);
    StoreTodos.delete(id);
});
emitter.subscribe("event:Mark", function (id) {
    View.mark(id);
    StoreTodos.update(id);
});
emitter.subscribe("event:MarkAll", function (condition) {
    View.markAll(condition);
    StoreTodos.updateAll(condition);
});
emitter.subscribe("filter:all", function (filterCondition) {
    View.filter(filterCondition);
});
emitter.subscribe("filter:completed", function (filterCondition) {
    View.filter(filterCondition);
});
emitter.subscribe("filter:active", function (filterCondition) {
    View.filter(filterCondition);
});
