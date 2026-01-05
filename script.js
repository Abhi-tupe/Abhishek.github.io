document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert("⚠️ Please fill all fields.");
                return;
            }

            try {
                const response = await fetch("/submit_contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const result = await response.json();

                if (result.status === "success") {
                    alert(" Message stored successfully!");
                    contactForm.reset();
                } else {
                    alert("⚠️ Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server error. Please try later.");
            }
        });
    }

    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    setTimeout(() => {
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) profileImg.classList.add('animate');
        
        document.querySelector('header h1').classList.add('animate');
        document.querySelector('header p').classList.add('animate');
    }, 500);
});
const weekData = {
  week3: {
    worked: [
      "Improved attacker fingerprinting in Web Honeypot",
      "Refactored socket handling in secure voice transmission",
      "Studied Linux process isolation basics"
    ],
    learned: [
      "Why static honeypots get detected",
      "How buffering affects real-time audio"
    ],
    implemented: [
      "Added randomized delays & fake responses",
      "Reduced packet drops in voice transmission"
    ]
  },

  week2: {
    worked: [
      "Deployed Flask honeypot on VPS",
      "Analyzed brute-force login behavior"
    ],
    learned: [
      "Difference between low and high interaction honeypots"
    ],
    implemented: [
      "Logged IPs, headers, timestamps for each attack"
    ]
  },

  week1: {
    worked: [
      "Reviewed Linux permission & process model",
      "Documented secure chat architecture"
    ],
    learned: [
      "Importance of least privilege",
      "Socket lifecycle management"
    ],
    implemented: [
      "Improved error handling in secure chat server"
    ]
  }
};

const selector = document.getElementById("weekSelector");
const content = document.getElementById("weekContent");

function renderWeek(key) {
  const data = weekData[key];

  content.classList.remove("fade");
  void content.offsetWidth; 
  content.classList.add("fade");

  content.innerHTML = `
    <h3>What I Worked On</h3>
    <ul>${data.worked.map(i => `<li>${i}</li>`).join("")}</ul>

    <h3>What I Learned</h3>
    <ul>${data.learned.map(i => `<li>${i}</li>`).join("")}</ul>

    <h3>What I Implemented / Concluded</h3>
    <ul>${data.implemented.map(i => `<li>${i}</li>`).join("")}</ul>
  `;
}

if (selector && content) {
  renderWeek(selector.value);
  selector.addEventListener("change", () => renderWeek(selector.value));
}

