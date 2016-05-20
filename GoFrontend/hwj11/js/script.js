/*

1. За основу взять домашку 3-4. Перед стартом приложения записать в localStorage
объект с вопросами и ответами теста. Потом прочесть данные из localStorage,
отрендерить их используя любой javascript-шаблонизатор.

2. Так же в приложении должна быть прописана директива 'use strict;', в консоли
не должно быть никаких javascript-ошибок.

3. На странице должна быть возможность пройти тест. При клике на кнопку
"Проверить мои результаты" нужно выполнить проверку правильных ответов и
вывести сообщение об успешном или не успешном прохождении теста. После вывода
сообщения, обнулить отметки чтоб тест можно было пройти опять.

4. В каждом вопросе может быть только один правильный вариант ответа.

5. Само сообщение о результатах теста нужно сделать в стиле простого модального
окна. Не обязательно соблюдать такой же дизайн как в Bootstrap, можете сделать
по своему, но верстка и код появления модальки должны быть написаны вами.
Допускается использование jQuery. Кому хочется больше веселья, делайте без неё.

6. Бонусная часть: в вопросах должна быть возможность выбрать несколько
правильных вариантов ответа, не только один.

*/

'use strict';

function generateTestPage() {
  try {
    putTestToLocalStorage();
    let test = JSON.parse(localStorage.getItem('les14test')); // Restore an object from localStorage

    for (let question of test.questions) {
      let n = 0;
      for (let answer of question.answers) {
        if(answer.correct) n++;
        if(n > 1) break;
      }
      question.multichoise = (n == 2);
    }
    localStorage.setItem('les14test', JSON.stringify(test));

    let lodashCompiledTemplate = _.template(document
      .getElementById("test-template").innerHTML, {variable: "test"});
    document.querySelector(".test-wrapper")
      .insertAdjacentHTML("beforeend", lodashCompiledTemplate(test));
    let button = document.getElementById('questions')
                          .querySelector('input[type="submit"]');

    button.addEventListener('click', checkTestResult);
  } catch (e) {
    alert(e.message);
  }
}

/*
* Check test result
*/
function checkTestResult() {
  let test = JSON.parse(localStorage.getItem('les14test'));
  let result = {questions: 0, correct: 0};
  result.questions = result.correct = test.questions.length;

  for (let question of test.questions) {
    question.passed = true;
    let id = 'q' + question.id + '_';
    let i = 0;
    for (let answer of question.answers) {
      let answerId = id + (i++);
      let checked = document.getElementById(answerId).checked;
      if (answer.correct !== checked) {
        question.passed = false;
        result.correct--;
        break;
      }
    }
  }

  localStorage.setItem('les14test', JSON.stringify(test));
  let lodashCompiledTemplate = _.template(document
    .getElementById("test-result").innerHTML, {variable: "result"});
  document.querySelector("div.modal__body")
    .insertAdjacentHTML("beforeend", lodashCompiledTemplate(result));

  let button = document.getElementById('modal')
                        .querySelector('input[type="submit"]');
  button.addEventListener('click', clearTest);

  let element = document.getElementById("modal");
  element.style.opacity = 1;
  element.style.pointerEvents = "auto";
}

/*
* Clear the test
*/
function clearTest() {
  let element = document.getElementById("modal");
  element.style.opacity = 0;
  element.style.pointerEvents = "none";
  let test = JSON.parse(localStorage.getItem('les14test'));

  for (let question of test.questions) {
    let id = 'q' + question.id + '_';
    let j = 0;
    for (let answer of question.answers) {
      document.getElementById(id + (j++)).checked = false;
    }
  }
  document.querySelector("div.modal__body").innerHTML='';
}

