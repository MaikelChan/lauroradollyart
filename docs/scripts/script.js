let title = document.getElementById("home-title-measure-span");
let navMenu = document.getElementById("home-nav");
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
    const speedBottom = -1.5;
    const distanceFromContent = 50;
    const titleRect = title.getBoundingClientRect();
    const navMenuRect = navMenu.getBoundingClientRect();

    let x = 0;

    // Top wave

    const topWaveY = titleRect.y - 30;

    ctx.beginPath();
    ctx.moveTo(0, 0);

    for (; ;) {
        let y = Math.sin((x * waveFrequency) + (animOffset * speedTop)) * waveAmplitude + topWaveY;
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

    const bottomWaveY = navMenuRect.y + navMenuRect.height + 60;

    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height);

    for (; ;) {
        let y = Math.sin((x * waveFrequency) + (animOffset * speedBottom)) * waveAmplitude + bottomWaveY;
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

    const titleY = titleRect.y + (titleRect.height * 0.5) - 90;

    DrawStar(titleRect.x - 30, titleY + 50, animOffset * -1.25, 5, 8, 2.5);
    DrawStar(titleRect.x - 70, titleY + 80, animOffset * -1.0, 5, 6, 2.5);
    DrawStar(titleRect.x - 50, titleY + 110, animOffset * -0.85, 5, 4, 2.5);
    DrawStar(titleRect.x - 20, titleY + 100, animOffset * -0.7, 5, 3.5, 2.5);
    DrawStar(titleRect.x - 30, titleY + 140, animOffset * -0.5, 5, 5, 2.5);

    DrawStar(titleRect.x + titleRect.width + 20, titleY + 60, animOffset * 0.5, 5, 4, 2.5);
    DrawStar(titleRect.x + titleRect.width + 45, titleY + 65, animOffset * 0.7, 5, 3.5, 2.5);
    DrawStar(titleRect.x + titleRect.width + 60, titleY + 90, animOffset * 0.8, 5, 5, 2.5);
    DrawStar(titleRect.x + titleRect.width + 25, titleY + 110, animOffset * 1.05, 5, 4, 2.5);
    DrawStar(titleRect.x + titleRect.width + 55, titleY + 140, animOffset * 1.3, 5, 8, 2.5);

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

// Social tracking

function TrackSocial(socialUrl)
{
    if (typeof umami !== 'undefined') {
        umami.track(props => ({ ...props, url: socialUrl }));
    }
}