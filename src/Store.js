"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = window.__INITIAL_DATA__;
const todosRef = db.collection("todos");
class StoreTodos {
    constructor() { }
    static post(todo) {
        function postTodo() {
            return __awaiter(this, void 0, void 0, function* () {
                yield todosRef.add({
                    name: `${todo.name}`,
                    id: `${todo.id}`,
                    isCompleted: todo.isCompleted,
                });
            });
        }
        postTodo().catch((error) => console.log(error));
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let todoArray = [];
            function getallHandler() {
                return __awaiter(this, void 0, void 0, function* () {
                    let snapshot = yield todosRef.get();
                    yield snapshot.forEach((doc) => {
                        todoArray.push(doc.data());
                    });
                });
            }
            yield getallHandler();
            return todoArray;
        });
    }
    static delete(id) {
        function deleteTodo() {
            return __awaiter(this, void 0, void 0, function* () {
                let snapshot = yield todosRef.where("id", "==", `${id}`).get();
                snapshot.forEach((doc) => {
                    db.collection("todos").doc(doc.id).delete();
                });
            });
        }
        deleteTodo().catch((error) => console.log(error));
    }
    static update(id) {
        function patchTodo() {
            return __awaiter(this, void 0, void 0, function* () {
                let snapshot = yield todosRef.where("id", "==", `${id}`).get();
                snapshot.forEach((doc) => {
                    db.collection("todos")
                        .doc(doc.id)
                        .update({ isCompleted: !doc.data().isCompleted });
                });
            });
        }
        patchTodo().catch((error) => console.log(error));
    }
    static updateAll(status) {
        function patchAllTodo() {
            return __awaiter(this, void 0, void 0, function* () {
                yield db
                    .collection("todos")
                    .get()
                    .then(function (querySnapshot) {
                    console.log(querySnapshot);
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update({
                            isCompleted: status,
                        });
                    });
                });
            });
        }
        patchAllTodo().catch((error) => console.log(error));
    }
}
class StoreFilterStatus {
    constructor() { }
    static setFilterStatus(status) {
        localStorage.setItem("status", status);
    }
    static getFilterStatus() {
        if (localStorage.getItem("status")) {
            return localStorage.getItem("status");
        }
        else {
            return "noFilter";
        }
    }
}
