/**
 * Script to fix the pages that are not working
 */

const fs = require('fs');
const path = require('path');

// List of HTML files to update
const filesToUpdate = [
    'about.html',
    'alert.html',
    'disaster-table.html',
    'email-logs.html',
    'home.html',
    'insight.html',
    'occurred-disasters.html',
    'precaution.html',
    'registered-alerts.html',
    'user-preferences.html'
];

// Fixed JavaScript for the dropdown menu functionality
const jsCode = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM fully loaded');
            
            // Dropdown menu functionality
            const navLinks = document.querySelectorAll('.nav-link');
            console.log('Found nav links:', navLinks.length);
            
            navLinks.forEach(link => {
                // Only add click handler to links that have dropdown menus
                const parent = link.parentElement;
                const dropdown = parent.querySelector('.dropdown');
                
                if (dropdown) {
                    console.log('Adding click handler to dropdown link');
                    link.addEventListener('click', function(e) {
                        console.log('Nav link clicked');
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Check if already active
                        const isActive = parent.classList.contains('active');
                        console.log('Is already active:', isActive);
                        
                        // Close all dropdowns first
                        document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // If it wasn't active before, make it active now
                        if (!isActive) {
                            parent.classList.add('active');
                            console.log('Added active class');
                        }
                    });
                }
            });
            
            // Close dropdowns when clicking outside or on dropdown items
            document.addEventListener('click', function(e) {
                // Close when clicking outside nav-item
                if (!e.target.closest('.nav-item')) {
                    console.log('Clicked outside nav-item, closing dropdowns');
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
                
                // Close when clicking on a dropdown item (a link inside dropdown)
                if (e.target.closest('.dropdown a')) {
                    console.log('Clicked on dropdown item, closing dropdowns');
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
            
            // Mobile menu toggle
            const toggleBtn = document.querySelector('.nav-toggle-btn');
            const navbar = document.querySelector('.navbar');
            
            if (toggleBtn) {
                console.log('Found mobile toggle button');
                toggleBtn.addEventListener('click', function() {
                    console.log('Toggle button clicked');
                    navbar.classList.toggle('mobile-open');
                    
                    // Change icon based on state
                    if (navbar.classList.contains('mobile-open')) {
                        this.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        this.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
            
            // Display welcome message with user's name
            const userWelcome = document.getElementById('userWelcome');
            if (userWelcome) {
                console.log('Found user welcome element');
                const userSession = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
                if (userSession && userSession.fullname) {
                    userWelcome.textContent = \`Welcome, \${userSession.fullname}\`;
                }
            }
            
            // Handle logout
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                console.log('Found logout button');
                logoutBtn.addEventListener('click', function(e) {
                    console.log('Logout button clicked');
                    e.preventDefault();
                    
                    // Get user session
                    const userSession = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
                    
                    // Update session status
                    if (userSession) {
                        // Mark session as inactive
                        userSession.active = false;
                        localStorage.setItem('currentUserSession', JSON.stringify(userSession));
                        
                        // Update active users list
                        let activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '[]');
                        activeUsers = activeUsers.filter(user => user.userId !== userSession.userId);
                        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
                    }
                    
                    // Redirect to login page
                    window.location.href = 'index.html';
                });
            }
        });
    </script>
`;

// Process each file
filesToUpdate.forEach(file => {
    try {
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove existing scripts
        content = content.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/g, '');
        
        // Add new script before closing body tag
        content = content.replace(/<\/body>/, `${jsCode}\n</body>`);
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed ${file}`);
    } catch (error) {
        console.error(`Error fixing ${file}:`, error);
    }
});

console.log('All pages fixed successfully!');
