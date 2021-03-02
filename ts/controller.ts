//check if any data in local
let data: string|null = StoreTodos.get();
if (data && data !== '[]') {
    let todosArray = JSON.parse(data);
    todos.setTodos(todosArray);
    View.printTodos();
    View.filter(StoreFilterStatus.getFilterStatus());

}

// i need to make new class extended from Events, or new method for class Events 
//or just handler for all this subscribes`s?
// dont repeat practice ruined i know.
emitter.subscribe(`event:onEnter`, function (name: string) {
    let todo = new TodoModel(name);
    View.printTodo(todo);
    StoreTodos.post(todos.getTodos());
});

emitter.subscribe('event:Delete', function (id: string) {
    View.delete(id);
    StoreTodos.post(todos.getTodos());

})
emitter.subscribe('event:Mark', function (id: string) {
    View.mark(id);
    StoreTodos.post(todos.getTodos());

})
emitter.subscribe('event:MarkAll', function(condition:boolean) {
    View.markAll(condition);
    StoreTodos.post(todos.getTodos());
    
})
emitter.subscribe('filter:all', function (filterCondition: string) {
    View.filter(filterCondition);


})
emitter.subscribe('filter:completed', function (filterCondition: string) {
    View.filter(filterCondition);

})
emitter.subscribe('filter:active', function (filterCondition: string) {
    View.filter(filterCondition);

})