"use strict";
class Store {
    constructor() { }
    static post(array) { localStorage.setItem('todos', JSON.stringify(array)); }
    static get() {
        if (localStorage.getItem('todos')) {
            return localStorage.getItem('todos');
        }
    }
    static setFilterStatus(status) {
        localStorage.setItem('status', status);
    }
    static getFilterStatus() {
        return localStorage.getItem('status');
    }
}
