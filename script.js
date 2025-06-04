gsap.registerPlugin(ScrollTrigger);

// Animation for name-section
gsap.timeline({
  scrollTrigger: {
    trigger: '.name-section',
    start: '40% center',
    end: 'bottom center',
    scrub: true,
    pin: true,
    markers: true
  }
})
.to('.first-name', { x: '-60vw' }, 0)
.to('.last-name', { x: '60vw' }, 0);

// Smooth scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Store shapes globally
let shapes = [];

window.addEventListener('DOMContentLoaded', () => {
  const shapeContainer = document.querySelector('.background-shapes');
  const shapeCount = 30;

  const shapeImages = [
    'images/caret-right-svgrepo-com.svg',
    'images/check-svgrepo-com.svg',
    'images/chevron-top-svgrepo-com.svg',
    'images/clear-svgrepo-com.svg',
    'images/github-svgrepo-com.svg',
    'images/location-svgrepo-com.svg',
    'images/refresh-svgrepo-com.svg',
  ];

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement('img');
    const randomImage = shapeImages[Math.floor(Math.random() * shapeImages.length)];
    shape.src = randomImage;
    shape.classList.add('shape');

    shape.style.top = `${Math.random() * 100}%`;
    shape.style.left = `${Math.random() * 100}%`;

    const size = Math.random() * 30 + 20;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    const rotation = Math.random() * 360;
    shape.style.transform = `rotate(${rotation}deg)`;

    shapeContainer.appendChild(shape);
    shapes.push(shape); // add to global array
  }
});

// Mousemove interaction
document.addEventListener('mousemove', e => {
  shapes.forEach(shape => {
    const rect = shape.getBoundingClientRect();
    const shapeX = rect.left + rect.width / 2;
    const shapeY = rect.top + rect.height / 2;

    const distX = e.clientX - shapeX;
    const distY = e.clientY - shapeY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    const maxDistance = 100;
    let scale = 4 - (distance / maxDistance);
    scale = Math.max(1, Math.min(scale, 2));

    shape.style.transform = `scale(${scale})`;
  });
});