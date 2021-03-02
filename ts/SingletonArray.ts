

class SingletonArray {
  private static _instance: SingletonArray = new SingletonArray();
  private _todoArray:  Array<todoObj> = [];
  private constructor() {
  if (SingletonArray._instance) {
    throw new Error("Error: Instantiation failed: Use SingletonArray.getInstance() instead of new.");
  }
  SingletonArray._instance = this;
}
  public static getInstance(): SingletonArray
{
  return SingletonArray._instance;
}
  public setTodos(value:Array<any>)
{
  this._todoArray = value;
} 
  public getTodos(): Array<any>
{
  return this._todoArray
} 
      

public push(value: todoObj) {
  this._todoArray.push(value);
}

  public mark(value: boolean, id: string) {
  let index:number =0;
  index = this._todoArray.findIndex((item)=>item.id ===id);
  this._todoArray[index].isCompleted = value;
}
public markAll(condition:boolean):void{
  let todosArray = this._todoArray;
  for(let todo of todosArray){
    todo.isCompleted = condition;
  }

}
  public delete (id: string) {
  this._todoArray.splice(this._todoArray.findIndex(item=>item.id==id),
    1);
}
}
const todos = SingletonArray.getInstance();
