# EmailJS Integration for Disaster Management System

This document explains the changes made to implement EmailJS as a fallback email service in the Disaster Management System.

## Files Modified

1. `email.js` - Converted from HTML template to a proper JavaScript module that provides EmailJS functionality
2. `alert.html` - Updated to include EmailJS and implement fallback mechanism
3. `email-logs.html` - Updated to display email provider information and filter by provider

## New Files Created

1. `emailjs-test.html` - A test page to configure and test EmailJS integration
2. `EMAILJS_SETUP.md` - Detailed setup instructions for EmailJS

## How It Works

### Primary Email Flow

1. When an alert is created, the system attempts to send emails using the primary server-based email service
2. If the primary service succeeds, the email is logged with the provider set to "Server"
3. If the primary service fails, the system automatically falls back to EmailJS

### Fallback Mechanism

1. If the primary email service fails, the system detects the failure
2. It then initializes EmailJS if not already loaded
3. The system attempts to send the email using EmailJS
4. The email is logged with the provider set to "EmailJS" if successful

### Email Logs

The email logs page now shows:
- Which provider was used for each email (Server or EmailJS)
- Statistics for each provider
- Ability to filter emails by provider

## Setup Instructions

See the `EMAILJS_SETUP.md` file for detailed instructions on how to set up EmailJS for your Disaster Management System.

## Testing

Use the `emailjs-test.html` page to:
1. Configure your EmailJS credentials
2. Send test emails
3. Verify that the integration is working correctly

## Benefits of This Implementation

1. **Reliability** - If the server is down or experiencing issues, emails can still be sent
2. **Flexibility** - You can choose which service to use as primary
3. **Transparency** - The system clearly shows which service was used for each email
4. **Easy Configuration** - Simple UI for setting up EmailJS credentials
