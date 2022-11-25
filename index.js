//Digital Clock
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();

// Heading change based on time of day
const headingChange = () => {
  const date = new Date();
  const hours = date.getHours();
  let heading = document.getElementById("heading");
  if (hours < 12) {
    heading.innerHTML = "Good Morning,";
  } else if (hours < 18) {
    heading.innerHTML = "Good Afternoon,";
  } else {
    heading.innerHTML = "Good Evening,";
  }
};
headingChange();


// Not allowed by browser
// window.onload = function() {
//   document.getElementById("myAudio").play();
// }

const soundCloud = document.querySelector('.sound-cloud');
const off = document.querySelector('#off');
const on = document.querySelector('#on');
const myAudio = document.querySelector('#myAudio');

off.addEventListener('click', () => soundTrack('off'));
on.addEventListener('click', () => soundTrack('on'));

const soundTrack = (soundState) => {
    if(soundState === 'off'){
        on.style.display = 'block';
        off.style.display = 'none';
        soundCloud.style.color = "#08fdd8";
        myAudio.play();
    }
    else if(soundState === 'on'){
        on.style.display = 'none';
        off.style.display = 'block';
        soundCloud.style.color = "#f50057";
        myAudio.pause();
    }
};


// Navigation functionality
const btnBars = document.querySelector('.bars');
const btnTimes = document.querySelector('.times');
const SideNav = document.querySelector('.aside');


btnBars.addEventListener('click', () => myFunc('open'));
btnTimes.addEventListener('click', () => myFunc('close'));

const myFunc = (navCondition) => {
    if(navCondition === 'open'){
        SideNav.classList.add('show_nav');
        btnTimes.style.display = "block";
        btnBars.style.display = "none";
    }
    else if(navCondition === 'close'){
            SideNav.classList.remove('show_nav');
            btnTimes.style.display = "none";
            btnBars.style.display = "block";
    }
};

// Tagcanvas functionality
$(document).ready(function(){
  if(!$("#myCanvas").tagcanvas({
    textColour : "#00ffff",
    outlineColour : "#ff00ff",
    reverse : true,
    depth : 0.8,
    maxSpeed : 0.05,
    weight : true,
    initial : [0.02, 0.02],
    
  },"tags")){
    // something went wrong, hide the canvas container
    $('#myCanvasContainer').hide();
  }
});

// Fancy heading
var fancyHeading = document.getElementsByClassName('fancy')[0];
var letters = fancyHeading.textContent.split('');

var content = letters.map((val, i) => {
  let delay = Math.floor((Math.random() * 1000) + 1);
  return ('<span style="animation-delay: '+ delay + 'ms">'
          + val +
          '</span>');
});

fancyHeading.innerHTML = "";

for (var i = 0; i < content.length; i++) {
  fancyHeading.innerHTML += content[i];
}

