// Create basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a player model
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(geometry, material);
scene.add(player);

camera.position.z = 5;

// Handle basic player movement
document.addEventListener('keydown', (event) => {
  if (event.key === 'w') player.position.z -= 0.1;
  if (event.key === 's') player.position.z += 0.1;
  if (event.key === 'a') player.position.x -= 0.1;
  if (event.key === 'd') player.position.x += 0.1;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Set up Socket.io for real-time player synchronization
const socket = io();

// Send player position to server
function updatePlayerPosition() {
  socket.emit('move', { x: player.position.x, z: player.position.z });
}
setInterval(updatePlayerPosition, 50); // Sync every 50ms

// Listen for other players' movements
socket.on('updatePlayers', (players) => {
  // Update other players' positions based on server data
});
