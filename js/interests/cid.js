import { TimelineLite } from 'gsap';

const lightBulb = document.querySelector('.lightbulb');
const cord = document.querySelector('.cord');
const astronaut = document.querySelector('.astronaut');
let cordClickListener;

const LIGHTBULB_ACTIVE_CLASS = 'lightbulb--active';

function toggleLightBulb(lightBulb) {
  lightBulb.classList.toggle(LIGHTBULB_ACTIVE_CLASS);
}

function turnOffLightBulb(lightBulb) {
  lightBulb.classList.remove(LIGHTBULB_ACTIVE_CLASS);
}

function pullCord(cord) {
  const timeline = new TimelineLite({
    onComplete: () => {
      const isLightsOn = lightBulb.classList.contains(LIGHTBULB_ACTIVE_CLASS);
      isLightsOn ? startCodeInTheDark() : goBackIntoTheDark();
    }
  });

  const stepDuration = 0.2;

  timeline.to(cord, stepDuration, { y: 20 }, '0');
  timeline.to(cord, stepDuration, { y: 0 });
}

function startCodeInTheDark() {
  const timeline = new TimelineLite();

  const astronautContent = astronaut.contentDocument.documentElement;
  const astronautParts = astronautContent.querySelectorAll('path');

  const astronautSmile = astronautContent.querySelector('.fix-that-smile-plz');

  timeline.set(astronaut, {
    opacity: 1
  });

  timeline.set(astronautSmile, {
    rotation: 180,
    transformOrigin: 'center center'
  });

  timeline.staggerFromTo(astronautParts, 0.5, { opacity: 0 }, { opacity: 1 }, 0.1);
  timeline.to(astronautSmile, 0.5, { rotation: 0 });
}

function goBackIntoTheDark() {
  const timeline = new TimelineLite();

  timeline.set(astronaut, {
    opacity: 0
  });
}

function start() {
  if (!lightBulb || !cord) return;

  cord.addEventListener('click', () => {
    toggleLightBulb(lightBulb);
    pullCord(cord);
  });
}

function end() {
  if (!lightBulb || !cord) return;

  turnOffLightBulb(lightBulb);

  cord.removeEventListener('click', cordClickListener);
}

export { start, end };
