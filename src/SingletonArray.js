"use strict";
class SingletonArray {
    constructor() {
        this._todoArray = [];
        if (SingletonArray._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonArray.getInstance() instead of new.");
        }
        SingletonArray._instance = this;
    }
    static getInstance() {
        return SingletonArray._instance;
    }
    setTodos(value) {
        this._todoArray = value;
    }
    getTodos() {
        return this._todoArray;
    }
    push(value) {
        this._todoArray.push(value);
    }
    mark(value, id) {
        let index = 0;
        index = this._todoArray.findIndex((item) => item.id === id);
        this._todoArray[index].isCompleted = value;
    }
    markAll(condition) {
        let todosArray = this._todoArray;
        for (let todo of todosArray) {
            todo.isCompleted = condition;
        }
    }
    delete(id) {
        this._todoArray.splice(this._todoArray.findIndex(item => item.id == id), 1);
    }
}
SingletonArray._instance = new SingletonArray();
const todos = SingletonArray.getInstance();
