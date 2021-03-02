//input field
const input = document.querySelector('#input');
//counts and buttons block
const butCountBar = document.querySelector('.task_list_footer_wrapper');
//filter buttons
const allBtn = document.querySelector('#all')
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
//markallBtn(visible label)
const markallBtn = document.querySelector('#label-mark-all');
//display none checkbox
const markAllCheckbox:domElem|null = document.querySelector('#mark-all');

//filter status
let filterCondition: string = '';

//emits events
//onEnter
input?.addEventListener('keydown', function (this:elemObjForEnter,e:KeyboardEventInit): void {

    if (e.keyCode == 13 && this.value != '') {
        emitter.emit('event:onEnter', this.value);
        this.value = '';
    }
})
//Mark&Delete
tasklist?.addEventListener('click', function (e:Event): void {
  
    let x:any = e.target;
    let id: string;
    if (x.className == 'close') {
        id = x.id.slice(7);
        emitter.emit('event:Delete', id);
    } else if (x.className == 'checkbox_label') {
        id = x.id.slice(6);
        emitter.emit('event:Mark', id);
    }

})
//mark all
markallBtn?.addEventListener('click',function():void {
   emitter.emit('event:MarkAll', markAllCheckbox?.checked);
})

//filters
allBtn?.addEventListener('click', function () {
    filterCondition = 'all';
    emitter.emit('filter:all', filterCondition);
})
activeBtn?.addEventListener('click', function () {
    filterCondition = 'active';
    emitter.emit('filter:active', filterCondition);
})
completedBtn?.addEventListener('click', function () {
    filterCondition = 'completed';
    emitter.emit('filter:completed', filterCondition);
})


class View {
    constructor() { }
    //for solo todo
    static printTodo(todo: todoObj) {
        Template.insertTodo(todo);
        this.showFooter(true);
        todos.push(todo);
        this.count();

    }
    //for all todos
    static printTodos(): void {
        let todosArray: todoObj[] = JSON.parse(StoreTodos.get());

        for (let todo of todosArray) {
            Template.insertTodo(todo);
        }
        this.showFooter(true);
        this.count();
    }
    static delete(id: string): void {
        let task = document.getElementById(id)
        task?.remove();
        todos.delete(id);
        this.count();

    }
    static mark(id: string): void {
        let task = document.getElementById(id);
        task?.classList.toggle('completed');
        let value:any = task?.classList.contains('completed');
        todos.mark(value, id);
    }
    static markAll(condition:boolean){
        todos.markAll(condition);
        let todosArray = document.querySelectorAll('.task-list-task');

        
        for(let todo of todosArray){
            console.log(todo);
           let checkbox:any = todo.querySelector(".checkbox_input");
          
          checkbox.checked = condition;
     
           if(condition){
               todo.className = 'task-list-task completed'
           }else{todo.className = 'task-list-task'}
        }
    }
    //visibility of btns and counter block
    static showFooter(param: boolean): void {
        if (param) {
            butCountBar?.setAttribute('style', 'display:block');
        } else {
            butCountBar?.setAttribute('style', 'display:none');
        }

    }
    static count(): void {
        let counter:any = document.querySelector('.counter');
        let x: number | null = todos.getTodos().length;
        counter.innerHTML = `todo amount: ${x}`;
        if (x == 0) {
            this.showFooter(false);
        }

    }
    static filter(filterCondition: string): void {
        let todosArray:any[] = Array.from(document.querySelectorAll('.task-list-task'));
        StoreFilterStatus.setFilterStatus(filterCondition);
        if (filterCondition == 'completed') {
            for (let todo of todosArray) {
                if (todo.classList.contains('completed')) {
                    todo.setAttribute('style', 'display:inline-flex');
                } else {
                    todo.setAttribute('style', 'display:none');
                }
            }
        } else if (filterCondition == 'active') {
            for (let todo of todosArray) {
                if (todo.classList.contains('completed')) {
                    todo.setAttribute('style', 'display:none');

                } else {
                    todo.setAttribute('style', 'display:inline-flex');
                }
            }

        } else {
            {
                for (let todo of todosArray) {
                    todo.setAttribute('style', 'display:inline-flex');
                }
            }
        }


    }
}
