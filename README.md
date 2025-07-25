# Disaster Management System

A comprehensive web application for tracking and managing disaster events, sending alerts, and providing safety information.

## Features

- User authentication (signup, login, session management)
- Interactive world map showing disaster events
- Alert system for notifying users about disasters
- Email notifications for registered users
- Insights and analytics about disaster events
- Precautionary information for different types of disasters
- Responsive design for all devices

## Project Structure

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email Service**: Nodemailer

## Setup Instructions

### Frontend Setup

1. Clone the repository
2. Open the project in your preferred code editor
3. Use a local server to run the application (e.g., Live Server extension in VS Code)

### Backend Email Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your email credentials

4. Start the server:
   ```
   npm start
   ```

## Email Configuration

The system uses a Node.js backend server to send real emails. To configure it:

1. Set up a Gmail account (or other email service)
2. For Gmail, create an "App Password" (2FA must be enabled)
3. Update the `.env` file with your credentials

## Usage

1. Start the backend server (for email functionality)
2. Open the frontend application in a web browser
3. Register a new account
4. Log in to access the system
5. Explore the different features:
   - View disaster events on the world map
   - Create and send alerts
   - View insights and analytics
   - Access precautionary information

## Pages

- **Login/Signup**: User authentication
- **Home**: World map with disaster events
- **Alerts**: Create and send alerts to users
- **Registered Alerts**: View all registered alerts
- **Email Logs**: Track email notifications
- **Insights**: Analytics about disaster events
- **Precautions**: Safety information for different disasters
- **About**: Information about the system

## Technologies Used

- HTML5, CSS3, JavaScript
- jQuery for DOM manipulation
- Leaflet.js for interactive maps
- Chart.js for data visualization
- Node.js and Express for the backend
- Nodemailer for sending emails
- LocalStorage for client-side data persistence

## License

This project is open source and available under the MIT License.
