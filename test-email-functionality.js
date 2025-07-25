/**
 * Test Email Functionality
 * This script tests the email functionality by sending a test email to Gmail
 */

// Function to send a test email
async function sendTestEmail() {
    try {
        const recipient = 'p.v.v.s.saidinesh22@ifheindia.org'; // Default recipient
        
        console.log(`Sending test email to ${recipient}...`);
        
        // Create the request data
        const requestData = {
            recipient: {
                email: recipient,
                name: 'Test Recipient'
            },
            alert: {
                id: 'TEST-' + Date.now().toString().slice(-6),
                disasterType: 'Test Alert',
                regions: 'Test Region',
                severity: 'Low',
                message: 'This is a test alert message to verify email functionality.',
                evacuationOrders: 'No evacuation orders - this is just a test.',
                emergencyContacts: 'Emergency Services: 911 (US) / 112 (EU) / 112 (India)',
                issuedBy: 'Email Test Script',
                timestamp: new Date().toISOString()
            }
        };
        
        // Send the request to the simple Gmail sender
        const response = await fetch('http://localhost:3009/send-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        const responseData = await response.json();
        
        console.log('Response:', responseData);
        
        if (responseData.success) {
            console.log('✅ Test email sent successfully!');
            console.log('Message ID:', responseData.details.messageId);
            console.log('Recipient:', responseData.details.recipient);
        } else {
            console.error('❌ Failed to send test email:', responseData.message);
        }
    } catch (error) {
        console.error('❌ Error sending test email:', error);
    }
}

// Call the function
sendTestEmail();
