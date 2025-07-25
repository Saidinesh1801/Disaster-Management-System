/**
 * Script to remove dropdown menus and revert to a simpler navigation
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

// Simple navigation HTML to replace the dropdown menu
const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="logo">Disaster Management System</a>
            <button type="button" class="nav-toggle-btn" aria-label="Toggle navigation menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="home.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="alert.html"><i class="fas fa-bell"></i> Create Alerts</a></li>
                <li><a href="registered-alerts.html"><i class="fas fa-list-alt"></i> Registered Alerts</a></li>
                <li><a href="occurred-disasters.html"><i class="fas fa-exclamation-triangle"></i> Occurred Disasters</a></li>
                <li><a href="insight.html"><i class="fas fa-chart-line"></i> Insights</a></li>
                <li><a href="precaution.html"><i class="fas fa-shield-alt"></i> Precautions</a></li>
                <li><a href="email-logs.html"><i class="fas fa-envelope"></i> Email Logs</a></li>
                <li><a href="user-preferences.html"><i class="fas fa-cog"></i> Preferences</a></li>
                <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
                <li><a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                <li><span id="userWelcome" class="user-welcome"></span></li>
            </ul>
        </div>
    </nav>
`;

// Simple CSS styles for the navigation
const cssStyles = `
    <style>
        /* Navigation styles */
        .navbar {
            background-color: #2c3e50;
            color: white;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            height: 60px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .logo {
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            height: 100%;
        }
        
        .nav-links li {
            height: 100%;
            display: flex;
            align-items: center;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            padding: 0 10px;
            height: 100%;
            display: flex;
            align-items: center;
        }
        
        .nav-links a:hover {
            background-color: #34495e;
        }
        
        .user-welcome {
            color: white;
            margin-left: 10px;
        }
        
        /* Mobile navigation */
        .nav-toggle-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        @media (max-width: 1024px) {
            .nav-toggle-btn {
                display: block;
            }
            
            .nav-links {
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                background-color: #2c3e50;
                flex-direction: column;
                display: none;
                padding: 0;
            }
            
            .navbar.mobile-open .nav-links {
                display: flex;
            }
            
            .nav-links li {
                width: 100%;
                height: auto;
            }
            
            .nav-links a {
                width: 100%;
                padding: 15px;
                border-bottom: 1px solid #34495e;
            }
            
            .user-welcome {
                padding: 15px;
            }
        }
        
        /* Main content adjustment */
        .container {
            margin-top: 80px;
        }
    </style>
    <!-- Fix for purple lines/outlines -->
    <link rel="stylesheet" href="css/fix-purple-lines.css">
`;

// Simple JavaScript for mobile menu toggle
const jsCode = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const toggleBtn = document.querySelector('.nav-toggle-btn');
            const navbar = document.querySelector('.navbar');
            
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function() {
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
                const userSession = JSON.parse(localStorage.getItem('currentUserSession'));
                if (userSession && userSession.fullname) {
                    userWelcome.textContent = \`Welcome, \${userSession.fullname}\`;
                }
            }
            
            // Handle logout
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get user session
                    const userSession = JSON.parse(localStorage.getItem('currentUserSession'));
                    
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
        
        // Remove dropdown-specific CSS and add new CSS
        content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
        content = content.replace(/<\/head>/, `${cssStyles}\n</head>`);
        
        // Replace navigation
        const navRegex = /<nav[\s\S]*?<\/nav>/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, navHTML);
        }
        
        // Remove dropdown script and add simple mobile toggle script
        content = content.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/g, '');
        content = content.replace(/<\/body>/, `${jsCode}\n</body>`);
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('All dropdowns removed successfully!');
