// =======================
// WORD COUNTER FUNCTIONALITY
// =======================

const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");

function countText() {
    const text = textInput.value;

    const words = text.trim()
        ? text.trim().split(/\s+/u).length
        : 0;

    wordCount.textContent = words;
    characterCount.textContent = [...text].length;
}

textInput.addEventListener("input", countText);

document.getElementById("clearBtn")
    .addEventListener("click", () => {
        textInput.value = "";
        countText();
    });



// the navigation part



const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');

// Function to show a specific section
function showSection(sectionId) {
    // Hide all sections
    pageSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle navigation link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
    });
});

// Handle direct URL hash navigation (e.g., page load with #about)
function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash && (hash === 'home' || hash === 'about')) {
        showSection(hash);
    } else {
        showSection('home'); // Default to home
    }
}

// Listen for hash changes (back/forward browser buttons)
window.addEventListener('hashchange', handleHashChange);

// Handle initial page load
window.addEventListener('load', handleHashChange);

// Handle CTA button click
document.addEventListener('click', (e) => {
    if (e.target.closest('.cta-btn')) {
        e.preventDefault();
        showSection('home');
        history.pushState(null, null, '#home');
    }
});
