/**
 * Script to revert the project to checkpoint 18 (horizontal dropdown menu)
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

// CSS styles for the horizontal dropdown menu
const cssStyles = `
    <style>
        /* Navigation styles for dropdown menu */
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
        
        .nav-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            height: 100%;
        }
        
        .nav-item {
            position: relative;
            height: 100%;
        }
        
        .nav-link {
            color: white;
            text-decoration: none;
            padding: 0 15px;
            height: 60px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        
        .nav-link:hover {
            background-color: #34495e;
        }
        
        /* Horizontal menu at the top */
        .dropdown {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #34495e;
            display: none;
            z-index: 999;
            border: none;
            outline: none;
            padding: 10px 0;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            text-align: center;
        }
        
        .nav-item.active .dropdown {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px 20px;
        }
        
        /* Dropdown item styles */
        .dropdown a {
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            display: inline-block;
            border: none;
            outline: none;
            background-color: transparent;
            border-radius: 4px;
            margin: 0 5px;
        }
        
        .dropdown a:hover {
            background-color: #2c3e50;
            color: #3498db;
        }
        
        .user-section {
            color: white;
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
        
        @media (max-width: 768px) {
            .nav-toggle-btn {
                display: block;
            }
            
            .nav-menu {
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                background-color: #2c3e50;
                flex-direction: column;
                display: none;
            }
            
            .navbar.mobile-open .nav-menu {
                display: flex;
                flex-direction: column;
            }
            
            .nav-item {
                width: 100%;
            }
            
            .nav-link {
                width: 100%;
                padding: 15px;
            }
            
            .dropdown {
                position: static;
                box-shadow: none;
                width: 100%;
                background-color: #34495e;
                display: none;
                flex-direction: column;
                padding: 0;
            }
            
            .nav-item.active .dropdown {
                display: flex;
            }
            
            .dropdown a {
                padding: 10px 30px;
                margin: 0;
                display: block;
                text-align: left;
                border-radius: 0;
            }
        }
        
        /* Main content adjustment */
        .container {
            margin-top: 100px;
        }
    </style>
    <!-- Fix for purple lines/outlines -->
    <link rel="stylesheet" href="css/fix-purple-lines.css">
`;

// Navigation HTML for the horizontal dropdown menu
const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="logo">Disaster Management System</a>
            <button type="button" class="nav-toggle-btn" aria-label="Toggle navigation menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a class="nav-link">Main</a>
                    <div class="dropdown">
                        <a href="home.html"><i class="fas fa-home"></i> Home</a>
                        <a href="about.html"><i class="fas fa-info-circle"></i> About</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Alerts & Disasters</a>
                    <div class="dropdown">
                        <a href="alert.html"><i class="fas fa-bell"></i> Create Alerts</a>
                        <a href="registered-alerts.html"><i class="fas fa-list-alt"></i> Registered Alerts</a>
                        <a href="occurred-disasters.html"><i class="fas fa-exclamation-triangle"></i> Occurred Disasters</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Information</a>
                    <div class="dropdown">
                        <a href="insight.html"><i class="fas fa-chart-line"></i> Insights</a>
                        <a href="precaution.html"><i class="fas fa-shield-alt"></i> Precautions</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link">User Settings</a>
                    <div class="dropdown">
                        <a href="email-logs.html"><i class="fas fa-envelope"></i> Email Logs</a>
                        <a href="user-preferences.html"><i class="fas fa-cog"></i> Preferences</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="#" id="logoutBtn" class="nav-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </li>
            </ul>
            <div class="user-section">
                <span id="userWelcome" class="user-welcome"></span>
            </div>
        </div>
    </nav>
`;

// JavaScript for the dropdown menu functionality
const jsCode = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Dropdown menu functionality
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                // Only add click handler to links that have dropdown menus
                const parent = link.parentElement;
                const dropdown = parent.querySelector('.dropdown');
                
                if (dropdown) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Check if already active
                        const isActive = parent.classList.contains('active');
                        
                        // Close all dropdowns first
                        document.querySelectorAll('.nav-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // If it wasn't active before, make it active now
                        if (!isActive) {
                            parent.classList.add('active');
                        }
                    });
                }
            });
            
            // Close dropdowns when clicking outside or on dropdown items
            document.addEventListener('click', function(e) {
                // Close when clicking outside nav-item
                if (!e.target.closest('.nav-item')) {
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
                
                // Close when clicking on a dropdown item (a link inside dropdown)
                if (e.target.closest('.dropdown a')) {
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
            
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

// Create the fix-purple-lines.css file if it doesn't exist
const purpleLinesFix = `/* Global fix for purple lines/outlines */
* {
    outline: none !important;
}

a, button, input, select, textarea {
    outline: none !important;
}

.dropdown, .dropdown * {
    outline: none !important;
    border-color: transparent !important;
}

.dropdown a, .dropdown a:focus, .dropdown a:active, .dropdown a:hover {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* Fix for login/signup links showing up */
.nav-links li a[href="login.html"],
.nav-links li a[href="signup.html"] {
    display: inline-block !important;
    position: static !important;
    background: none !important;
    box-shadow: none !important;
    color: white !important;
}

/* Hide any unwanted dropdown items */
.dropdown a[href="login.html"],
.dropdown a[href="signup.html"] {
    display: none !important;
}

/* Fix for Firefox */
::-moz-focus-inner {
    border: 0 !important;
}

/* Fix for Chrome */
:focus {
    outline: none !important;
}

/* Fix for Safari */
*:focus {
    outline: none !important;
}

/* Fix for IE/Edge */
*:-ms-input-placeholder {
    border-color: transparent !important;
}

/* Fix for dropdown menus */
.nav-item .dropdown {
    border: none !important;
    outline: none !important;
}

.nav-item .dropdown a {
    border: none !important;
    outline: none !important;
    text-decoration: none !important;
}

/* Fix for Select2 dropdown */
.select2-container--focus .select2-selection,
.select2-container--open .select2-selection {
    border-color: #2c3e50 !important;
    box-shadow: none !important;
    outline: none !important;
}

/* Fix for any other potential purple outlines */
*:focus, *:active, *:hover {
    outline-color: transparent !important;
    border-color: inherit !important;
    box-shadow: none !important;
}`;

// Ensure the css directory exists
if (!fs.existsSync('css')) {
    fs.mkdirSync('css');
}

// Create the fix-purple-lines.css file
fs.writeFileSync('css/fix-purple-lines.css', purpleLinesFix);
console.log('Created css/fix-purple-lines.css');

// Process each file
filesToUpdate.forEach(file => {
    try {
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove any existing navigation styles
        content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
        
        // Remove any references to fix-purple-lines.css
        content = content.replace(/<link rel="stylesheet" href="css\/fix-purple-lines.css">/g, '');
        
        // Add new CSS styles before closing head tag
        content = content.replace(/<\/head>/, `${cssStyles}\n</head>`);
        
        // Replace navigation
        const navRegex = /<nav[\s\S]*?<\/nav>/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, navHTML);
        }
        
        // Remove existing scripts and add new script before closing body tag
        content = content.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/g, '');
        content = content.replace(/<\/body>/, `${jsCode}\n</body>`);
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Project successfully reverted to checkpoint 18!');
