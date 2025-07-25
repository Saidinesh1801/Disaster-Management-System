// EmailJS Service for sending emails
// This is a fallback service when the server is not available
const EmailJSService = {
    config: {
        userId: "K-wl5tjKVfYBYecW3", // Your EmailJS User ID
        serviceId: "service_vp6w5rb", // Your EmailJS Service ID
        templateId: "template_userk4m", // Your EmailJS Template ID
        publicKey: "K-wl5tjKVfYBYecW3", // Your EmailJS Public Key
        enabled: true
    },

    init: function() {
        // Check if emailjs is loaded
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.config.userId);
            console.log('EmailJS initialized with user ID:', this.config.userId);
            return true;
        } else {
            console.error('EmailJS library not loaded');
            return false;
        }
    },

    // Send an alert email using EmailJS
    sendAlertEmail: function(user, alert, callback) {
        // Initialize EmailJS if not already initialized
        this.init();

        // Create email subject based on alert severity
        const subjectPrefix = alert.severity === 'critical' ? '🚨 URGENT: ' :
                            alert.severity === 'high' ? '⚠️ IMPORTANT: ' : '';

        const subject = `${subjectPrefix}${alert.disasterType} Alert for ${alert.regions}`;

        // Default emergency contacts based on disaster type
        const defaultEmergencyContacts = `<div class="emergency-contacts">
<h3>Emergency Contacts</h3>
<ul>
<li>Emergency Services: 911 (US) / 112 (EU) / 112 (India)</li>
<li>FEMA Disaster Assistance: 1-800-621-3362</li>
<li>American Red Cross: 1-800-733-2767</li>
<li>National Weather Service: 1-301-713-0622</li>
<li>India Disaster Helpline: 1078</li>
<li>India National Disaster Response Force: 011-24363260</li>
</ul>
</div>`;

        // Prepare template parameters
        const templateParams = {
            to_name: user.fullname || 'User',
            to_email: user.email,
            subject: subject,
            message: alert.message,
            disaster_type: alert.disasterType,
            severity: alert.severity,
            regions: alert.regions,
            alert_id: alert.id,
            date_time: alert.datetime,
            emergency_contacts: alert.emergencyContacts || defaultEmergencyContacts,
            evacuation_orders: alert.evacuationOrders || 'None'
        };

        // Send email
        try {
            emailjs.send(
                this.config.serviceId,
                this.config.templateId,
                templateParams
            ).then(function(response) {
                console.log('EmailJS SUCCESS:', response.status, response.text);
                if (callback) callback(null, { status: 'sent', provider: 'EmailJS' });
            }, function(error) {
                console.error('EmailJS FAILED:', error);
                if (callback) callback(error, { status: 'failed', provider: 'EmailJS' });
            });
        } catch (error) {
            console.error('EmailJS Error:', error);
            if (callback) callback(error, { status: 'failed', provider: 'EmailJS' });
        }
    }
};

// Make EmailJSService available globally
window.EmailJSService = EmailJSService;
