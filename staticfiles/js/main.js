// ============================================
// PHANTOM PHISHERS - UNIFIED ANIMATION SYSTEM
// Windows-Compatible Version (No Emoji Characters)
// Combined & Optimized for Halloween Hackathon 2025
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // GSAP INITIALIZATION
  // ============================================
  if (typeof gsap === "undefined") {
    console.error("GSAP not loaded - animations will not run.");
    return;
  }

  // Register all GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  console.log(
    "%c*** PHANTOM PHISHERS LOADED ***",
    "color: #FF4500; font-size: 24px; font-weight: bold;"
  );

  // ============================================
  // CORE UI & EVENT LISTENERS
  // ============================================
  var initCoreUI = function () {
    var nav = document.getElementById("mainNav");
    var hamburger = document.getElementById("hamburger");
    var navMenu = document.getElementById("navMenu");
    var navLinks = document.querySelectorAll(".nav-link");

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        if (nav) nav.classList.add("scrolled");
      } else {
        if (nav) nav.classList.remove("scrolled");
      }
    });

    // Mobile Menu Toggle
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      });

      navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        });
      });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href === "#") return;

        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Audio Control
    var audioToggle = document.getElementById("audioToggle");
    var bgAudio = document.getElementById("bgAudio");
    if (audioToggle && bgAudio) {
      bgAudio.volume = 0.3;
      audioToggle.addEventListener("click", function () {
        if (bgAudio.paused) {
          bgAudio.play().catch(function (e) {
            console.log("Audio autoplay prevented");
          });
          audioToggle.textContent = "SOUND ON";
        } else {
          bgAudio.pause();
          audioToggle.textContent = "SOUND OFF";
        }
      });
    }
  };

  // ============================================
  // MASTER ANIMATION TIMELINE
  // ============================================
  var initAnimations = function () {
    var masterTL = gsap.timeline({ delay: 0.3 });

    // 1. Navbar Animation
    masterTL
      .from(".nav-logo", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".nav-item",
        {
          y: -40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .from(
        ".nav-neon-line",
        {
          scaleX: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=0.6"
      );

    // 2. Title Animation with Character Split
    var title = document.getElementById("mainTitle");
    if (title) {
      var text = title.textContent;
      title.innerHTML = "";

      text.split("").forEach(function (char) {
        var span = document.createElement("span");
        span.className = "char";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        title.appendChild(span);
      });

      masterTL.from(
        title.querySelectorAll(".char"),
        {
          opacity: 0,
          y: 80,
          rotationX: -90,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=1.2"
      );

      // Add hover effect to title
      title.addEventListener("mouseenter", function () {
        gsap.to(title.querySelectorAll(".char"), {
          y: -10,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      });
    }

    // 3. Subtitle and Hero Card
    masterTL
      .from(
        ".subtitle",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.8"
      )
      .from(
        ".hero-card",
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // 4. Feature Highlights
    var highlights = document.querySelectorAll(".highlight-item");
    if (highlights.length > 0) {
      masterTL.from(
        highlights,
        {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // 5. CTA Section
    var ctaSection = document.querySelector(".cta-section");
    if (ctaSection) {
      masterTL.from(
        ctaSection,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  };

  // ============================================
  // DOOR ANIMATIONS - FIXED FOR VISIBILITY
  // ============================================
  var initDoorAnimations = function () {
    var corridor = document.querySelector(".haunted-corridor");
    var doors = document.querySelectorAll(".haunted-doorway");

    if (!corridor || doors.length === 0) {
      console.log("Doors not found - may be on different page");
      return;
    }

    console.log("Initializing " + doors.length + " doors");

    // CRITICAL: Make corridor visible immediately
    gsap.set(corridor, {
      opacity: 1,
      visibility: "visible",
    });

    // CRITICAL: Make doors visible immediately
    gsap.set(doors, {
      opacity: 1,
      visibility: "visible",
    });

    var doorTL = gsap.timeline({ delay: 1.5 });

    doorTL.from(doors, {
      scale: 0.8,
      y: 50,
      rotationY: -15,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.4)",
      onComplete: function () {
        // Add floating animation after doors appear
        doors.forEach(function (door, index) {
          gsap.to(door, {
            y: "+=8",
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      },
    });

    // Door hover interactions
    doors.forEach(function (door) {
      var doorPanel = door.querySelector(".door-panel");
      var doorKnob = door.querySelector(".door-knob");
      var doorLight = door.querySelector(".door-light");

      door.addEventListener("mouseenter", function () {
        gsap.to(doorPanel, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });

        if (doorKnob) {
          gsap.to(doorKnob, {
            rotation: 15,
            duration: 0.2,
            ease: "power2.out",
          });
        }

        if (doorLight) {
          gsap.to(doorLight, {
            opacity: 1,
            duration: 0.3,
          });
        }
      });

      door.addEventListener("mouseleave", function () {
        gsap.to(doorPanel, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        if (doorKnob) {
          gsap.to(doorKnob, {
            rotation: 0,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          });
        }

        if (doorLight) {
          gsap.to(doorLight, {
            opacity: 0,
            duration: 0.3,
          });
        }
      });
    });
  };

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  var initScrollAnimations = function () {
    // Glass cards fade in on scroll
    gsap.utils.toArray(".glass-card").forEach(function (card) {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // Info items
    gsap.utils.toArray(".info-item").forEach(function (item, index) {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });

    // Step items
    gsap.utils.toArray(".step-item").forEach(function (step, index) {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  };

  // ============================================
  // PARTICLE CANVAS SYSTEM
  // ============================================
  var initParticleCanvas = function () {
    var canvas = document.getElementById("particleCanvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var maxParticles = 60;

    function Particle() {
      this.reset();
    }

    Particle.prototype.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 1.0;
      this.speedY = (Math.random() - 0.5) * 1.0;
      var colors = ["#fa6701", "#8B3A3A", "rgba(255,255,255,0.2)"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = Math.random() * 150 + 50;
      this.initialLife = this.life;
    };

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 1;

      if (
        this.life <= 0 ||
        this.x < -5 ||
        this.x > canvas.width + 5 ||
        this.y < -5 ||
        this.y > canvas.height + 5
      ) {
        this.reset();
      }
    };

    Particle.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.life / this.initialLife);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    for (var i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  // ============================================
  // FLOATING GHOSTS ANIMATION
  // ============================================
  var initFloatingElements = function () {
    // Animate ghosts
    document.querySelectorAll(".ghost").forEach(function (ghost, index) {
      gsap.to(ghost, {
        x: "+=" + (Math.random() * 100 - 50),
        y: "+=" + (Math.random() * 100 - 50),
        rotation: Math.random() * 10 - 5,
        duration: 5 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Animate bats
    document.querySelectorAll(".bat").forEach(function (bat, index) {
      gsap.to(bat, {
        x: "+=" + (Math.random() * 200 - 100),
        y: "+=" + (Math.random() * 150 - 75),
        rotation: Math.random() * 20 - 10,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    // Animate pumpkins
    document.querySelectorAll(".pumpkin").forEach(function (pumpkin, index) {
      gsap.to(pumpkin, {
        y: "+=" + (Math.random() * 30 - 15),
        rotation: Math.random() * 15 - 7.5,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  };

  // ============================================
  // 🎮 QUIZ TIMER & HANDLERS
  // ============================================
  function updateTimer(timerDisplay, timeLeft, timerInterval) {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
    }
    timeLeft.value--;
  }

  let timerInterval = null;
  let timeLeft = null;

  const timerDisplay = document.getElementById("quiz-timer");
  if (timerDisplay) {
    let timerValue = parseInt(
      timerDisplay.getAttribute("data-timer-value"),
      10
    );
    if (isNaN(timerValue)) {
      timerValue = 10 * 60;
    }
    timeLeft = { value: timerValue };
    updateTimer(timerDisplay, timeLeft);
    timerInterval = setInterval(
      () => updateTimer(timerDisplay, timeLeft, timerInterval),
      1000
    );
  }

  // ============================================
  // 🎮 URL SCAN HANDLERS
  // ============================================
  // --- URLScan.io two-step scan logic ---
  let scanUuid = null;
  let scanPollInterval = null;

  function startUrlScan(url) {
    fetch("/scanner/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.uuid) {
          scanUuid = data.uuid;
          pollForScanResult();
          showScanStatus("Scan started. Waiting for results...");
        } else {
          showScanStatus("Scan error: " + (data.error || "Unknown error"));
        }
      })
      .catch((err) => {
        showScanStatus("Scan error: " + err);
      });
  }

  function pollForScanResult() {
    if (scanPollInterval) clearInterval(scanPollInterval);
    scanPollInterval = setInterval(() => {
      const csrfToken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
      )?.value;
      fetch("/scanner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ uuid: scanUuid }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "complete" && data.result) {
            clearInterval(scanPollInterval);
            showScanResult(data.result);
          } else if (data.status === "pending") {
            showScanStatus("Scan in progress...");
          } else {
            clearInterval(scanPollInterval);
            showScanStatus("Scan error: " + (data.error || "Unknown error"));
          }
        })
        .catch((err) => {
          clearInterval(scanPollInterval);
          showScanStatus("Scan error: " + err);
        });
    }, 2000); // poll every 2 seconds
  }

  function showScanStatus(msg) {
    const resultsDiv = document.getElementById("scan-results");
    if (resultsDiv) resultsDiv.textContent = msg;
  }

  function showScanResult(result) {
    const resultsDiv = document.getElementById("scan-results");
    if (!resultsDiv) return;

    // Defensive checks for nested properties
    const verdicts =
      result.verdicts && result.verdicts.urlscan ? result.verdicts.urlscan : {};
    const score = verdicts.score !== undefined ? verdicts.score : "N/A";
    const malicious =
      verdicts.malicious !== undefined ? verdicts.malicious : "N/A";
    const reportURL =
      result.task && result.task.reportURL ? result.task.reportURL : null;

    let leadMsg = "";
    if (malicious === true || malicious === "True" || malicious === 1 || malicious === "1") {
      leadMsg = `<h2 class="scanner-title"> Trick! This URL is malicious.</h2>`;
    } else if (malicious === false || malicious === "False" || malicious === 0 || malicious === "0") {
      leadMsg = `<h2 class="scanner-title"> Treat! This URL appears safe.</h2>`;
    }

    let html = `<div style=\"text-align:center;\">`;
    html += leadMsg;
    // html += `<div><strong>Score:</strong> ${score}</div>`;
    // html += `<div><strong>Malicious:</strong> ${malicious}</div>`;
    if (reportURL) {
      html += `<div><a href=\"${reportURL}\" target=\"_blank\" class="btn btn-primary">View Full Report</a></div>`;
    }
    html += `</div>`;
    resultsDiv.innerHTML = html;
  }

  // ============================================
  // QUIZ RESULTS AUDIO
  // ============================================
  const quizConfig = document.getElementById("quiz-config");
  const audioBase = quizConfig
    ? quizConfig.getAttribute("data-audio-base")
    : null;
  const audioCache = {};
  let currentNarration = null;

  function stopCurrentNarration() {
    if (!currentNarration) {
      return;
    }
    currentNarration.pause();
    currentNarration.currentTime = 0;
    currentNarration = null;
  }

  function playQuestionNarration(questionId) {
    if (!audioBase || !questionId) {
      return;
    }

    const formattedId = questionId.toString().padStart(5, "0");
    const audioPath = `${audioBase}/${formattedId}_NARRATOR.mp3`;

    stopCurrentNarration();

    if (!audioCache[audioPath]) {
      audioCache[audioPath] = new Audio(audioPath);
    }

    currentNarration = audioCache[audioPath];
    currentNarration
      .play()
      .catch((error) => console.warn("Unable to play narration", error));
  }

  // ============================================
  // QUIZ PAGE BUTTON FIX
  // ============================================
  // var initQuizButtons = function() {
  //   // Find start button
  //   var startButton = document.getElementById('startQuizBtn') ||
  //                    document.querySelector('.start-quiz-btn') ||
  //                    document.querySelector('button[data-type="start-quiz"]') ||
  //                    document.querySelector('button[type="submit"]');

  //   if (startButton) {
  //     console.log("Quiz button found - adding click handler");
  //     startButton.addEventListener('click', function(e) {
  //       console.log("Quiz button clicked!");
  //       // Let the default form submission happen
  //              // Prompt for username (you can use a modal or prompt for simplicity)
  //       let username = prompt(
  //         "Enter your nickname for the leaderboard (max 20 chars):",
  //         ""
  //       );
  //       if (!username) {
  //         alert("You must enter a username to start the quiz.");
  //         return;
  //       }
  //       username = username.trim().substring(0, 20);

  //       const csrfToken = document.querySelector(
  //         "[name=csrfmiddlewaretoken]"
  //       )?.value;

  //       fetch("/quiz/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-CSRFToken": csrfToken,
  //           "X-Requested-With": "XMLHttpRequest",
  //         },
  //         body: JSON.stringify({ username }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.session_id) {
  //             // Redirect to the quiz with the new session_id
  //             window.location.href = `/quiz/${data.session_id}/`;
  //           } else {
  //             alert(data.error || "Could not start quiz. Please try again.");
  //           }
  //         })
  //         .catch((error) => {
  //           alert("Error starting quiz: " + error);
  //         });
  //     });
  //   }

  //   // Find Quiz answer options button
  //   // Find start button
  //   var Button = document.querySelector('button[data-type="phish"]') ||
  //                    document.querySelector('button[data-type="treat"]');

  // };

  var initButtons = function () {
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", function (event) {
        const dataType = button.getAttribute("data-type");
        const questionId = button.getAttribute("data-question-id");
        const sessionId = button.getAttribute("data-session-id");

        console.log(`${dataType} button found - adding click handler`);

        if (dataType === "phish" || dataType === "treat") {
          if (timerInterval) {
            clearInterval(timerInterval);
          }

          const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
          )?.value;

          stopCurrentNarration();

          fetch(`/quiz/${sessionId}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
              answer: {
                question: questionId,
                choice: dataType,
                time_left: timeLeft ? timeLeft.value : null,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              const modal = document.getElementById("quizResultModal");
              const modalResult = document.getElementById("modalResult");
              const modalExplanation =
                document.getElementById("modalExplanation");
              const closeModalBtn = document.getElementById("closeQuizModal");

              if (modal && modalResult && modalExplanation) {
                // Set content
                modalResult.innerHTML = data.correct
                  ? `<span style="color:#FF6B35; font-size:2rem;">🎃 Correct! 🎉</span>`
                  : `<span style="color:#8B0000; font-size:2rem;">💀 Incorrect! 👻</span>`;
                modalResult.className = "quiz-result-main";
                modalExplanation.textContent = data.explanation
                  ? `Explanation: ${data.explanation}`
                  : "";
                modalExplanation.className = "quiz-result-explanation";
                // Show modal
                modal.classList.remove("hidden");
              }

              // Close modal on click
              if (closeModalBtn && modal) {
                closeModalBtn.onclick = () => modal.classList.add("hidden");
              }
              // Optional: close on outside click
              modal?.addEventListener("click", function (e) {
                if (e.target === modal) modal.classList.add("hidden");
              });

              playQuestionNarration(questionId);

              const scoreDisplay = document.getElementById("user-score");
              if (scoreDisplay && typeof data.score !== "undefined") {
                scoreDisplay.textContent = data.score;
              }

              document
                .getElementById("quiz-progression-control")
                ?.classList.remove("hidden");
              document.getElementById("quiz-choices")?.classList.add("hidden");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else if (dataType === "url-scan") {
          const urlInput = document.getElementById("urlInput");
          const url = urlInput ? urlInput.value : "";
          if (!url) {
            showScanStatus("Please enter a URL to scan.");
            return;
          }

          const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
          )?.value;

          // Step 1: Start scan, get uuid
          fetch("/scanner/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ url }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success && data.uuid) {
                scanUuid = data.uuid;
                pollForScanResult();
                showScanStatus("Scan started. Waiting for results...");
              } else {
                showScanStatus(
                  "Scan error: " + (data.error || "Unknown error")
                );
              }
            })
            .catch((error) => {
              showScanStatus("Scan error: " + error);
            });
        } else if (dataType === "start-quiz") {
          // Prompt for username (you can use a modal or prompt for simplicity)
          let username = prompt(
            "Enter your nickname for the leaderboard (max 20 chars):",
            ""
          );
          if (!username) {
            alert("You must enter a username to start the quiz.");
            return;
          }
          username = username.trim().substring(0, 20);

          const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
          )?.value;

          fetch("/quiz/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ username }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.session_id) {
                // Redirect to the quiz with the new session_id
                window.location.href = `/quiz/${data.session_id}/`;
              } else {
                alert(data.error || "Could not start quiz. Please try again.");
              }
            })
            .catch((error) => {
              alert("Error starting quiz: " + error);
            });
        }
      });
    });
  };

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  setTimeout(function () {
    console.log("Starting initialization...");
    initCoreUI();
    initAnimations();
    initDoorAnimations();
    initScrollAnimations();
    initParticleCanvas();
    initFloatingElements();
    initButtons();
    console.log("Initialization complete!");
  }, 100);
});

// EMERGENCY FIX - Simple working version
document.addEventListener("DOMContentLoaded", function () {
  console.log("Site loaded");

  // Mobile menu only
  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Navbar scroll
  var nav = document.getElementById("mainNav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      if (nav) nav.classList.add("scrolled");
    } else {
      if (nav) nav.classList.remove("scrolled");
    }
  });

  // TEAM PAGE SCROLL REVEAL
  var teamMembers = document.querySelectorAll(".team-member-item");
  if (teamMembers.length > 0) {
    console.log("Found team members, setting up scroll reveal");

    function revealOnScroll() {
      teamMembers.forEach(function (member) {
        var rect = member.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.6) {
          member.classList.add("revealed");
          console.log("Member revealed");
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Check on load
  }

  // TEAM PAGE SCROLL DOWN BUTTON
  var scrollDownBtn = document.getElementById("scroll-down");
  var teamContainer = document.getElementById("team-container");
  if (scrollDownBtn && teamContainer) {
    scrollDownBtn.addEventListener("click", function () {
      teamContainer.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Simple particle canvas
  var canvas = document.getElementById("particleCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = "#fa6701";
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };

    Particle.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    for (var i = 0; i < 30; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  console.log("Setup complete");
});
