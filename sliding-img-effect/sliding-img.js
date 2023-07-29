const track = document.getElementById("image-track");

let isMouseDown = false;
let mouseDownAt = 0;


window.addEventListener("mousedown", e => {
  isMouseDown = true;
  mouseDownAt = e.clientX;
});

window.addEventListener("mouseup", () => {
  isMouseDown = false;
  mouseDownAt = 0;
  track.dataset.prevPercentage = track.dataset.percentage;
});


let nextPercentage = 0;

window.addEventListener("mousemove", e => {
  if (isMouseDown) {
    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
    track.dataset.percentage = nextPercentage;
    
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });

    track.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    
  }
}
});