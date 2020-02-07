const keyToSample = {};

document.querySelectorAll(".pad").forEach(element => {
  element.addEventListener("click", () => {
    playSample(element.dataset.sample);
  });

  element.addEventListener("transitionend", e => {
    if (e.propertyName != "transform") return;
    element.classList.remove("playing");
  });

  keyToSample[element.dataset.key] = element.dataset.sample;
});

function playSample(name) {
  const sample = document.getElementById(name);
  sample.currentTime = 0;
  sample.play();

  const pad = document.querySelector(`.pad[data-sample="${name}"]`);
  pad.classList.add("playing");
}

document.addEventListener("keydown", e => {
  playSample(keyToSample[e.key]);
});
