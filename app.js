// Back to Top Button
window.addEventListener('scroll', function() {
    var backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarNav = document.querySelector('#navbarNav');
            if (navbarNav.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For demo purposes, we'll just show an alert
    alert('Thank you for your partnership request! We will contact you soon.');
    this.reset();
});

// Offline detection
window.addEventListener('online', function() {
    // Show online status
    console.log('Connection restored - syncing any offline data');
});
window.addEventListener('offline', function() {
    // Show offline status
    console.log('Connection lost - switching to offline mode');
});

// PWA installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show install button (you would add this in your UI)
    console.log('PWA install available');
});

// You would call this when user clicks your install button
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Add this to your existing script section
document.addEventListener('DOMContentLoaded', function() {
    // Medication Tracker - Mark as Taken
    document.querySelectorAll('.medication-item .btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const medicationItem = this.closest('.medication-item');
            const statusBadge = medicationItem.querySelector('.badge');
            
            statusBadge.classList.remove('bg-secondary');
            statusBadge.classList.add('bg-success');
            statusBadge.textContent = 'Taken';
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            const timeElement = document.createElement('small');
            timeElement.className = 'text-muted';
            timeElement.textContent = timeString;
            
            medicationItem.querySelector('.medication-status').innerHTML = '';
            medicationItem.querySelector('.medication-status').appendChild(statusBadge);
            medicationItem.querySelector('.medication-status').appendChild(timeElement);
        });
    });
    
    // Simulate teleconsultation countdown
    const consultationTime = new Date();
    consultationTime.setDate(consultationTime.getDate() + 1);
    consultationTime.setHours(10, 0, 0);
    
    function updateConsultationCountdown() {
        const now = new Date();
        const diff = consultationTime - now;
        
        if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('consultationCountdown').textContent = 
                `${hours}h ${minutes}m remaining`;
        } else {
            document.getElementById('consultationCountdown').textContent = 
                "Consultation time has arrived";
            clearInterval(countdownInterval);
        }
    }

    // Initialize countdown
    updateConsultationCountdown();
    const countdownInterval = setInterval(updateConsultationCountdown, 60000);
    
    // Family member click handler
    document.querySelectorAll('.family-member-card:not(.add-new-member)').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                // Navigate to family member health page
                console.log('Navigating to family member health dashboard');
                // window.location.href = 'family-member.html?id=' + this.dataset.memberId;
            }
        });
    });
});


// Enhanced Doctor Chatbot Functionality
