/*
*     View for TO-DO List
*/
define(
  'todoView',
  ['todoModel', 'tmpl'],
  function() {
    function TodoView(model) {
      var self = this;

      self.model = model;

      function init() {
        self.todoBlock = document.getElementById('todo-list');
        self.inputField = self.todoBlock.querySelector('.todo-list__input input');
        self.taskItems = self.todoBlock.getElementsByTagName('ul')[0];
        self.template = document.getElementById("todo-item-template").innerHTML;
        self.renderList();
      };

      self.renderList = function() {
        self.taskItems.innerHTML = tmpl(self.template,
          {data: self.model.getTaskList()}) || '';
      };

      init();

      self.renderListElement = function(task) {
        if (typeof task === 'string') {
          task = self.model.getTask(task);
        }
        var item = document.getElementById(task.id);
        if (item) {
          item.getElementsByTagName('div')[0].className =
            task.done?'todo-item__done--checked':'todo-item__done';
          item.querySelector('.todo-item__text > input').value = task.name;
        } else {
          self.taskItems.innerHTML += tmpl(self.template, {data: [task]});
        }
      };

      self.toggleEditing = function(id) {
        var element = document.getElementById(id)
                              .querySelector('.todo-item__text > input');
        if (element.hasAttribute('disabled')) {
          element.removeAttribute('disabled');
          element.focus();
        } else {
          element.setAttribute('disabled', true);
        }
        return element;
      };

    }
    return TodoView;
  }
);
