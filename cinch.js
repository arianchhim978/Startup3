// Your Twilio credentials
const accountSid = 'ACccc8e7776a399f5d9a4fedc6046b71b5';
const authToken = '0b674546ac4092339f01540393a49967';
const twilioPhoneNumber = '+18556271276';

// Function to send SMS invitation using Twilio
function sendInvitationSMS() {
    const phoneNumber = $('#phoneNumber').val();
    const invitationMessage = $('#message').val();

    // Make a request to your server to send the SMS using Twilio
    $.ajax({
        url: '/send-sms', // Replace with the endpoint on your server to send SMS
        method: 'POST',
        data: {
            to: phoneNumber,
            body: invitationMessage
        },
        success: function(response) {
            console.log('Invitation SMS sent successfully', response);
            // Optionally, you can display a success message or perform other actions
        },
        error: function(error) {
            console.error('Error sending invitation SMS', error);
            // Optionally, you can display an error message or perform other actions
        }
    });
}



// ... (your existing code)
