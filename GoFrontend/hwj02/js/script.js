/**
* Создать объект с методами, которые будут динамически генерировать DOM вот
* такой страницы.
* Это будет тест, который мы будем разрабатывать в следующих заданиях.
* Сейчас вам нужно только динамически создать html, методы должны храниться в
* одном объекте.
* Для того чтоб страница выглядела красиво можете использовать Bootstrap и
* создавать DOM-элементы с готовыми бутстраповскими классами.
* Изначально на странице должен быть только <body>, вызывая методы объекта нужно
* создать dom-элементы
*/


/**
* Question object:
*
* {
*   id : <Number>,  // question ID
*   text: <String>, // question
*   answers: [
*     {
*       no: <Number>,       //  No. of an answer
*       text: <String>,     //  answer
*       correct: <Boolean>, //  key
*     },
*     ...
*   ]
* }
*
*/

// Generating questions array
var questions = [];
for (let i = 0; i < 3; i++) {
  let q = {
    id: i + 1,
    text: 'Вопрос №' + (i + 1),
    answers: []
  }
  for (let j = 0; j < 3; j++) {
    q.answers.push(
      {
        no: j + 1,
        text: 'Вариант ответа №' + (j + 1),
        correct: (j % 2  == 0)? true: false
      }
    )
  }
  questions.push(q);
}
// Creating a Test object
var tb = new TestBlockGenerator(document.body, "Тест по программированию",
"Проверить мои результаты");
for(let i = 0; i < questions.length; i++) {
  tb.appendQuestion(questions[i]);
}


/**
* An object, that represents a test block
*
* @param parent - a parent node of the test block
* @param title - a title of the test block
* @param buttonCaption - a caption of a submit button
*
*/
function TestBlockGenerator(parent = document.body,
   title = "Test title", buttonCaption = "Submit results") {

  this.initiateTestBlock = function(parent, title, buttonCaption) {
    var node, formNode, e;

    // Creating a getter for object ID
    this.getId = (
      function() {
        var id = (Math.random() + "").substr(2);
        return  function() {
          return id;
        }
      }
    ) ();

    // Creating 'div >  h1  form ol input' structure
    node = document.createElement("div");
    node.setAttribute("id", "tb" + this.getId());
    node.classList.add("tb_div");

    e = document.createElement("h1");
    e.innerHTML = title;
    node.appendChild(e);

    formNode = node.appendChild(document.createElement("form"));
    e = document.createElement("ol");
    e.setAttribute("id", "tbq" + this.getId());
    formNode.appendChild(e);

    e = document.createElement("input");
    e.setAttribute("type", "submit");
    e.setAttribute("formmethod", "post");
    e.setAttribute("value", buttonCaption);
    e.classList.add("pure-button");
    e.classList.add("pure-button-primary");
    e.classList.add("tb_submit");
    formNode.appendChild(e);
    node.appendChild(formNode);

    parent.appendChild(node);

    // this function should be called just one time for an object
    delete this.initiateTestBlock;
  };
  this.initiateTestBlock(parent, title, buttonCaption);


  this.appendQuestion = function(question) {
    var node = document.getElementById("tbq" + this.getId());
    if (node) {
      let questionNode = document.createElement("li");
      questionNode.innerHTML = question.text;
      questionNode.classList.add("tb_question");

      let answerNode = document.createElement("ul");
      let id = "q" + question.id;
      for (let i = 0; i < question.answers.length; i++) {
        let e = answerNode.appendChild(document.createElement("li"));
        let forId = id + "_" + question.answers[i].no;

        let e1 = document.createElement("label");
        e1.setAttribute("for", forId);
        e1.classList.add("tb_answer");
        let e2 = document.createElement("input");
        e2.setAttribute("type", "checkbox");
        e2.setAttribute("id", forId);
        e2.setAttribute("value", forId);
        e1.appendChild(e2);
        e1.insertAdjacentHTML("beforeend", question.answers[i].text);

        e.appendChild(e1);
      }

      questionNode.appendChild(answerNode);
      node.appendChild(questionNode);
    } else {
      console.log("Unexpected error: object is not found by it's ID - " +
        "tb" + this.getId() + ".");
    }
  }

}
