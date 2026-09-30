'use strict';

const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

function randomColour() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.floor(Math.random() * 40);
  const lightness = 45 + Math.floor(Math.random() * 25);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function paintDot(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = randomColour();
  ctx.fill();
}

function paintLetter(char, x, y) {
  ctx.fillStyle = randomColour();
  ctx.font = `${60 + Math.floor(Math.random() * 120)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(char, x, y);
}

function randomPosition() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
}

window.addEventListener('keydown', (event) => {
  event.preventDefault();

  const pos = randomPosition();

  if (typeof event.key === 'string' && event.key.length === 1) {
    paintLetter(event.key, pos.x, pos.y);
  } else {
    paintDot(pos.x, pos.y, 20 + Math.random() * 80);
  }
});

window.addEventListener('pointerdown', (event) => {
  paintDot(event.clientX, event.clientY, 20 + Math.random() * 60);
});
