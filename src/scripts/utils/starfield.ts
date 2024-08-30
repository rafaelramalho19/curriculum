import * as THREE from "three";

type SpherePoint = {
  position: THREE.Vector3;
  hue: number;
  minDist: number;
};

function randomSpherePoint(): SpherePoint {
  const radius = Math.random() * 25 + 25;
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  let x = radius * Math.sin(phi) * Math.cos(theta);
  let y = radius * Math.sin(phi) * Math.sin(theta);
  let z = radius * Math.cos(phi);

  return {
    position: new THREE.Vector3(x, y, z),
    hue: 0.6,
    minDist: radius,
  };
}

export const getStarfield = ({ numStars = 500 } = {}) => {
  const verts: number[] = [];
  const colors: number[] = [];
  const positions: SpherePoint[] = [];

  for (let i = 0; i < numStars; i += 1) {
    const p = randomSpherePoint();
    const { position, hue } = p;
    positions.push(p);

    const color = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(position.x, position.y, position.z);
    colors.push(color.r, color.g, color.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load("/static/assets/textures/star.png"),
  });

  const points = new THREE.Points(geo, mat);
  return points;
};
