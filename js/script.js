const lightBtn = document.getElementById("btn1");
const modeBtn = document.getElementById("btn2");
const alarmOr24HBtn = document.getElementById("btn3");
const light = document.getElementById("light");
const screen = document.getElementById("screen");
const Ecran = document.getElementById("Ecran");

// Load the saved toggle value from local storage or initialize to true (12-hour format)
let twelveHour = localStorage.getItem('twelveHour') === 'false' ? false : true;

// Toggle function to flip state
function toggleState() {
  twelveHour = !twelveHour;
  // Save the new state in local storage
  localStorage.setItem('twelveHour', twelveHour);
}

// Event listener to toggle time format and update the display
function toggleTimeFormat() {
  alarmOr24HBtn.addEventListener("click", () => {
    toggleState();
    displayTime(twelveHour);
  });
}
toggleTimeFormat();

// Get the current day of the week
function getDay() {
  const date = new Date();
  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return days[date.getDay()];
}
const day = getDay();
console.log(day); // prints the current day of the week

// Get the current day of the month
function getCurrentDay() {
  const now = new Date();
  return now.getDate();
}
const today = getCurrentDay();
console.log(today);

// Function to toggle screen color
function toggleScreenColor(){
  Ecran.style.fill = "rgba(0,255,0,0.7)";
  setTimeout(() => {
    Ecran.style.fill = "#888";
  }, 3000);
}

// Activate light when the light button is pressed
function activateLight() {
  light.style.opacity = "1";
  setTimeout(() => {
    light.style.opacity = "0";
  }, 3000);
  toggleScreenColor();
}

// Watch for light button click
function watchLight() {
  lightBtn.addEventListener("click", activateLight);
}
watchLight();

// Display the current time in 12-hour or 24-hour format
function displayTime(use12Hour) {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let ampm = "AM";

  if (use12Hour) {
    if (hours >= 12) {
      ampm = "PM";
    }
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
  }
  
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = use12Hour 
    ? `<span id="format">${ampm}</span><span id="day-name">${day}</span><span id="day-date">${today}</span><p>${hours}:${minutes}:<small>${seconds}</small></p>`
    : `<span id="format">24H</span><span id="day-name">${day}</span><span id="day-date">${today}</span><p>${hours}:${minutes}:<small>${seconds}</small></p>`;

  screen.innerHTML = `${time}`;
}

// Call the function to display time based on the current format
displayTime(twelveHour);

// Update the time every half second
function updateTime() {
  setInterval(() => {
    displayTime(twelveHour);
  }, 500);
}
updateTime();
