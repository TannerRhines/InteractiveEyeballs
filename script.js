let isTyping = false;
const inputElement = document.getElementById('exampleInputEmail1');

// Stop eyes from following mouse when focusing on input
inputElement.addEventListener('focus', () => {
  isTyping = true;

  document.querySelectorAll('.pupil').forEach((pupil) => {
    const iris = pupil.parentElement.querySelector('.iris');
    const irisRadius = parseFloat(iris.getAttribute('r'));

    let currentRadius = parseFloat(pupil.getAttribute('r'));

    // Ensure the pupil does not exceed the iris when enlarging
    if (currentRadius * 1.75 < irisRadius) {
      pupil.setAttribute('r', currentRadius * 1.75);
    }
  });
});

// Resume normal behavior when focus is lost
inputElement.addEventListener('blur', () => {
  isTyping = false;

  document.querySelectorAll('.pupil').forEach((pupil) => {
    const currentRadius = parseFloat(pupil.getAttribute('r'));
    pupil.setAttribute('r', currentRadius / 1.25);
  });
});

// Handling mouse move
document.addEventListener('mousemove', (e) => {
  if (!isTyping) {
    document.querySelectorAll('.eyeSVG').forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const iris = svg.querySelector('.iris');
      const pupil = svg.querySelector('.pupil');

      const scleraX = 50, scleraY = 50; // These are your sclera centers
      const irisRadius = parseFloat(iris.getAttribute('r'));

      const maxMovement = 40 - irisRadius; // sclera radius - iris radius

      const dx = e.clientX - (rect.left + scleraX);
      const dy = e.clientY - (rect.top + scleraY);

      const angle = Math.atan2(dy, dx);
      const distanceFromCenter = Math.min(maxMovement, Math.hypot(dx, dy));

      const irisX = distanceFromCenter * Math.cos(angle) + scleraX;
      const irisY = distanceFromCenter * Math.sin(angle) + scleraY;

      iris.setAttribute('cx', irisX);
      iris.setAttribute('cy', irisY);

      pupil.setAttribute('cx', irisX);
      pupil.setAttribute('cy', irisY);
    });
  }
});
