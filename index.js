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

const navLinks = document.querySelectorAll("#home aside.aside a");


btnBars.addEventListener('click', () => myFunc('open'));
btnTimes.addEventListener('click', () => myFunc('close'));

navLinks.forEach((link) => {
  link.addEventListener('click', () => myFunc('close'));
})

const myFunc = (navCondition) => {
    if(navCondition === 'open'){
        SideNav.classList.add('show_nav');
        btnTimes.style.display = "block";
        btnBars.style.display = "none";
        document.body.classList.add("nav-open");
      }
      else if(navCondition === 'close'){
        SideNav.classList.remove('show_nav');
        btnTimes.style.display = "none";
        btnBars.style.display = "block";
        document.body.classList.remove("nav-open");
    }
};

//Page reload when screen size changes
//window.addEventListener('resize', function() {
 // window.location.reload();
//});



// TagCanvas functionality
$(document).ready(function(){
  if(!$("#myCanvas").tagcanvas({
    textColour : "#40E0D0",
    outlineColour : "#ff00ff",
    reverse : true,
    depth : 0.8,
    maxSpeed : 0.05,
    weight : true,
    wheelZoom: false,
    initial : [0.04, 0.04],
    
  },"tags")){
    // something went wrong, hide the canvas container
    $('#myCanvasContainer').hide();
  }
});


// Fancy heading section 3
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

// Electro Canvas Animation
window.requestAnimFrame = function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback);
    }
  );
};

function init(elemid) {
  let canvas = document.getElementById(elemid),
    c = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  c.fillStyle = "rgba(16, 56, 186, 1)";
  c.fillRect(0, 0, w, h);
  return { c: c, canvas: canvas };
}

window.onload = function () {
  let c = init("canvas").c,
    canvas = init("canvas").canvas,
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    mouse = { x: false, y: false },
    last_mouse = {};

  function dist(p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
  }

  class segment {
    constructor(parent, l, a, first) {
      this.first = first;
      if (first) {
        this.pos = {
          x: parent.x,
          y: parent.y
        };
      } else {
        this.pos = {
          x: parent.nextPos.x,
          y: parent.nextPos.y
        };
      }
      this.l = l;
      this.ang = a;
      this.nextPos = {
        x: this.pos.x + this.l * Math.cos(this.ang),
        y: this.pos.y + this.l * Math.sin(this.ang)
      };
    }
    update(t) {
      this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
      this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
      this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
      this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
      this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    fallback(t) {
      this.pos.x = t.x;
      this.pos.y = t.y;
      this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
      this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    show() {
      c.lineTo(this.nextPos.x, this.nextPos.y);
    }
  }

  class tentacle {
    constructor(x, y, l, n, a) {
      this.x = x;
      this.y = y;
      this.l = l;
      this.n = n;
      this.t = {};
      this.rand = Math.random();
      this.segments = [new segment(this, this.l / this.n, 0, true)];
      for (let i = 1; i < this.n; i++) {
        this.segments.push(
          new segment(this.segments[i - 1], this.l / this.n, 0, false)
        );
      }
    }
    move(last_target, target) {
      this.angle = Math.atan2(target.y - this.y, target.x - this.x);
      this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
      this.t = {
        x: target.x - 0.8 * this.dt * Math.cos(this.angle),
        y: target.y - 0.8 * this.dt * Math.sin(this.angle)
      };
      if (this.t.x) {
        this.segments[this.n - 1].update(this.t);
      } else {
        this.segments[this.n - 1].update(target);
      }
      for (let i = this.n - 2; i >= 0; i--) {
        this.segments[i].update(this.segments[i + 1].pos);
      }
      if (
        dist(this.x, this.y, target.x, target.y) <=
        this.l + dist(last_target.x, last_target.y, target.x, target.y)
      ) {
        this.segments[0].fallback({ x: this.x, y: this.y });
        for (let i = 1; i < this.n; i++) {
          this.segments[i].fallback(this.segments[i - 1].nextPos);
        }
      }
    }
    show(target) {
      if (dist(this.x, this.y, target.x, target.y) <= this.l) {
        c.globalCompositeOperation = "lighter";
        c.beginPath();
        c.lineTo(this.x, this.y);
        for (let i = 0; i < this.n; i++) {
          this.segments[i].show();
        }
        c.strokeStyle =
          "hsl(" +
          (this.rand * 60 + 180) +
          ",100%," +
          (this.rand * 60 + 25) +
          "%)";
        c.lineWidth = this.rand * 2;
        c.lineCap = "round";
        c.lineJoin = "round";
        c.stroke();
        c.globalCompositeOperation = "source-over";
      }
    }
    show2(target) {
      c.beginPath();
      if (dist(this.x, this.y, target.x, target.y) <= this.l) {
        c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
        c.fillStyle = "#ff00ff";
      } else {
        c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
        c.fillStyle = "darkcyan";
      }
      c.fill();
    }
  }

  let maxl = 300,
    minl = 50,
    n = 30,
    numt = 500,
    tent = [],
    clicked = false,
    target = { x: 0, y: 0 },
    last_target = {},
    t = 0,
    q = 10;

  for (let i = 0; i < numt; i++) {
    tent.push(
      new tentacle(
        Math.random() * w,
        Math.random() * h,
        Math.random() * (maxl - minl) + minl,
        n,
        Math.random() * 2 * Math.PI
      )
    );
  }
  function draw() {
    if (mouse.x) {
      target.errx = mouse.x - target.x;
      target.erry = mouse.y - target.y;
    } else {
      target.errx =
        w / 2 +
        ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
          (Math.pow(Math.sin(t), 2) + 1) -
        target.x;
      target.erry =
        h / 2 +
        ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
          (Math.pow(Math.sin(t), 2) + 1) -
        target.y;
    }

    target.x += target.errx / 10;
    target.y += target.erry / 10;

    t += 0.01;

    c.beginPath();
    c.arc(
      target.x,
      target.y,
      dist(last_target.x, last_target.y, target.x, target.y) + 5,
      0,
      2 * Math.PI
    );
    c.fillStyle = "hsl(210,100%,80%)";
    c.fill();

    for (i = 0; i < numt; i++) {
      tent[i].move(last_target, target);
      tent[i].show2(target);
    }
    for (i = 0; i < numt; i++) {
      tent[i].show(target);
    }
    last_target.x = target.x;
    last_target.y = target.y;
  }

  canvas.addEventListener(
    "mousemove",
    function (e) {
      last_mouse.x = mouse.x;
      last_mouse.y = mouse.y;

      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    },
    false
  );

  canvas.addEventListener("mouseleave", function (e) {
    mouse.x = false;
    mouse.y = false;
  });

  canvas.addEventListener(
    "mousedown",
    function (e) {
      clicked = true;
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function (e) {
      clicked = false;
    },
    false
  );

  function loop() {
    window.requestAnimFrame(loop);
    c.clearRect(0, 0, w, h);
    draw();
  }

  window.addEventListener("resize", function () {
    (w = canvas.width = window.innerWidth),
      (h = canvas.height = window.innerHeight);
    loop();
  });

  loop();
  setInterval(loop, 1000 / 60);
};



$(document).ready(function(){
  $('img').mouseover(function(){
    $(this).css('transform','scale(1.3)');
    $(this).css('transition','all 0.3s ease-in-out');
  })
  
  $('img').mouseout(function(){
    $(this).css('transform','scale(1.0)');
    $(this).css('transition','all 0.3s ease-in-out');
  });
  
  $('img').click(function(){
    alert($(this).attr('alt'))      
  });
});

// GALLERY TEST 

