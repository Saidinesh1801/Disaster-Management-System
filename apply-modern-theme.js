/**
 * Script to apply the modern theme to all pages in the project
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

// CSS and JS links to add
const modernThemeLinks = `
    <link rel="stylesheet" href="css/modern-theme.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
`;

const modernUIScript = `
    <!-- Modern UI JavaScript -->
    <script src="js/modern-ui.js"></script>
`;

// Updated navigation HTML with modern theme elements
const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="logo">Disaster Management System</a>
            <button type="button" class="nav-toggle-btn" aria-label="Toggle navigation menu" title="Toggle Menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="home.html">Home</a></li>
                <li><a href="alert.html">Alerts</a></li>
                <li><a href="registered-alerts.html">Registered Alerts</a></li>
                <li><a href="occurred-disasters.html">Occurred Disasters</a></li>
                <li><a href="insight.html">Insights</a></li>
                <li><a href="precaution.html">Precautions</a></li>
                <li><a href="email-logs.html">Email Logs</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
                <li><span id="userWelcome" class="user-welcome"></span></li>
            </ul>
        </div>
    </nav>
`;

// Process each file
filesToUpdate.forEach(file => {
    try {
        // Check if file exists
        if (!fs.existsSync(file)) {
            console.log(`File ${file} does not exist, skipping.`);
            return;
        }
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Add modern theme CSS links if not already present
        if (!content.includes('modern-theme.css')) {
            content = content.replace(/<link rel="stylesheet" href="style.css">/, 
                '<link rel="stylesheet" href="style.css">' + modernThemeLinks);
        }
        
        // Replace navigation
        const navRegex = /<nav[\s\S]*?<\/nav>/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, navHTML);
        }
        
        // Add modern UI script if not already present
        if (!content.includes('modern-ui.js')) {
            content = content.replace(/<\/body>/, modernUIScript + '\n</body>');
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Applied modern theme to ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Modern theme applied to all pages successfully!');
