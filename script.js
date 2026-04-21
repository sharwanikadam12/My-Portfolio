// Intro Removal
window.addEventListener('load', () => {
    setTimeout(() => {
        const intro = document.getElementById('intro-overlay');
        intro.style.opacity = '0';
        setTimeout(() => intro.remove(), 1000);
    }, 3500);
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            const id = e.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('section').forEach(s => observer.observe(s));

// Cherry Blossom Cursor Trail
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let petals = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Petal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 3;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
    }
    draw() {
        ctx.fillStyle = `rgba(247, 209, 232, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && petals.length < 15) {
        petals.push(new Petal(e.clientX, e.clientY));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.opacity <= 0) petals.splice(i, 1);
    });
    requestAnimationFrame(animate);
}
animate();



/* --- REFINED JARS STAGGERED DELAY LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    // Select all the images within all jar fountains
    const fountainImages = document.querySelectorAll('.jar-content-fountain .fountain-img');
    
    // Total duration of the CSS animation (must match .fountain-img animation setting)
    const animationDurationSeconds = 7;
    const numImagesPerJar = 5;
    
    // Calculate the delay increment to spread them out evenly
    const delayIncrement = animationDurationSeconds / numImagesPerJar; // e.g., 7 / 5 = 1.4s

    fountainImages.forEach((img, index) => {
        // The index resets for each jar if we iterate correctly. 
        // A simple way is to use modulo to reset the index 0-4 for each jar.
        const imageIndexInJar = index % numImagesPerJar;
        
        // Apply individual delay: Image 1=0s, Image 2=1.4s, Image 3=2.8s, etc.
        img.style.animationDelay = `${imageIndexInJar * delayIncrement}s`;
    });
});

















// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});