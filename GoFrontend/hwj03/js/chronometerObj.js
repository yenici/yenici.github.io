function Chronograph(parentHTML = document.body) {

  this._createHTML = function() {
    var root = document.createElement("div");
    root.classList.add("chronograph");

    var scr = document.createElement("div");
    scr.classList.add("chronograph__screen");
    var e = document.createElement("div");
    e.classList.add("chronograph__screen_hms");
    e.innerHTML = "00:00:00";
    scr.appendChild(e);
    e = document.createElement("div");
    e.classList.add("chronograph__screen_ms");
    e.innerHTML = "000";
    scr.appendChild(e);
    root.appendChild(scr);

    e = document.createElement("div");
    e.classList.add("chronograph__button", "chronograph__button_start");
    e.innerHTML = "Start";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("chronograph__button", "chronograph__button_pause");
    e.innerHTML = "Pause";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("chronograph__button", "chronograph__button_resume");
    e.innerHTML = "Resume";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("chronograph__button", "chronograph__button_clear");
    e.innerHTML = "Clear";
    root.appendChild(e);

    parentHTML.appendChild(root);
  }
  this._createHTML();

  this._displayTimer = function() {

  }

  this._displayTime = function() {
    var dif = (delta == 0) ? ((new Date()).getTime() - counter) : delta;
    var ms = dif % 1000;
    dif = Math.floor(dif / 1000);
    var ss = dif % 60;
    dif = Math.floor(dif / 60);
    var mm = dif % 60;
    var hh = Math.floor(dif / 60);
    if (hh > 99) {
      hh = mm = ss = 0;
    };
    hmsElement.innerHTML = zeroPad(hh, 2) + ":" + zeroPad(mm, 2) + ":" + zeroPad(ss, 2);
    msElement.innerHTML = "" + zeroPad(ms, 3);

    function zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }
  }

  var counter = 0;
  var delta = 0;
  var funId = null;
  var self = this;

  this.startWatch = function() {
    counter = (new Date()).getTime();
    startButton.style.display="none";
    pauseButton.style.display="block";
    funId = setInterval(self._displayTime, 10);
  }

  this.pauseWatch = function() {
    delta = (new Date()).getTime() - counter;
    clearInterval(funId);
    pauseButton.style.display="none";
    resumeButton.style.display="block";
    self._displayTime(); // update the screen according to actual stop time
  }

  this.resumeWatch = function() {
    counter = (new Date()).getTime() - delta;
    delta = 0;
    funId = setInterval(self._displayTime, 10);
    resumeButton.style.display="none";
    pauseButton.style.display="block";
  }

  this.clearWatch = function() {
    clearInterval(funId);
    delta = 0;
    startButton.style.display="block";
    pauseButton.style.display="none";
    resumeButton.style.display="none";
    hmsElement.innerHTML = "00:00:00";
    msElement.innerHTML = "000";
  }

  var startButton = document.getElementsByClassName("chronograph__button_start")[0];
  startButton.addEventListener("click", this.startWatch);
  var pauseButton = document.getElementsByClassName("chronograph__button_pause")[0];
  pauseButton.addEventListener("click", this.pauseWatch);
  var resumeButton = document.getElementsByClassName("chronograph__button_resume")[0];
  resumeButton.addEventListener("click", this.resumeWatch);
  var clearButton = document.getElementsByClassName("chronograph__button_clear")[0];
  clearButton.addEventListener("click", this.clearWatch);
  var hmsElement = document.getElementsByClassName("chronograph__screen_hms")[0];
  var msElement = document.getElementsByClassName("chronograph__screen_ms")[0];
}
