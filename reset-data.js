// Script to reset and initialize the localStorage data
console.log("Resetting localStorage data...");

// Clear existing data
localStorage.clear();
console.log("localStorage cleared");

// Create sample alerts with the structure matching alert.html
const sampleAlerts = [
    {
        id: "ALT-2023-001",
        disasterType: "Earthquake",
        date: "2023-04-15",
        location: "Japan, Philippines",
        severity: "High",
        affectedAreas: "Tokyo, Manila, Coastal Regions",
        status: "Active",
        description: "A strong earthquake has been detected off the coast of Japan. Tsunami warnings have been issued for coastal areas. Please evacuate to higher ground immediately.",
        reportedBy: "Japan Meteorological Agency",
        timestamp: "2023-04-15T08:30:22",
        evacuationOrders: "Mandatory evacuation for coastal areas",
        emergencyContacts: "Emergency Services: 119 (Japan) / 911 (Philippines)"
    },
    {
        id: "ALT-2023-002",
        disasterType: "Flood",
        date: "2023-05-22",
        location: "India, Bangladesh",
        severity: "Critical",
        affectedAreas: "Ganges Delta, Kolkata, Dhaka",
        status: "Active",
        description: "Severe flooding is occurring in the Ganges Delta region. Multiple rivers have breached their banks. Evacuate low-lying areas immediately and move to designated shelters.",
        reportedBy: "Indian Meteorological Department",
        timestamp: "2023-05-22T14:45:10",
        evacuationOrders: "Evacuate low-lying areas immediately",
        emergencyContacts: "Emergency Services: 112 (India) / 999 (Bangladesh)"
    },
    {
        id: "ALT-2023-003",
        disasterType: "Hurricane",
        date: "2023-06-10",
        location: "United States (Florida, Georgia)",
        severity: "High",
        affectedAreas: "Miami, Jacksonville, Savannah",
        status: "Active",
        description: "Hurricane Maria is approaching the Florida coast. Mandatory evacuation orders are in effect for coastal counties. Seek shelter inland immediately.",
        reportedBy: "National Hurricane Center",
        timestamp: "2023-06-10T17:20:05",
        evacuationOrders: "Mandatory evacuation for coastal counties",
        emergencyContacts: "Emergency Services: 911, FEMA: 1-800-621-3362"
    }
];

// Save sample alerts to localStorage
localStorage.setItem('registeredAlerts', JSON.stringify(sampleAlerts));
console.log("Sample alerts saved:", sampleAlerts);

// Create a sample user
const sampleUser = {
    id: "user-" + Date.now(),
    fullname: "Demo User",
    username: "demo",
    email: "your.actual.email@gmail.com", // Replace with your actual Gmail address
    password: "password", // In a real app, this would be hashed
    dateRegistered: new Date().toISOString(),
    preferences: {
        receiveAlerts: true,
        alertTypes: ["All"],
        regions: ["All"],
        severities: ["All"]
    }
};

// Save sample user to localStorage
const users = [sampleUser];
localStorage.setItem('registeredUsers', JSON.stringify(users));
console.log("Sample user saved:", sampleUser);

// Create a user session
const userSession = {
    active: true,
    userId: sampleUser.id,
    user: sampleUser,
    fullname: sampleUser.fullname,
    loginTime: new Date().toISOString()
};

// Save user session to localStorage
localStorage.setItem('currentUserSession', JSON.stringify(userSession));
console.log("User session created:", userSession);

// Create sample email logs
const sampleLogs = [
    {
        id: 'EMAIL' + Math.floor(Math.random() * 10000) + '1',
        alertId: 'ALT-2023-001',
        disasterType: 'Earthquake',
        location: 'Japan, Philippines',
        severity: 'High',
        sentDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        recipients: 'user1@example.com',
        status: 'Sent'
    },
    {
        id: 'EMAIL' + Math.floor(Math.random() * 10000) + '2',
        alertId: 'ALT-2023-002',
        disasterType: 'Flood',
        location: 'India, Bangladesh',
        severity: 'Critical',
        sentDate: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        recipients: 'user2@example.com',
        status: 'Sent'
    },
    {
        id: 'EMAIL' + Math.floor(Math.random() * 10000) + '3',
        alertId: 'ALT-2023-003',
        disasterType: 'Hurricane',
        location: 'United States (Florida, Georgia)',
        severity: 'High',
        sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        recipients: 'user3@example.com',
        status: 'Failed',
        error: 'Connection timeout'
    }
];

// Save sample email logs to localStorage
localStorage.setItem('emailLogs', JSON.stringify(sampleLogs));
console.log("Sample email logs saved:", sampleLogs);

console.log("Data reset complete. You can now refresh the page to see the changes.");

// Redirect to registered-alerts.html after a short delay
setTimeout(() => {
    window.location.href = 'registered-alerts.html';
}, 2000);
