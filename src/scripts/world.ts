import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { getFresnelMat } from "./utils/fresnel";
import { getStarfield } from "./utils/starfield";
import { Easing, Group, Tween } from "@tweenjs/tween.js";
import { startLocationSection } from "./location";
import { allowScrolling, disableScrolling } from "./utils/scroll";

const width = window.innerWidth;
const height = window.innerHeight;
const tweens = new Group();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  width / height,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
document
  .querySelector(".world-container")
  ?.prepend(renderer.domElement);

function addEarth() {
  const mapTexture = loader.load("/static/assets/earth/map.jpg");
  mapTexture.generateMipmaps = false;
  mapTexture.magFilter = THREE.NearestFilter;

  const material = new THREE.MeshPhongMaterial({
    map: mapTexture,
    specularMap: loader.load("/static/assets/earth/spec.jpg"),
    bumpMap: loader.load("/static/assets/earth/bump.jpg"),
    bumpScale: 0.04,
  });
  const earthMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(earthMesh);
}

function addLights() {
  const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("/static/assets/earth/lights.jpg"),
    blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMat);
  earthGroup.add(lightsMesh);
}

function addClouds() {
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("/static/assets/earth/clouds.jpg"),
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load("/static/assets/earth/clouds_alpha.jpg"),
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);
}

function addSunlight() {
  const sunLight = new THREE.DirectionalLight(0xffffff, 1.3);
  sunLight.position.set(-1, 3.5, -0.5);
  scene.add(sunLight);
}

function addGlow() {
  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);
}

function addStars() {
  const stars = getStarfield({ numStars: 2000 });
  scene.add(stars);
}

function addVigoOutline() {
  const mapTexture = loader.load("/static/assets/earth/vigo.png");
  const material = new THREE.MeshBasicMaterial({
    map: mapTexture,
    alphaToCoverage: true,
  });
  const vigoMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(vigoMesh);

  vigoMesh.visible = false;

  return vigoMesh;
}

const VIGO = {
  position: {
    x: -1.1076628154878492,
    y: 3.189020355262204,
    z: -0.056874048822029004,
  },
  rotation: {
    x: -1.5886287686692042,
    y: -0.3342506442769135,
    z: -1.6251056600878069,
  },
};

disableScrolling();

/* ----------------------------------------------------------------
  DEBUGGING
*/
const DEBUGGING = false;

if (DEBUGGING) {
  camera.position.set(
    VIGO.position.x,
    VIGO.position.y,
    VIGO.position.z,
  );
  camera.rotation.set(
    VIGO.rotation.x,
    VIGO.rotation.y,
    VIGO.rotation.z,
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.addEventListener("change", () => {
    console.log(camera.position, camera.rotation);
  });
}

/* ---------------------------------------------------------------- */

const loader = new THREE.TextureLoader();
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

const geometrySettings = { radius: 1, detail: 12 };
const geometry = new THREE.IcosahedronGeometry(
  geometrySettings.radius,
  geometrySettings.detail,
);

addEarth();
addLights();
addClouds();
addSunlight();
addGlow();
addStars();
const vigo = addVigoOutline();

const onWorldLoadCompleted = () => {
  startLocationSection();
  allowScrolling();
  vigo.visible = true;
  tweens.add(
    new Tween([vigo.scale, vigo.position])
      .to(
        [
          { x: 1.4, y: 1.4, z: 1.4 },
          { x: 0.04, y: 0.04, z: 0.05 },
        ],
        1000,
      )
      .delay(1000)
      .yoyo(true)
      .repeat(Infinity)
      .start(),
  );
};

tweens.add(
  new Tween([camera.position, camera.rotation])
    .to([VIGO.position, VIGO.rotation], 5000)
    .easing(Easing.Sinusoidal.InOut)
    .onComplete(() => {
      onWorldLoadCompleted();
    })
    .start(),
);

function animate(time) {
  tweens.update(time);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
