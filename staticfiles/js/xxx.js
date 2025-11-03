// ============================================
// 🎬 GSAP ANIMATION SYSTEM
// Enhanced animations for Phantom Phishers
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - animations disabled');
    return;
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // 🎭 DOOR ENTRANCE ANIMATIONS
  // ============================================
  
  function initDoorAnimations() {
    const corridor = document.querySelector('.haunted-corridor');
    const doors = document.querySelectorAll('.haunted-doorway');
    
    if (!corridor || doors.length === 0) return;

    // Fade in the corridor title
    gsap.from('.corridor-title', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });

    // Animate corridor appearance
    gsap.to(corridor, {
      opacity: 1,
      duration: 0.8,
      delay: 0.3
    });

    // Stagger door appearances
    gsap.from(doors, {
      opacity: 0,
      scale: 0.8,
      rotationY: -90,
      duration: 1.2,
      stagger: 0.2,
      ease: 'back.out(1.4)',
      delay: 0.8,
      onComplete: function() {
        // Add subtle floating animation after doors appear
        doors.forEach((door, index) => {
          gsap.to(door, {
            y: '+=10',
            duration: 2 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });
      }
    });

    // Door hover sound effect (optional)
    doors.forEach(door => {
      door.addEventListener('mouseenter', function() {
        // Creak sound effect
        gsap.to(this.querySelector('.door-knob'), {
          rotation: 15,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      door.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.door-knob'), {
          rotation: 0,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // ============================================
  // ✨ SPLIT TEXT TITLE ANIMATION
  // ============================================
  
  function initTitleAnimation() {
    const title = document.getElementById('mainTitle');
    if (!title) return;

    // Split text into characters
    const text = title.textContent;
    title.innerHTML = '';
    
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      word.split('').forEach((char, charIndex) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.opacity = '0';
        wordSpan.appendChild(charSpan);
      });
      
      title.appendChild(wordSpan);
      if (wordIndex < words.length - 1) {
        title.appendChild(document.createTextNode(' '));
      }
    });

    // Animate characters
    const chars = title.querySelectorAll('.char');
    
    gsap.from(chars, {
      opacity: 0,
      y: 100,
      rotationX: -90,
      transformOrigin: '50% 50%',
      stagger: {
        amount: 0.8,
        from: 'start'
      },
      duration: 1,
      ease: 'back.out(1.7)',
      delay: 0.2,
      onComplete: function() {
        // Pulse animation on complete
        gsap.to(title, {
          textShadow: '0 0 30px rgba(250, 103, 1, 0.4)',
          duration: 1.5,
          repeat: 1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }
    });

    // Add hover wiggle effect
    title.addEventListener('mouseenter', function() {
      gsap.to(chars, {
        y: -10,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    });
  }

  // ============================================
  // 📜 SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  
  function initScrollAnimations() {
    
    // Glass cards fade in on scroll
    gsap.utils.toArray('.glass-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Feature cards (if they exist)
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Parallax effect on floating elements
    gsap.utils.toArray('.ghost').forEach((ghost, index) => {
      gsap.to(ghost, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        },
        y: (index + 1) * 100,
        ease: 'none'
      });
    });

    // Status badge pop-in
    const badge = document.getElementById('badge');
    if (badge) {
      gsap.to(badge, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: 1.5
      });
    }
  }

  // ============================================
  // 🎃 PARTICLE CANVAS ANIMATIONS
  // ============================================
  
  function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = ['#fa6701', '#8B3A3A', '#3d5a6b', 'rgba(255,255,255,0.3)'][Math.floor(Math.random() * 4)];
        this.life = 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.5;

        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ============================================
  // 🎨 MAIN CARD ANIMATIONS
  // ============================================
  
  function initMainCardAnimation() {
    const mainCard = document.getElementById('mainCard');
    if (!mainCard) return;

    gsap.from(mainCard, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      delay: 1.2
    });

    // Team name pulse effect
    const teamName = document.querySelector('.team-name');
    if (teamName) {
      gsap.to(teamName, {
        textShadow: '0 0 20px rgba(250, 103, 1, 0.8)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // ============================================
  // 🎬 INITIALIZE ALL ANIMATIONS
  // ============================================
  
  // Wait a bit for page to settle
  setTimeout(() => {
    initTitleAnimation();
    initMainCardAnimation();
    initDoorAnimations();
    initScrollAnimations();
    initParticleCanvas();
  }, 100);

  // ============================================
  // 💫 CURSOR TRAIL EFFECT (OPTIONAL)
  // ============================================
  
  function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      
      if (trail.length > trailLength) {
        trail.shift();
      }

      // Draw trail particles
      trail.forEach((point, index) => {
        if (Date.now() - point.time < 500) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: 4px;
            height: 4px;
            background: rgba(250, 103, 1, ${0.5 - (index / trailLength * 0.5)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
          `;
          document.body.appendChild(particle);
          
          gsap.to(particle, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            onComplete: () => particle.remove()
          });
        }
      });
    });
  }

  // Uncomment to enable cursor trail
  // initCursorTrail();

});