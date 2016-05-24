/*
*     Model for TO-DO List (array storage implementation)
*/
define(
  'todoModel',
  ['getUniqueId'],
  function() {
    function TodoModelArr() {
      var self = this;

      self.taskList = [];
      var storedData = localStorage.getItem('todo_arr');
      if (storedData) {
        try {
          self.taskList = JSON.parse(storedData);
        } catch(e) {};
      };

      self.getTaskList = function() {
        return self.taskList;
      };

      self.getTask = function(id) {
        return self.taskList.filter(function(e) {
          return e.id === id
        })[0];
      };

      self.createTask = function(name) {
        var task;
        if (name.length > 0) {
          task = {
            id: getUniqueId(),
            done: false,
            name: name
          };
          self.taskList.push(task);
          localStorage.setItem('todo_arr', JSON.stringify(self.taskList));
        }
        return task;
      };

      self.toggleDone = function(id) {
        var task = self.getTask(id);
        if (task) {
          task.done = !task.done;
          localStorage.setItem('todo_arr', JSON.stringify(self.taskList));
        }
        return task;
      };

      self.updateTask = function(id, name) {
        var task = self.getTask(id);
        if (task) {
          // task.done = false;
          task.name = name;
          localStorage.setItem('todo_arr', JSON.stringify(self.taskList));
        }
        return task;
      };

      self.deleteTask = function(id) {
        var task = self.getTask(id);
        if (task) {
          self.taskList.splice(self.taskList.indexOf(task), 1);
          localStorage.setItem('todo_arr', JSON.stringify(self.taskList));
        }
        return self.taskList;
      };

    }
    return TodoModelArr;
  }
);
