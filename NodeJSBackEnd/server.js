const express = require('express'); //for express
const nodemailer = require('nodemailer'); //for nodemailer
const admin = require('firebase-admin');  //for firebase admin sdk
var cron = require('node-cron');//for cron job
const Mailgun = require('mailgun-js'); //for mailgun
const app = express();// initialize express

app.listen(9000, () => {
  console.log('Example app listening on port 3000!');
});



// Initialize Firebase Admin SDK Note:Redacted for security purposes
admin.initializeApp({
  credential: admin.credential.cert({
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "s",
  "client_x509_cert_url": ""
  }),
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});
// Initialize Cloud Firestore through Firebase
const db = admin.firestore();
// Initialize Firebase auth
const auth = admin.auth();






//setting up mailgun Note:Redacted for security purposes
const apiKey = ''; // Replace with your Mailgun API key
const domain = ''; // Replace with your Mailgun domain
const mailgun = Mailgun({ apiKey, domain });


// Send email to user
const sendEmail = async (email) => {
  try {
    const data = {
      from: '',// Replace with your email
      to: email,
      subject: 'Grade PlanAnalyzer Weekly Update',
      text: 'Please Check your Grade Plan Analyzer Account for Updates'
    };

    const result = await mailgun.messages().send(data);
    console.log(`Email sent: ${result.id}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};








// every sunday at 9am send email to all users
const scheduleEmail = cron.schedule('*0 9 * * 0', () => {
    // Get all users from Firebase auth
    auth.listUsers().then((listUsersResult) => {
      // Grab each user's email and send email
      listUsersResult.users.forEach((userRecord) => {
        const userEmail = userRecord.email;
        sendEmail(userEmail);
      });
      
    }).catch((error) => {
      console.error('Error listing users:', error);
    });
});



/*
//****************************************************************************
Precondition: User has created an account and 24 hrs has passed without confirmation

Postcondition: We first iterate through all user ID and Time of Creation(TOC) from the authentication in Firebase. Then, for each user, we check using .emailVerified method to verify if the given user is currently not verified. Prior to comparison, we calculate TimeSinceCreation as the difference between the current time and TOC. Additionally, we declare a variable called timeThreshold that holds the 24-hour threshold. If TimeSinceCreation > timeThreshold, we proceed with the "if" statement to delete the user in authentication and Firestore.

Description: Look for users that have registered but have not verified their accounts. If it has been past 24 hours, delete the user account and database. The function runs every hour.
//****************************************************************************

*/
const deleteUser = cron.schedule('0 * * * *',  () => {


  // Get all users from Firebase auth
  auth.listUsers().then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      const userUid = userRecord.uid;
      const userCreationTime = userRecord.metadata.creationTime;
  
      // Check if the user is not email verified
      if (!userRecord.emailVerified) {
        const timeSinceCreation = Date.now() - new Date(userCreationTime).getTime();//time since creation in milliseconds
        const timeThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
        // Check if the user account is older than 24 hours and not verified
        if (timeSinceCreation >= timeThreshold) {
          // Delete the user account from Firebase auth
          auth.deleteUser(userUid)
          .then(() => {
            console.log(`Successfully deleted user ${userUid} from Firebase auth.`);
          })
          .catch((error) => {
            console.log(`Error deleting user ${userUid} from Firebase auth: ${error}`);
          });
  
          // Delete the user data from Firestore
          db.collection('users').doc(userUid).delete()
          .then(() => {
            console.log(`Successfully deleted user data for ${userUid} from Firestore.`);
          })
          .catch((error) => {
            console.log(`Error deleting user data for ${userUid} from Firestore: ${error}`);
          });
        }
      }
    });
  });
});


//start the cron jobs
scheduleEmail.start();
deleteUser.start();