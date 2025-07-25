# EmailJS Integration for Disaster Management System

This guide explains how to set up and use EmailJS to send email alerts directly from the browser in the Disaster Management System.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript code without requiring a server. This can be useful as a backup email sending method or for simple deployments without a backend server.

## Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for an account
2. The free tier allows 200 emails per month, which should be sufficient for testing

### Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down the **Service ID** for later use

### Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your template with the following variables:
   - `{{to_email}}` - Recipient's email address
   - `{{to_name}}` - Recipient's name
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message (HTML content)
   - `{{disaster_type}}` - Type of disaster (for alerts)
   - `{{severity}}` - Alert severity level
   - `{{regions}}` - Affected regions
   - `{{alert_id}}` - Unique alert identifier
   - `{{datetime}}` - Date and time of the alert
   - `{{emergency_contacts}}` - Emergency contact information (HTML formatted)
   - `{{evacuation_orders}}` - Evacuation orders or instructions
4. Save the template and note down the **Template ID**

### Step 4: Get Your User ID

1. In your EmailJS dashboard, go to "Account"
2. Find your **User ID** (it should be visible at the top of the page)

### Step 5: Configure the Disaster Management System

1. Open the `emailjs-test.html` page in your browser
2. Enter your EmailJS credentials:
   - User ID
   - Service ID
   - Template ID
3. Click "Save Configuration"
4. Send a test email to verify your setup works correctly

## Integration with Disaster Management System

The Disaster Management System now has two methods for sending emails:

1. **Server-side emails** using Nodemailer (primary method)
2. **Client-side emails** using EmailJS (backup method)

### How to Use EmailJS in Your Code

```javascript
// Initialize EmailJS (call this when the page loads)
EmailJSService.init();

// Send an email
EmailJSService.sendEmail({
    to: 'recipient@example.com',
    toName: 'Recipient Name',
    subject: 'Email Subject',
    body: 'Email content in HTML format',
    onSuccess: (response) => {
        console.log('Email sent successfully:', response);
    },
    onError: (error) => {
        console.error('Failed to send email:', error);
    }
});

// Send an alert email
EmailJSService.sendAlertEmail(user, alert, (error, result) => {
    if (error) {
        console.error('Failed to send alert email:', error);
    } else {
        console.log('Alert email status:', result.status);
    }
});
```

## Fallback Mechanism

The system is designed to use the server-side email service by default. If the server is unavailable or returns an error, the system can automatically fall back to using EmailJS.

To implement this fallback mechanism, modify the `email-service.js` file to call `EmailJSService` when the server-side email fails.

## Troubleshooting

### Emails Not Sending

1. Check your EmailJS dashboard for any error messages
2. Verify that your User ID, Service ID, and Template ID are correct
3. Make sure your email template contains all the required variables
4. Check the browser console for any JavaScript errors

### Rate Limiting

The free tier of EmailJS has a limit of 200 emails per month. If you exceed this limit, you'll need to upgrade to a paid plan or wait until the next month.

## Security Considerations

When using EmailJS, your EmailJS credentials are stored in the client-side code and localStorage. This means:

1. Anyone with access to your website's code can see your EmailJS credentials
2. These credentials could potentially be used to send emails through your account

For this reason, it's recommended to:

1. Use EmailJS as a backup method only
2. Consider implementing additional security measures if using in production
3. Monitor your EmailJS usage for any unauthorized activity
