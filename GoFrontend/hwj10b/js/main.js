/*
* Скопировать себе в script.js data.json, сделать из него обычный
* javascript-массив (распарсить). С помощью lodash получить несколько
* массивов:
*   1. Массив скиллов (поле skills) всех людей, не должно быть повторяющихся
* скиллов, так же они должны быть отсортированы по алфавиту;
*   2. Массив имен (поле name) людей, отсортированных в зависимости от
* количества их друзей (friends);
*   3. Массив всех друзей всех пользователей, не должно быть повторяющихся
* людей.
*/

'use strict';

document.addEventListener("DOMContentLoaded", function() {
  var data = getData('data/data.json');

  var arr1 = _.sortBy(
    _.uniq(
      _.flatten(
        _.map(data, 'skills')
      )
    )
  );
  addHtml(document.getElementById("task1"), arr1);

  // var arr2 = _.map(
  //   _.sortBy(data, [function(d) {
  //     return d.friends.length;
  //   }, 'name']), function(d) {
  //     return d.name + ' (' + d.friends.length + ')';
  //   }
  // );
  var arr2 = _.map(
    _.sortBy(data, ['friends', 'name']),
    'name'
  );
  addHtml(document.getElementById("task2"), arr2);

  var arr3 = _.sortBy(
    _.uniq(
      _.map(
        _.flatten(
          _.map(data, 'friends')
        ),
        'name'
      )
    )
  );
  addHtml(document.getElementById("task3"), arr3);

});

function addHtml(e, array) {
  e.innerHTML = 'ELEMENTS COUNT: ' + array.length + '<br><br>';
  _.each(array, function(d) {
    e.innerHTML += d + '<br>';
  });
}
