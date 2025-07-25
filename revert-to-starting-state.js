/**
 * Script to revert the project to its starting state from today
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

// Original navigation HTML from the starting state
const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.html" class="logo">Disaster Management System</a>
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
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove any custom navigation styles
        content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
        
        // Remove any references to fix-purple-lines.css
        content = content.replace(/<link rel="stylesheet" href="css\/fix-purple-lines.css">/g, '');
        
        // Replace navigation
        const navRegex = /<nav[\s\S]*?<\/nav>/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, navHTML);
        }
        
        // Remove custom scripts
        content = content.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/g, '');
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Reverted ${file} to starting state`);
    } catch (error) {
        console.error(`Error reverting ${file}:`, error);
    }
});

// Remove the fix-purple-lines.css file if it exists
try {
    if (fs.existsSync('css/fix-purple-lines.css')) {
        fs.unlinkSync('css/fix-purple-lines.css');
        console.log('Removed css/fix-purple-lines.css');
    }
} catch (error) {
    console.error('Error removing css/fix-purple-lines.css:', error);
}

console.log('Project successfully reverted to starting state!');
