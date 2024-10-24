let currentTab = localStorage.getItem('currentTab') || 'frontend'; // Get tab state from localStorage

// Menu toggle animation
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('change', function () {
    if (this.checked) {
        navList.classList.remove('close'); // Remove fadeout class
        navList.classList.add('open'); // Add fadeout class
        navList.style.display = 'flex'; // Make it visible
    } else {
        navList.classList.remove('open'); 
        navList.classList.add('close'); 
        setTimeout(() => {
            navList.style.display = 'none'; // Hide after animation
        }, 1000); // Adjust to fit animation time
    }
});

// Close navigation when selecting language.
function closeNavList() {
    menuToggle.checked = false; // turn off toggle
    navList.classList.remove('open'); 
    navList.classList.add('close'); 
    setTimeout(() => {
        navList.style.display = 'none'; 
    }, 1000); 
}


function switchLanguage(lang) {
    // Hide content in all languages
    document.querySelectorAll('.content').forEach(function(element) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none'; // Disable selection

        element.addEventListener('transitionend', function() {
            if (element.style.opacity === '0') {
                element.style.display = 'none'; // delay and hide
            }
        });
    });

    // Display content in selected language
    const selectedElements = document.querySelectorAll('.' + lang);
    selectedElements.forEach(function(element) {
        element.style.display = 'block'; // Display first
        setTimeout(function() {
            element.style.opacity = '1'; // fade in
            element.style.pointerEvents = 'auto'; // Enable selection
        }, 0);
    });

    // Initialize tab
    switchTab(currentTab); // Show default tab
}

function switchTab(tab) {
    currentTab = tab; // Refresh current tab
    localStorage.setItem('currentTab', currentTab); // Save tab state

    // Hide all project categories
    document.querySelectorAll('.project-category-page').forEach(function(element) {
        element.style.display = 'none';
        element.classList.remove('fade-in'); 
    });

    // Show project categories for selected tab
    const selectedCategory = document.querySelectorAll(`.${tab}`);
    selectedCategory.forEach(function(element) {
        element.style.display = 'block'; 
        observer.observe(element); // Start monitoring again
    });
}

// Show current tab when page loads
window.addEventListener('DOMContentLoaded', () => {
    switchTab(currentTab); // show tab first
});

// Fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-category')) {
                entry.target.classList.add('fade-in'); 
            } else if (entry.target.classList.contains('custom-about') || entry.target.classList.contains('custom-contact')) {
                entry.target.classList.add('fade-in-scale'); 
            }
            observer.unobserve(entry.target); // Stop monitoring if it is activated only once
        }
    });
}, { threshold: 0.8 });

window.addEventListener('DOMContentLoaded', () => {
    // Configure your initial monitoring settings here
    document.querySelectorAll('.project-category, .custom-about, .custom-contact').forEach((element) => {
        observer.observe(element); // check it all
    });
});

// about me //
function toggleContent(element) {
    const content = element.nextElementSibling;
    content.classList.toggle('show');
    element.textContent = content.classList.contains('show') ? 'Show Less' : 'Learn More';
}



// Model
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close');

const openModalLinks = document.querySelectorAll('.open-modal');

// Add click event to each link
openModalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const videoSrc = link.getAttribute('data-video-src'); // Get the video path from the data attribute
    modalVideo.querySelector('source').src = videoSrc; // Set video source
    modalVideo.load(); // Reload video
    modal.style.display = 'flex'; // Show modal
  });
});

// close model
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.querySelector('source').src = ''; // Clear the video source when you close the modal
});

// Also closes when clicking outside the modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.querySelector('source').src = ''; 
  }
});


