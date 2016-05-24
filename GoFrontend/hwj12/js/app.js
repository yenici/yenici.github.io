requirejs.config({
  paths: {
    // 'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min',
    'tmpl': 'lib/tmpl',
    'getUniqueId': 'lib/getUniqueId'
  },
  shim: {
    // 'jquery': {
    //   exports: 'jQuery'
    // },
    'tmpl': {
      deps: [],
      exports: 'tmpl'
    },
    'getUniqueId': {
      deps: [],
      exports: 'getUniqueId'
    }
  }
});

require(
  ['todoModel', 'todoView', 'todoController'],
  // function ($, tmpl, TodoModel, TodoView, TodoController) {
  function (TodoModel, TodoView, TodoController) {
    var m = new TodoModel();
    var v = new TodoView(m);
    var c = new TodoController(m, v);
  }

);
