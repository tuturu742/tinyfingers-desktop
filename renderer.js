'use strict';

const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.floor(Math.random() * 40);
  const lightness = 45 + Math.floor(Math.random() * 25);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function paint(x, y) {
  const radius = 10 + Math.random() * 90;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = randomColor();
  ctx.fill();
}

window.addEventListener('resize', resize);

window.addEventListener('keydown', (event) => {
  if (event.key.length === 1) {
    paint(Math.random() * canvas.width, Math.random() * canvas.height);
  }
});

window.addEventListener('click', (event) => {
  paint(event.clientX, event.clientY);
});

resize();
