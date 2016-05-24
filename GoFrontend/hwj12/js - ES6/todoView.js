/*
*     View for TO-DO List
*/
class TodoView {

  constructor (model) {

    this.model = model;

    this.todoBlock = document.getElementById('todo-list');
    this.inputField = this.todoBlock.querySelector('.todo-list__input input');
    this.taskItems = this.todoBlock.getElementsByTagName('ul')[0];

    this.template = document.getElementById("todo-item-template").innerHTML;

    this.renderList();
  }

  renderList() {
    this.taskItems.innerHTML = tmpl(this.template,
      {data: this.model.getTaskList()}) || '';
  }

  renderListElement(task) {
    if (typeof task === 'string') {
      task = this.model.getTask(task);
    }
    let item = document.getElementById(task.id);
    if (item) {
      item.getElementsByTagName('div')[0].className =
        task.done?'todo-item__done--checked':'todo-item__done';
      item.querySelector('.todo-item__text > input').value = task.name;
    } else {
      this.taskItems.innerHTML += tmpl(this.template, {data: [task]});
    }
  }

  toggleEditing(id) {
    let element = document.getElementById(id)
                          .querySelector('.todo-item__text > input');
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
      element.focus();
    } else {
      element.setAttribute('disabled', true);
    }
    return element;
  }

}
