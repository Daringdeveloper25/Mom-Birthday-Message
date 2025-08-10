const messages = [
    "Mom, thank you for all that you do for us.",
    "You are always there for us when we need you.",
    "You support us in everything we do.",
    "I hope your birthday is as wonderful as you are and that you have a great year ahead.",
    "Happy Birthday Mom!"
];

let currentSlide = 0;

const slideMessage = document.getElementById('slide-message');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Confetti setup
let confettiCanvas = null;
let confettiActive = false;
let confettiParticles = [];

function createConfettiCanvas() {
    if (confettiCanvas) return;
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    document.body.appendChild(confettiCanvas);
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}

function launchConfetti() {
    createConfettiCanvas();
    confettiActive = true;
    confettiParticles = [];
    for (let i = 0; i < 120; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -20,
            r: Math.random() * 8 + 4,
            d: Math.random() * 80 + 40,
            color: `hsl(${Math.random()*360},80%,60%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05
        });
    }
    requestAnimationFrame(drawConfetti);
    setTimeout(stopConfetti, 3500);
}

function drawConfetti() {
    if (!confettiActive) return;
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
        p.y += Math.cos(p.d) + 2 + p.r/2;
        p.x += Math.sin(p.d);
        p.tiltAngle += p.tiltAngleIncrement;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r/2, p.tilt, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 20);
    if (confettiParticles.length > 0) {
        requestAnimationFrame(drawConfetti);
    }
}

function stopConfetti() {
    confettiActive = false;
    if (confettiCanvas) {
        confettiCanvas.parentNode.removeChild(confettiCanvas);
        confettiCanvas = null;
    }
}

function showSlide(index) {
    slideMessage.textContent = messages[index];
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === messages.length - 1 ? 'hidden' : 'visible';
    if (index === messages.length - 1) {
        launchConfetti();
    } else {
        stopConfetti();
    }
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < messages.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

// Initialize
showSlide(currentSlide);