/*
* This functions creates a test object and puts it into localStorage.
*/
function putTestToLocalStorage() {
  let test = {
    lesson: 14,
    name: 'Использование \'use strict\' и try ... catch.',
    questions: [
      {
        id: 1401,
        question: 'Что обозначает директива ‘use strict’?',
        answers: [
          {
            text: 'Код данного скрипта будет обработан по строгим правилам, однако допускается использование нестрогих правил написания кода.',
            correct: false
          },
          {
            text: 'Код данного скрипта будет обработан по строгим правилам стандарта HTML5.',
            correct: false
          },
          {
            text: 'Код данного скрипта будет обработан по строгим правилам стандарта ECMAScript 6.',
            correct: false
          },
          {
            text: 'Код данного скрипта будет обработан по строгим правилам стандарта ECMAScript 5.',
            correct: true
          },
        ]
      },
      {
        id: 1402,
        question: 'К какому участку скрипта применяется строгие правила \'use strict\'?',
        answers: [
          {
            text: 'Либо во всем скрипте, либо в отдельной функции.',
            correct: true
          },
          {
            text: 'Строгие правила работают между директивами "use strict" и "strict end".',
            correct: false
          },
          {
            text: 'Во всем скрипте.',
            correct: false
          },
          {
            text: 'Внутри блока {}.',
            correct: false
          },
        ]
      },
      {
        id: 1403,
        question: 'Какие из пунктов верны по отношению к строгому режиму javascript?',
        answers: [
          {
            text: 'Запрещено дублирование полей объектов.',
            correct: true
          },
          {
            text: 'Запрещено дублирование параметров функции.',
            correct: true
          },
          {
            text: 'Запрещено использование директивы eval.',
            correct: false
          },
          {
            text: 'Запрещено удаление полей, имеющих свойство writable = false.',
            correct: true
          },
        ]
      },
      {
        id: 1404,
        question: 'Какие основное ограничения к объявлению переменных в строгом режиме?',
        answers: [
          {
            text: 'Название переменных должно быть camel-case с маленькой буквы.',
            correct: false
          },
          {
            text: 'Переменные функций должны объявляться с использованием ключевого слова var.',
            correct: false
          },
          {
            text: 'Глобальные переменные должны объявляться с использованием ключевого слова var.',
            correct: false
          },
          {
            text: 'Любая переменная должна объявляться с использованием ключевого слова var.',
            correct: true
          },
        ]
      },
      {
        id: 1405,
        question: 'Чему равен this в функциях вызванных на глобальном уровне (т.е. не внутри других функций)?',
        answers: [
          {
            text: 'undefined',
            correct: true
          },
          {
            text: 'window',
            correct: false
          },
          {
            text: 'Сама функция.',
            correct: false
          },
          {
            text: 'null',
            correct: false
          },
        ]
      },
      {
        id: 1406,
        question: 'Для чего используется конструкция try-catch в javascript?',
        answers: [
          {
            text: 'Для замены условного оператора if.',
            correct: false
          },
          {
            text: 'Для обработки возможных ошибок.',
            correct: true
          },
          {
            text: 'Для генерирования ошибок.',
            correct: false
          },
          {
            text: 'В строгом режиме весь код необходимо оборачивать в try-catch.',
            correct: false
          },
        ]
      },
      {
        id: 1407,
        question: 'Для чего необходим блок finally?',
        answers: [
          {
            text: 'Код внутри этого блока будет выполнен, если код внутри блока catch выполнен без ошибок.',
            correct: false
          },
          {
            text: 'Код внутри этого блока будет выполнен, если внутри блока try возникли ошибки.',
            correct: false
          },
          {
            text: 'Код внутри этого блока будет выполнен, если код внутри блока try выполнен без ошибок.',
            correct: false
          },
          {
            text: 'Код внутри этого блока будет в любом случае выполнен.',
            correct: true
          },
        ]
      },
      {
        id: 1408,
        question: 'Как много блоков catch необходимо объявлять в конструкции try-catсh?',
        answers: [
          {
            text: 'Если есть блок finally - то один, если нету - то по одному блоку catch на каждую ошибку внутри блока try.',
            correct: false
          },
          {
            text: 'Два.',
            correct: false
          },
          {
            text: 'Один.',
            correct: true
          },
          {
            text: 'По одному блоку на каждую возникшую ошибку внутри блока try.',
            correct: false
          },
        ]
      }
    ]
  };
  if (storageAvailable('localStorage')) {
    localStorage.setItem("les14test", JSON.stringify(test));
  } else {
    throw new Error('The localStorage is disabled or not supported by your browser.');
  }
}

/*
* Detects whether localStorage is both supported and available
*/
function storageAvailable(type) {
  try {
    let storage = window[type],
    x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }	catch(e) {
    return false;
  }
}
