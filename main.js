'use strict';
const projects = document.querySelector(".projects");
const images = document.querySelectorAll(".project__img");
const backgrounds = document.querySelectorAll(".project__bg");
const range = 40;

const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2));

function isDeviceMobile(){
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
}

function hasDeviceOrientation(){
  const hasOrientation = window.DeviceOrientationEvent? true : false;
  return hasOrientation;
}

const moveOnDesktop = ({x,y}) => {
  let timeout;
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }
  	
  timeout = window.requestAnimationFrame(() => {
    const yValue = calcValue(y, window.innerHeight);
    const xValue = calcValue(x, window.innerWidth);

    projects.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

    [].forEach.call(images, (image) => {
      image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
    });

    [].forEach.call(backgrounds, (background) => {
      background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
    })
	})
}

function moveOnRotateMobile(event) {
+
  console.log("Device Orientation changed");
  var beta = event.beta;
  var gamma = event.gamma;

  let timeout;
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }
  	
  timeout = window.requestAnimationFrame(() => {
   if(gamma >= 10){
     gamma = 10;
   }
   else if(gamma < -10){
     gamma = -10;
   }
  
   projects.style.transform = `rotateY(${gamma}deg) rotateX(${beta/15}deg)`;

    [].forEach.call(images, (image) => {
      var nextVal = (- (gamma/2)*2).toFixed();
      var anotherVal = ( (-gamma*2)).toFixed();
      image.style.transform = `translateX(${-nextVal}px) translateY(${anotherVal}px)`;
      image.style.transform = `translateX(${-((gamma)*1).toFixed()}px) translateY(${(beta-45).toFixed()}px)`;
    });

    [].forEach.call(backgrounds, (background) => {
      background.style.backgroundPosition = `${(gamma*.5).toFixed()}px ${(-beta*.5).toFixed()}px`;
    })
	})
} 


const isMobile = isDeviceMobile();
const hasOrientation = hasDeviceOrientation();


if(isMobile && hasOrientation){
  console.log("Yes, has orientation and is a MOBILE");
  window.addEventListener("deviceorientation", moveOnRotateMobile);
}
else if(!isMobile && hasOrientation){
  console.log("Yes, has orientation BUT is a COMPUTER");
  document.addEventListener('mousemove', moveOnDesktop);
}
else {
  console.log("Your browser does not support the animation :(")
}