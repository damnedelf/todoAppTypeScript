function handleDD() {
  let dragSrcEl: any;
  let todos = document.querySelectorAll(".task-list-task");

  function dragStart(
    this: HTMLElement,
    e: CustomEvent & { dataTransfer: DataTransfer }
  ) {
    this.style.opacity = "0.4";
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function dragEnter(this: HTMLElement) {
    this.classList.add("over");
  }

  function dragLeave(this: HTMLElement, e: Event) {
    e.stopPropagation();
    this.classList.remove("over");
  }

  function dragOver(e: CustomEvent & { dataTransfer: DataTransfer }) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function dragDrop(
    this: HTMLElement,
    e: CustomEvent & { dataTransfer: DataTransfer }
  ) {
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
  }

  function dragEnd(this: HTMLElement) {
    [].forEach.call(todos, function (item: HTMLElement) {
      item.classList.remove("over");
    });
    this.style.opacity = "1";
  }

  function addEventsDragAndDrop(el: any): void {
    el.addEventListener("dragstart", dragStart, false);
    el.addEventListener("dragenter", dragEnter, false);
    el.addEventListener("dragover", dragOver, false);
    el.addEventListener("dragleave", dragLeave, false);
    el.addEventListener("drop", dragDrop, false);
    el.addEventListener("dragend", dragEnd, false);
  }

  [].forEach.call(todos, function (item) {
    addEventsDragAndDrop(item);
  });
}
