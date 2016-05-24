/*
*     Controller for TO-DO List
*/
class TodoController {

  constructor(model, view) {

    view.inputField.addEventListener('keypress', function(e) {
      let task = e.target.value.trim();
      if ((e.keyCode == 13) && (task.length > 0)) {
        view.renderListElement(model.createTask(task));
        e.target.value = '';
      }
    });

    view.taskItems.addEventListener('click', function(e) {
      switch(e.target.className) {
        case 'todo-item__done':
        case 'todo-item__done--checked':
          view.renderListElement(model.toggleDone(e.target.parentNode.id));
          break;
        case 'todo-item__control--edit':
          let element = view.toggleEditing(e.target.parentNode.parentNode.id);
          element.addEventListener('keypress', editKeyPress);
          element.addEventListener('focusout', editFocusOut)
          break;
        case 'todo-item__control--delete':
          model.deleteTask(e.target.parentNode.parentNode.id);
          view.renderList();
          break;
      }
    });

    function editKeyPress(e) {
      if (e.keyCode === 13) {
        let id = e.target.parentNode.parentNode.id;
        model.updateTask(id, e.target.value);
        editFocusOut.apply(this);
      }
      return false;
    };

    function editFocusOut() {
      this.removeEventListener('keypress', editKeyPress);
      this.removeEventListener('focusout', editFocusOut);
      let id = this.parentNode.parentNode.id;
      view.toggleEditing(id);
      view.renderListElement(id);
    };

  }

}
