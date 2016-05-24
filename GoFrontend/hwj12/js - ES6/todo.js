document.addEventListener('DOMContentLoaded', function() {
  let m = new TodoModelArr();
  let v = new TodoView(m);
  let c = new TodoController(m, v);
});
