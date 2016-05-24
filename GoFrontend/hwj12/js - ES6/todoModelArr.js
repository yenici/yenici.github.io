/*
*     Model for TO-DO List (array storage implementation)
*/

class TodoModelArr {

  constructor () {
    this.taskList = [];
    let storedData = localStorage.getItem('todo_arr');
    if (storedData) {
      try {
        this.taskList = JSON.parse(storedData);
      } catch(e) {};
    }
  }

  getTaskList() {
    return this.taskList;
  }

  getTask(id) {
    return this.taskList.filter( e => e.id === id )[0];
  }

  createTask(name) {
    let task;
    if (name.length > 0) {
      task = {
        id: getUniqueId(),
        done: false,
        name: name
      };
      this.taskList.push(task);
      localStorage.setItem('todo_arr', JSON.stringify(this.taskList));
    }
    return task;
  }

  toggleDone(id) {
    let task = this.getTask(id);
    if (task) {
      task.done = !task.done;
      localStorage.setItem('todo_arr', JSON.stringify(this.taskList));
    }
    return task;
  }

  updateTask(id, name) {
    let task = this.getTask(id);
    if (task) {
      // task.done = false;
      task.name = name;
      localStorage.setItem('todo_arr', JSON.stringify(this.taskList));
    }
    return task;
  }

  deleteTask(id) {
    let task = this.getTask(id);
    if (task) {
      this.taskList.splice(this.taskList.indexOf(task), 1);
      localStorage.setItem('todo_arr', JSON.stringify(this.taskList));
    }
    return this.taskList;
  }

}
