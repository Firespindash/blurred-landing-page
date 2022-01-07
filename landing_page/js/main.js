// DOM Elements
const body = document.getElementById('body'),
  time     = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name     = document.getElementById('name'),
  focus    = document.getElementById('focus');

// Create Blur Effect Element
var glass = document.createElement('div');
glass.setAttribute('id', 'glass');
body.appendChild(glass);

// Transition Effect
function removeFadeOut (el, speed) {
    var seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        body.removeChild(el);
    }, speed);
}

function appendFadeIn (element, speed) {
  body.appendChild(element);
  setTimeout(function() {
    element.style.opacity = 1;
  }, speed);

}

// Add Events for the Transition Effect
name.onfocus = function() { removeFadeOut(glass, 500); }
name.onblur = function() { appendFadeIn(glass, 500); }

focus.onfocus = function() { removeFadeOut(glass, 500); }
focus.onblur = function() { appendFadeIn(glass, 500); }

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setBgGreet();

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('img/morning.jpg')";
    greeting.textContent = 'Good Morning';
    document.body.style.color = 'black';
  }
  else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon';
    document.body.style.color = 'black';
  }
  else {
    // Evening
    document.body.style.backgroundImage = "url('img/night.jpg')";
    greeting.textContent = 'Good Evening';
    document.body.style.color = 'white';
  }
}

// Fixing Background
function FixBackgroundToScreen() {
    bgImg = new Image();
    bgImg.src = document.body.background;

    if ((bgImg.height / window.innerHeight) < (bgImg.width / window.innerWidth))
        document.body.style.backgroundSize = "auto 100%";
    else
        document.body.style.backgroundSize = "100% 100%";
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  }
  else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  }
  else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  }
  else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  }
  else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
FixBackgroundToScreen();
getName();
getFocus();
