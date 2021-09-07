let toggleButton = document.querySelector('.toggle');
let submit = document.querySelector('.submit');
let mrLover = document.querySelector("[name='mr-lover']");
let mrsLover = document.querySelector("[name='mrs-lover']");
let mrLoverBrand = document.querySelector(".brand");
let mrsLoverBrand = document.querySelector(".brand.last");
let hourEl = document.querySelector('.hour');
let minuteEl = document.querySelector('.minute');
let secondEl = document.querySelector('.second');
let dateEl = document.querySelector('.date');
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
toggleButton.addEventListener('click', () => {
  let html = document.querySelector('html');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    toggleButton.innerHTML = "Dark Mode";
  } else {
    console.log('entered in else');
    html.classList.add('dark');
    toggleButton.innerHTML = "White Mode";
  }
});
submit.addEventListener('click', () => {
  console.log("entered");
  console.log(mrLover.value + mrsLover.value);
  console.log(mrLoverBrand.innerHTML + mrsLoverBrand.innerHTML);
  if (mrLover.value && mrsLover.value) {
    mrLoverBrand.innerHTML = mrLover.value;
    mrsLoverBrand.innerHTML = mrsLover.value;
  } else {
    window.alert("Enter both mr-lover and mrs-lover to get it on clock");
  }
});

const setTime = () => {
  let time = new Date();
  let hours = time.getHours() % 12;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let monthDay = time.getDate();
  let month = time.getMonth();
  let year = time.getFullYear();
  let weekDay = time.getDay();
  // console.log({ day, month, year, weekDay })
  let secondRotateDeg = scale(seconds, 0, 60, 0, 360);
  let minuteRotateDeg = scale(minutes, 0, 60, 0, 360) + ((6 * seconds) / 60);
  let hourRotateDeg = scale(hours, 0, 12, 0, 360) + ((30 * minutes) / 60);
  hourEl.style.transform = `translate(-50%, 10%) rotate(${hourRotateDeg}deg)`;
  minuteEl.style.transform = `translate(-50%, 10%) rotate(${minuteRotateDeg}deg)`;
  secondEl.style.transform = `translate(-50%, 10%) rotate(${secondRotateDeg}deg)`;
  dateEl.innerHTML = `${days[weekDay]}, ${months[month]} <span class="day"> ${monthDay} </span>, ${year}`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
setInterval(setTime, 1000);