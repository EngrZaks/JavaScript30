// get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenbtn = player.querySelector(".fullscreen");
//build our functions
function toggleplay() {
     if (video.paused) {
          video.play();
     } else {
          video.pause();
     }
}
function updateButton() {
     const icon = this.paused ? "►" : "⏸";
     toggle.textContent = icon;
}
function skip() {
     console.log(this.dataset.skip);
     video.currentTime += parseFloat(this.dataset.skip);
}
function rangeUpdate() {
     video[this.name] = this.value;
     console.log(this.name);
}
function handleprogress() {
     const percent = (video.currentTime / video.duration) * 100;
     progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
     const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
     video.currentTime = scrubtime;
}
//hook up our event listeners

video.addEventListener("click", toggleplay);
toggle.addEventListener("click", toggleplay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleprogress);
skipButtons.forEach((buton) => {
     buton.addEventListener("click", skip);
});
ranges.forEach((range) => {
     range.addEventListener("change", rangeUpdate);
});
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", function () {
     if (mousedown) {
          scrub();
     }
});

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
window.addEventListener("keypress", function (e) {
     if (e.keyCode != 32) {
          return;
     }
     toggleplay();
     console.log(e.keyCode);
});
fullscreenbtn.addEventListener("click", function () {
     if (video.requestFullscreen) {
          video.requestFullscreen();
     } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
     } else if (video.mozRequestFullscreen) {
          video.mozRequestFullscreen();
     }
});
