document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect
    const subtitleText = "To the most amazing person in my life. Thank you for making every day brighter. I love you more than words can say. ✨\n\nMy Love ❤️,\nTishu tu mara life ma ayi 6u pachi her day mare life no bau je saro thai gayo 6a, It feels like the most beautiful chapter of my life🤗. Tu jarya hase 6a ne to maro akho day ekdam mast jai 6a agar hu sad hav ne tare jode vat karu to hu biju badhu je bhuli javu 6u ane ekdam khush thai javu 6u, your laugh is my favorite sound, and your love is the greatest gift I've ever received🥰. No matter where life takes us, Hu promise karu 6u k hu hamasa tare jode ubho rais and tane support karto rais tane bachaaa💋💋. Thank you for being my happiness, my peace, and my forever. I love you more than words can ever express. 💖✨";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;

    function typeWriter() {
        if (i < subtitleText.length) {
            typewriterElement.textContent += subtitleText.charAt(i);
            i++;
            
            // Auto-scroll down as the text types
            typewriterElement.scrollTop = typewriterElement.scrollHeight;
            
            setTimeout(typeWriter, 45);
        }
    }

    // Start typewriter after card pop-in animation
    setTimeout(typeWriter, 1200);

    // Mouse parallax effect for the card
    const card = document.getElementById('mainCard');
    const wrapper = document.querySelector('.content-wrapper');

    wrapper.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    wrapper.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    wrapper.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });

    // Fireworks effect on button click
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 2;
            this.vx = Math.cos(angle) * velocity;
            this.vy = Math.sin(angle) * velocity;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.size = Math.random() * 4 + 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1; // gravity
            this.life -= this.decay;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
            ctx.fill();
        }
    }

    let particles = [];
    const colors = ['255, 77, 109', '255, 179, 193', '201, 24, 74', '255, 255, 255', '114, 9, 183'];

    function createExplosion(x, y) {
        for (let i = 0; i < 150; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    animate();

    const surpriseBtn = document.getElementById('surpriseBtn');
    surpriseBtn.addEventListener('click', (e) => {
        const rect = surpriseBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Initial center explosion
        createExplosion(x, y);

        // Random explosions across the screen
        setTimeout(() => createExplosion(window.innerWidth * 0.2, window.innerHeight * 0.3), 300);
        setTimeout(() => createExplosion(window.innerWidth * 0.8, window.innerHeight * 0.4), 600);
        setTimeout(() => createExplosion(window.innerWidth * 0.5, window.innerHeight * 0.2), 900);
        setTimeout(() => createExplosion(window.innerWidth * 0.1, window.innerHeight * 0.6), 1200);
        setTimeout(() => createExplosion(window.innerWidth * 0.9, window.innerHeight * 0.7), 1500);

        surpriseBtn.textContent = "I Love You! ❤️";
        surpriseBtn.style.background = "linear-gradient(135deg, #7209b7, #560bad)";
        surpriseBtn.style.boxShadow = "0 10px 20px rgba(114, 9, 183, 0.4)";

        setTimeout(() => {
            surpriseBtn.textContent = "Click for a Surprise";
            surpriseBtn.style.background = "";
            surpriseBtn.style.boxShadow = "";
            
            // Show slideshow after the fireworks finish (approx 4 seconds)
            document.getElementById('slideshow-modal').classList.add('show');
            showSlides(slideIndex);
        }, 4000);
    });
});

// Slideshow logic
let slideIndex = 1;
let slideTimeout;

function plusSlides(n) {
  clearTimeout(slideTimeout);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(slideTimeout);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n !== undefined) {
      slideIndex = n;
  }
  
  if (slideIndex > slides.length) {slideIndex = 1}    
  if (slideIndex < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if(slides[slideIndex-1]) {
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
  }
  
  // Auto-advance
  clearTimeout(slideTimeout);
  if (document.getElementById('slideshow-modal').classList.contains('show')) {
      slideTimeout = setTimeout(() => {
          slideIndex++;
          showSlides(slideIndex);
      }, 3000); // Change image every 3 seconds
  }
}

function closeSlideshow() {
    document.getElementById('slideshow-modal').classList.remove('show');
    clearTimeout(slideTimeout);
}
