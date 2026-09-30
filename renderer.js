'use strict';

(function () {
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomColour() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.floor(Math.random() * 40);
    const lightness = 45 + Math.floor(Math.random() * 25);
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }

  function paint(x, y) {
    const radius = 20 + Math.random() * 60;
    ctx.fillStyle = randomColour();

    if (Math.random() < 0.5) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI);
      ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      ctx.restore();
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('keydown', function (event) {
    event.preventDefault();
    paint(cx, cy);
    cx += (Math.random() - 0.5) * 80;
    cy += (Math.random() - 0.5) * 80;
    cx = Math.max(0, Math.min(canvas.width, cx));
    cy = Math.max(0, Math.min(canvas.height, cy));
  });

  window.addEventListener('pointerdown', function (event) {
    cx = event.clientX;
    cy = event.clientY;
    paint(cx, cy);
  });
})();
