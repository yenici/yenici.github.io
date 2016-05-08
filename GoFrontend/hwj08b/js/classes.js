/*
*  Создать класс Human, у которого будут свойства обычного человека:
*    имя, возраст, пол, рост, вес.
*  Используя прототипное наследование создать дочерние классы Worker
*  (дописать в них поля места работы, зарплатой, методом "работать")
*  и Student (дописать поля места учебы, стипендией, методом "смотреть сериалы")
*
*  Создать несколько экземпляров классов Worker и Student, вывести их в консоль.
*  Убедиться что они имеют поля родительского класса Human
*/

'use strict';

/*
* Human Class
*/
function Human(fullname = '', age = 0, gender = 'male', height = 0, weight = 0) {
  this.fullname = fullname;
  this.age = age;
  this.gender = gender;
  this.height = height;
  this.weight = weight;
}

/*
* Worker Class
*/
function Worker(fullname, age, gender, height, weight,
                occupation = 'unemployed', salary = 0) {
  Human.apply(this, arguments);
  this.occupation = occupation;
  this.salary = salary;
}
Worker.prototype = Object.create(Human.prototype);
Worker.prototype.constructor = Worker;
Worker.prototype.work = function() {
  return this.fullname + ' is working...';
}

/*
* Student Class
*/
function Student(fullname, age, gender, height, weight,
                  studyAt = 'not a student', grant = 0) {
  Human.apply(this, arguments);
  this.studyAt = studyAt;
  this.grant = grant;
}
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;
Student.prototype.watchSeries = function() {
  return this.fullname + ' is watching TV series...';
}


/*
 * ECMAScript2015 (ES6) Implementation
 */
// class Human {
//   constructor(fullname = '', age = 0, gender = 'male', height = 0, weight = 0) {
//     this.fullname = fullname;
//     this.age = age;
//     this.gender = gender;
//     this.height = height;
//     this.weight = weight;
//   }
// }
//
// class Worker extends Human {
//   constructor(fullname = '', age = 0, gender = 'male', height = 0, weight = 0,
//               occupation = 'unemloyed', salary = 0) {
//     super(fullname, age, gender, height, weight);
//     this.occupation = occupation;
//     this.salary = salary;
//   }
//   work() {
//     return this.fullname + ' is working...';
//   }
// }
//
// class Student extends Human {
//   constructor(fullname, age, gender, height, weight, studyAt, grunt) {
//     super(fullname, age, gender, height, weight);
//     this.studyAt = studyAt;
//     this.grunt = grunt;
//   }
//   watchSeries() {
//     return this.fullname + ' is watching TV series.';
//   }
// }
/*
 *  End of ECMAScript2015 (ES6) Implementation
 */


var human = new Human("John Smith", 18, "male", 180, 80);
logHuman('human', human);

var worker1 = new Worker("Alfredo James Pacino", 76, "male", 170, 61, "actor", 1000001);
logWorker('worker1', worker1);

var worker2 = new Worker("Robert Anthony De Niro", 72, "male", 177, 62, "actor", 1000002);
logWorker('worker2', worker2);

var worker3 = new Worker("John Joseph Nicholson", 79, "male", 177, 64, "actor", 1000003);
logWorker('worker3', worker3);

var worker4 = new Worker("Diane Hall (Keaton)", 70, "female", 169, 54, "actress", 1000004);
logWorker('worker4', worker4);

var student1 = new Student("John Smith Jr.", 18, "male", 170, 55, "Massachusetts Institute of Technology", 10001);
logStudent('student1', student1);

var student2 = new Student("Ann Smith", 19, "female", 165, 50, "University of California, Berkeley", 10002);
logStudent('student2', student2);


function logHuman(title, obj) {
  console.log('========== Object: ' + title + ' ==========');
  console.log('\t    Full name: ' + obj.fullname);
  console.log('\t          Age: ' + obj.age);
  console.log('\t       Gender: ' + obj.gender);
  console.log('\t       Height: ' + obj.height);
  console.log('\t       Weight: ' + obj.weight);
}

function logWorker(title, obj) {
  logHuman(title, obj);
  console.log('\t   Occupation: ' + obj.occupation);
  console.log('\t       Salary: ' + obj.salary);
  console.log('\t       work(): ' + obj.work());
}

function logStudent(title, obj) {
  logHuman(title, obj);
  console.log('\t     Study at: ' + obj.studyAt);
  console.log('\t        Grant: ' + obj.grant);
  console.log('\twatchSeries(): ' + obj.watchSeries());
}

function logObj(title, o) {
  console.log('========== Object: ' + title + ' ==========');
  for (var key in o) {
    console.log('\t' + (o.hasOwnProperty(key)?'*':' ') + key + ': ' + o[key]);
  }
}
