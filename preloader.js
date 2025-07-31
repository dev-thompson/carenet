
        // Simulate loading process
        document.addEventListener('DOMContentLoaded', function() {
            const preloader = document.getElementById('preloader');
            const progressBar = document.getElementById('progress-bar');
            const dashboard = document.getElementById('dashboard');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + '%';
                
                // Update loading text based on progress
                const loadingText = document.querySelector('.loading-text');
                if (progress < 30) {
                    loadingText.textContent = "Initializing offline capabilities...";
                } else if (progress < 60) {
                    loadingText.textContent = "Loading health modules...";
                } else if (progress < 90) {
                    loadingText.textContent = "Securing with blockchain...";
                } else {
                    loadingText.textContent = "Preparing your dashboard...";
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                            dashboard.style.display = 'block';
                            // Here you would typically load the actual dashboard content
                        }, 500);
                    }, 500);
                }
            }, 300);
            
            // This would be replaced with actual login authentication in production
            // For demo, we're just simulating a successful login
        });