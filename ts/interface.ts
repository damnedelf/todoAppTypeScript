//describes solo todo item
interface todoObj{
    id:string,
    name:string,
    isCompleted:boolean
}

//describe this for btn keydown listener
interface elemObjForEnter{
  e:object,
  value:string
}
//describes collection for eventhandler
interface eventContainerType {
  [key:string]:Array<Function>
};


//describes checkbox elem
interface domElem extends Element{
  checked:any
}
