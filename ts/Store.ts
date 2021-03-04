const db = (window as any).__INITIAL_DATA__;
const todosRef = db.collection("todos");

class StoreTodos {
  constructor() {}

  static post(todo: todoObj): void {
    async function postTodo() {
      await todosRef.add({
        name: `${todo.name}`,
        id: `${todo.id}`,
        isCompleted: todo.isCompleted,
      });
    }
    postTodo().catch((error) => console.log(error));
  }
  static async getAll() {
    let todoArray: todoObj[] = [];

    async function getallHandler() {
      let snapshot = await todosRef.get();
      await snapshot.forEach((doc: any) => {
        todoArray.push(doc.data());
      });
    }
    await getallHandler();

    return todoArray;
  }

  static delete(id: string) {
    async function deleteTodo() {
      let snapshot = await todosRef.where("id", "==", `${id}`).get();
      snapshot.forEach((doc: any) => {
        db.collection("todos").doc(doc.id).delete();
      });
    }
    deleteTodo().catch((error) => console.log(error));
  }
  static update(id: string) {
    async function patchTodo() {
      let snapshot = await todosRef.where("id", "==", `${id}`).get();
      snapshot.forEach((doc: any) => {
        db.collection("todos")
          .doc(doc.id)
          .update({ isCompleted: !doc.data().isCompleted });
      });
    }
    patchTodo().catch((error) => console.log(error));
  }
  static updateAll(status: boolean) {
    async function patchAllTodo() {
      await db
        .collection("todos")
        .get()
        .then(function (querySnapshot: any) {
          console.log(querySnapshot);
          querySnapshot.forEach(function (doc: any) {
            doc.ref.update({
              isCompleted: status,
            });
          });
        });
    }
    patchAllTodo().catch((error) => console.log(error));
  }
}

class StoreFilterStatus {
  constructor() {}
  static setFilterStatus(status: string): void {
    localStorage.setItem("status", status);
  }
  static getFilterStatus(): string | undefined | null {
    if (localStorage.getItem("status")) {
      return localStorage.getItem("status");
    } else {
      return "noFilter";
    }
  }
}
