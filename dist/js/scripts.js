let currentTab = localStorage.getItem('currentTab') || 'frontend'; 

const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('change', function () {
    if (this.checked) {
        navList.style.display = 'flex'; 
        navList.classList.remove('nav-close'); 
        navList.classList.add('nav-open'); 
    } else {
        navList.classList.remove('nav-open'); 
        navList.classList.add('nav-close'); 
        // Wait for animation to finish then hide
        navList.addEventListener('animationend', function handleAnimationEnd() {
            navList.style.display = 'none'; 
            navList.classList.remove('nav-close'); 
            navList.removeEventListener('animationend', handleAnimationEnd); 
        });
    }
});

function closeNavList() {
    const screenWidth = window.innerWidth; 

    // only less than 768px
    if (screenWidth <= 768) {
        menuToggle.checked = false; 
        navList.classList.remove('nav-open'); 
        navList.classList.add('nav-close'); 
        // Wait for animation to finish then hide
        navList.addEventListener('animationend', function handleAnimationEnd() {
            navList.style.display = 'none'; 
            navList.classList.remove('nav-close'); 
            navList.removeEventListener('animationend', handleAnimationEnd); 
        });
    }
}

function switchLanguage(lang) {
    document.querySelectorAll('.content').forEach(function(element) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none'; 

        element.addEventListener('transitionend', function() {
            if (element.style.opacity === '0') {
                element.style.display = 'none'; 
            }
        });
    });

    const selectedElements = document.querySelectorAll('.' + lang);
    selectedElements.forEach(function(element) {
        element.style.display = 'block'; 
        setTimeout(function() {
            element.style.opacity = '1'; 
            element.style.pointerEvents = 'auto'; 
        }, 0);
    });

    switchTab(currentTab); 
}

function switchTab(tab) {
    currentTab = tab; 
    localStorage.setItem('currentTab', currentTab); 

    document.querySelectorAll('.project-category-page').forEach(function(element) {
        element.style.display = 'none';
        element.classList.remove('fade-in'); 
    });

    const selectedCategory = document.querySelectorAll(`.${tab}`);
    selectedCategory.forEach(function(element) {
        element.style.display = 'block'; 
        observer.observe(element); 
    });
}

window.addEventListener('DOMContentLoaded', () => {
    switchTab(currentTab); 

    document.querySelectorAll('.project-category, .custom-about, .custom-contact').forEach((element) => {
        observer.observe(element); 
    });
});

// Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-category')) {
                entry.target.classList.add('fade-in'); 
            } else if (entry.target.classList.contains('custom-about') || entry.target.classList.contains('custom-contact')) {
                entry.target.classList.add('fade-in-scale'); 
            }
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.8 });

// About me 
function toggleContent(element) {
    const content = element.nextElementSibling;
    content.classList.toggle('show');
    element.textContent = content.classList.contains('show') ? 'Show Less' : 'Learn More';
}

// Modal
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.modal-close');
const openModalLinks = document.querySelectorAll('.open-modal');

openModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = link.getAttribute('data-video-src'); 
        modalVideo.querySelector('source').src = videoSrc; 
        modalVideo.load(); 
        modal.style.display = 'flex'; 
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.querySelector('source').src = ''; // Clear the video source when you close the modal
});

// Also closes when clicking outside the modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.querySelector('source').src = ''; // Clear the video source when you close the modal
    }
});
