function SplitChronograph(parentHTML = document.body) {

  this._createHTML = function() {
    var root = document.createElement("div");
    root.classList.add("chronograph");

    var scr = document.createElement("div");
    scr.classList.add("splitchrono__screen");
    var e = document.createElement("div");
    e.classList.add("splitchrono__screen_hms");
    e.innerHTML = "00:00:00";
    scr.appendChild(e);

    e = document.createElement("div");
    e.classList.add("splitchrono__screen_ms");
    e.innerHTML = "00:00:00.000&emsp;000";
    scr.appendChild(e);
    root.appendChild(scr);

    e = document.createElement("div");
    e.classList.add("splitchrono__button", "splitchrono__button_start");
    e.innerHTML = "Start";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("splitchrono__button", "splitchrono__button_stop");
    e.innerHTML = "Stop";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("splitchrono__button", "splitchrono__button_split", "splitchrono__button_split--notactive");
    e.innerHTML = "Split";
    root.appendChild(e);

    e = document.createElement("div");
    e.classList.add("splitchrono__button", "splitchrono__button_reset");
    e.innerHTML = "Reset";
    root.appendChild(e);

    parentHTML.appendChild(root);
  }
  this._createHTML();

  function _splitTime(msec) {
    var ms = msec % 1000;
    msec = Math.floor(msec / 1000);
    var ss = msec % 60;
    msec = Math.floor(msec / 60);
    var mm = msec % 60;
    var hh = Math.floor(msec / 60);
    if (hh > 99) {
      hh = hh - 99;
    };
    return {"hh": hh, "mm": mm, "ss": ss, "ms": ms};
  }

  function _displayTimer(reset = false) {
    var dTimer, dSplit;
    dSplit = _splitTime(splitTimer);
    if (reset) {
      dTimer = dSplit;
    } else {
      dTimer = _splitTime((new Date()).getTime() - startTime + accumulator);
    }
    hmsElement.innerHTML = zeroPad(dTimer.hh, 2) + ":" + zeroPad(dTimer.mm, 2) + ":" + zeroPad(dTimer.ss, 2);
    msElement.innerHTML = zeroPad(dSplit.hh, 2) + ":" + zeroPad(dSplit.mm, 2) + ":" + zeroPad(dSplit.ss, 2)
      + "." + zeroPad(dSplit.ms, 3) + "&emsp;" + zeroPad(dTimer.ms, 3);
  }

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  var startTime, accumulator = 0, splitTimer = 0, funId;

  this.startWatch = function() {
    startTime = (new Date()).getTime();
    startButton.style.display="none";
    stopButton.style.display="block";
    splitButton.classList.remove("splitchrono__button_split--notactive");
    funId = setInterval(_displayTimer, 10);
  }

  this.stopWatch = function() {
    accumulator += (new Date()).getTime() - startTime;
    clearInterval(funId);
    splitTimer = accumulator;
    stopButton.style.display="none";
    startButton.style.display="block";
    splitButton.classList.add("splitchrono__button_split--notactive");
    _displayTimer(true);
    var t = _splitTime(splitTimer);
    console.log(" stop: " +
      zeroPad(t.hh, 2) + ":" + zeroPad(t.mm, 2) + ":" + zeroPad(t.ss, 2) + "." + zeroPad(t.ms, 3));
  }

  this.splitWatch = function() {
    if (!splitButton.classList.contains("splitchrono__button_split--notactive")) {
      splitTimer = (new Date()).getTime() - startTime;
      var t = _splitTime(splitTimer);
      console.log("split: " +
      zeroPad(t.hh, 2) + ":" + zeroPad(t.mm, 2) + ":" + zeroPad(t.ss, 2) + "." + zeroPad(t.ms, 3));
    }
  }

  this.resetWatch = function() {
    clearInterval(funId);
    splitTimer = startTime = accumulator = 0;
    _displayTimer(true);
    stopButton.style.display="none";
    startButton.style.display="block";
  }

  var startButton = document.getElementsByClassName("splitchrono__button_start")[0];
  startButton.addEventListener("click", this.startWatch);
  var stopButton = document.getElementsByClassName("splitchrono__button_stop")[0];
  stopButton.addEventListener("click", this.stopWatch);
  var splitButton = document.getElementsByClassName("splitchrono__button_split")[0];
  splitButton.addEventListener("click", this.splitWatch);
  var resetButton = document.getElementsByClassName("splitchrono__button_reset")[0];
  resetButton.addEventListener("click", this.resetWatch);

  var hmsElement = document.getElementsByClassName("splitchrono__screen_hms")[0];
  var msElement = document.getElementsByClassName("splitchrono__screen_ms")[0];
}
