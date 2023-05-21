let contents = document.getElementById("contents");
let title = document.getElementById("title");
let canvas = document.getElementById("bgCanvas");
let ctx = canvas.getContext("2d");

let previousTime = 0;
let animOffset = 0;

window.addEventListener("load", Initialize);
window.addEventListener("resize", ResizeCanvas);

function Initialize() {
    ResizeCanvas();
    requestAnimationFrame(Render);
}

function ResizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Render(time) {
    const deltaSeconds = (time - previousTime) / 1000.0;
    previousTime = time;

    animOffset += deltaSeconds;

    ctx.fillStyle = "#DAB6FB";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const waveSamplingRate = 32;
    const waveAmplitude = 20;
    const waveFrequency = 0.01;
    const speedTop = 1;
    const speedBottom = 1.5;
    const distanceFromContent = 100;
    const height = Math.max(distanceFromContent, (ctx.canvas.height - contents.clientHeight) * 0.5 - distanceFromContent);

    let x = 0;

    // Top wave

    ctx.beginPath();
    ctx.moveTo(0, 0);

    for (; ;) {
        let y = Math.sin((x * waveFrequency) + (animOffset * speedTop)) * waveAmplitude + height;
        ctx.lineTo(x, y);

        if (x > ctx.canvas.width) break;
        x += waveSamplingRate;
    }

    ctx.lineTo(ctx.canvas.width, 0);
    ctx.closePath();

    ctx.fillStyle = '#C9A4F9';
    ctx.fill();

    // Bottom wave

    x = 0;

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height);

    for (; ;) {
        let y = Math.sin((x * waveFrequency) - (animOffset * speedBottom)) * waveAmplitude + (ctx.canvas.height - height);
        ctx.lineTo(x, y);

        if (x > ctx.canvas.width) break;
        x += waveSamplingRate;
    }

    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();

    ctx.fillStyle = '#E9C3FA';
    ctx.fill();

    // Draw stars

    ctx.fillStyle = '#F1FFD6';

    let titleRect = title.getBoundingClientRect();

    DrawStar(titleRect.x - 30, titleRect.y + 50, animOffset * -1.25, 5, 8, 2.5);
    DrawStar(titleRect.x - 70, titleRect.y + 80, animOffset * -1.0, 5, 6, 2.5);
    DrawStar(titleRect.x - 50, titleRect.y + 110, animOffset * -0.85, 5, 4, 2.5);
    DrawStar(titleRect.x - 20, titleRect.y + 100, animOffset * -0.7, 5, 3.5, 2.5);
    DrawStar(titleRect.x - 30, titleRect.y + 140, animOffset * -0.5, 5, 5, 2.5);

    DrawStar(titleRect.x + titleRect.width + 20, titleRect.y + 70, animOffset * 0.5, 5, 4, 2.5);
    DrawStar(titleRect.x + titleRect.width + 45, titleRect.y + 75, animOffset * 0.7, 5, 3.5, 2.5);
    DrawStar(titleRect.x + titleRect.width + 60, titleRect.y + 100, animOffset * 0.8, 5, 5, 2.5);
    DrawStar(titleRect.x + titleRect.width + 25, titleRect.y + 120, animOffset * 1.05, 5, 4, 2.5);
    DrawStar(titleRect.x + titleRect.width + 55, titleRect.y + 150, animOffset * 1.3, 5, 8, 2.5);

    requestAnimationFrame(Render);
}

function DrawStar(x, y, angle, sides, radius, inset) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
        ctx.rotate(Math.PI / sides);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / sides);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}