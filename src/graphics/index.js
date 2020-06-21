import './styles.sass';

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics

const degToRad = degrees => degrees * Math.PI / 180;
const rand = (min, max) => Math.floor(Math.random() * (max-min+1)) + (min);

const setupCanvas = ({ canvas, width, height, fill }) => {
  const ctx = canvas.getContext('2d'); // here we get CanvasRenderingContext2D object

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, width, height);
  return { ctx };
};

// top left points of the canvas: 0, 0
// x: from left to right
// y: from top to bottom

const basicShapes = ({ canvas, width, height, fill }) => {
  
  const { ctx } = setupCanvas({ canvas, width, height, fill });

  // Paths:
  // beginPath() — start drawing a path at the point where the pen currently is on the canvas. On a new canvas, the pen starts out at (0, 0).
  // moveTo() — move the pen to a different point on the canvas, without recording or tracing the line; the pen simply "jumps" to the new position.
  // fill() — draw a filled shape by filling in the path you've traced so far.
  // stroke() — draw an outline shape by drawing a stroke along the path you've drawn so far.
  // You can also use features like lineWidth and fillStyle/strokeStyle with paths as well as rectangles.

 // lineTo(x, y) - draw a line
 // arc(x, y, circleRadius, startAngle, endAngle, isClockwise) - draw a circle, where startAngle: 0, endAngle: 360 a full circle Note: 0 degrees is horizontally to the right.

  // Triangle
  let triHeight = 50 * Math.tan(degToRad(60));

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(100, 50 + triHeight);
  ctx.lineTo(50, 50);
  ctx.fill();

  // Circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(200, 106, 50, degToRad(0), degToRad(360));
  ctx.fill();

  // Circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(400, 106, 50, degToRad(-45), degToRad(45));
  ctx.lineTo(400, 106); // draw line in the center of the circle at the end
  ctx.fill();

  // Circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(600, 106, 50, degToRad(-45), degToRad(45), true);
  ctx.lineTo(600, 106); // draw line in the center of the circle at the end
  ctx.fill();

  // fillText() — draws filled text.
  // strokeText() — draws outline (stroke) text.

  // Text
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.font = '36px arial';
  ctx.strokeText('Canvas text', 30, 30);

  // Text
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.font = '36px arial';
  ctx.fillText('Canvas text', 300, 30);
};

const loopsAndAnimations = ({ canvas, width, height, fill }) => {
  const { ctx } = setupCanvas({ canvas, width, height, fill });

  // This causes the coordinate origin (0, 0) to be moved to the center of the canvas, rather than being at the top left corner
  ctx.translate(width / 2, height / 2);

  let length = 250;
  let moveOffset = 20;

  for (let i = 0; i < length; i++) {
    ctx.fillStyle = `rgba(${255 - length}, 0, ${255 - length}, 0.9)`;
    ctx.beginPath();
    ctx.moveTo(moveOffset, moveOffset);
    ctx.lineTo(moveOffset + length, moveOffset);
    let triHeight = length / 2 * Math.tan(degToRad(60));
    ctx.lineTo(moveOffset + (length / 2), moveOffset + triHeight);
    ctx.lineTo(moveOffset, moveOffset);
    ctx.fill();

    length--;
    moveOffset += 0.7;
    ctx.rotate(degToRad(5));
  }

  // window.requestAnimationFrame(). It takes one parameter — the name of the function you want to run for each frame
  // window.cancelAnimationFrame() - cancel animation frame loop
};

const characterAnimation = ({ canvas, width, height, fill }) => { // A simple character animation
  const { ctx } = setupCanvas({ canvas, width, height, fill });
};

window.addEventListener('load', function() {
  const canvas1 = document.querySelector('#canvas-1');
  const canvas2 = document.querySelector('#canvas-2');
  const canvas3 = document.querySelector('#canvas-3');

  const width = window.innerWidth;
  const height = window.innerHeight;
  const fill = '#000';

  basicShapes({ canvas: canvas1, width, height, fill });
  loopsAndAnimations({ canvas: canvas2, width, height, fill });
});
