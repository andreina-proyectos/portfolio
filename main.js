'use strict';
const projects = document.querySelector(".projects");
const images = document.querySelectorAll(".project__img");
const backgrounds = document.querySelectorAll(".project__bg");
const range = 40;

const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2));
// const calcValue = (a, b) => (a/b*range-range/2).toFixed(1)

let timeout;
document.addEventListener('mousemove', ({x, y}) => {
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
}, false);


//DEVICE*******************⭐️

if(window.DeviceOrientationEvent) {
  console.log("Browser supports the device orientation");
  //registering deviceorientation event listener
  window.addEventListener("deviceorientation", process, false);
} else {
  // The browser does not support the device orientation event
   console.log("Browser does not support the device orientation");
}

function process(event) {
//put the code to be executed when  device orientation is changed
console.log("Device Orientation changed");
var alpha = event.alpha;
var beta = event.beta;
var gamma = event.gamma;
console.log("Alpha : " + alpha + "Beta : " + beta + "Gamma : " + gamma ); 
