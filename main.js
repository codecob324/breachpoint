
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight);document.body.appendChild(renderer.domElement);
scene.add(camera); camera.position.set(0,2,5);
const light=new THREE.DirectionalLight(0xffffff,2); light.position.set(10,20,10); scene.add(light);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.MeshStandardMaterial({color:0x777777})); floor.rotation.x=-Math.PI/2; scene.add(floor);
const wall=new THREE.Mesh(new THREE.BoxGeometry(4,4,.5),new THREE.MeshStandardMaterial({color:0xb8b8b8})); wall.position.set(0,2,-10); scene.add(wall);
const keys={}; addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true); addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
addEventListener('click',()=>document.body.requestPointerLock());
let yaw=0,pitch=0;
document.addEventListener('mousemove',e=>{if(document.pointerLockElement!==document.body)return; yaw-=e.movementX*0.002; pitch=Math.max(-1.5,Math.min(1.5,pitch-e.movementY*0.002)); camera.rotation.order='YXZ'; camera.rotation.y=yaw; camera.rotation.x=pitch;});
function animate(){requestAnimationFrame(animate); const sp=.12; const f=new THREE.Vector3(); camera.getWorldDirection(f); f.y=0; f.normalize(); const r=new THREE.Vector3().crossVectors(f,new THREE.Vector3(0,1,0)).normalize(); if(keys.w)camera.position.add(f.clone().multiplyScalar(sp)); if(keys.s)camera.position.add(f.clone().multiplyScalar(-sp)); if(keys.a)camera.position.add(r.clone().multiplyScalar(sp)); if(keys.d)camera.position.add(r.clone().multiplyScalar(-sp)); renderer.render(scene,camera);} animate();
