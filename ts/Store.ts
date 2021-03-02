class StoreTodos {
  constructor() {}
  static post(array:todoObj[]):void { localStorage.setItem('todos', JSON.stringify(array)) }
  static get():any {
    if(localStorage.getItem('todos')){
      return localStorage.getItem('todos');
    }
     }

}

class StoreFilterStatus{
  constructor(){}
  static setFilterStatus(status:string):void{
    localStorage.setItem('status', status);
  }
  static getFilterStatus():any{
    return localStorage.getItem('status');
  }
}