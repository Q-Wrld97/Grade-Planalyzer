const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "testing-320ed",
  "private_key_id": "57f5a27613dbdff9c6ac7cf793188cde76e6e6fc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDolAr2q9CN7Ok3\nfL2hg22DwsbiAmh0BEkamKRnDlj3h2SHp886dv7GH5lnPGSGYpNlgCdsNoZUAso2\nUpscVvXf/1TJ368ViRH59JoVdB2tfAk4nSPAdZFgfHAVqyeZbmgta/TRvlr1eLH0\nI7mKIrK2nUDZrsXrduN64jbAGGPc+jFnD0IHFAxtC9OSw+Q9SF2G0cx3y6PP6/c8\nGLlyS6a1dLXYLCC8eyLxRhITJdhbwLE0M4ijX4KSAwZI+QHqbAsjLACd5TBYSGqH\n6+nFJ8rTJX0ZdTYa7Vbd8LVUSfjNtvg6Bwrt/VZn1FEkrwMvcN6r3Kk+MiScDuMl\nX601cGnzAgMBAAECggEAXSN0JIZ31W5Lkvn0Yurj/4EP7lByjgttTyZTqCWZwT7K\nJn0wQsSGkMb0wt/vjdWKG3qvzuki8B/R5OE91qKIgnSY+uMGFYS32zZ2QiMnA2OJ\nuc9MEvXCCzaqGDNbf1k0hQQXnasyd90mvpNT6RquIO1mnAYeooYQ4RQYQuNBkqsn\njVO630zHQKYASPNQeJ2RTdLYjO7VIjV1mfadxRLbFRQ3Zo6Ykbb/7roOz4liqpgl\nLuTjLvYJY+o4POfkfeLRrmmtAv9gBtJpUoWCyPk67fguMHSCcceXkijnaxVFh5IH\neNvI1B1Yp/94EdYMDk1DosVJpqUfoOGqZ8Lq+ESdyQKBgQD2s/dS/6A2zUnCYeyR\nOu1J4qodReCauX5VL6b5EhwU1nQVxnTG4dQKQ2N7Pu2Mp4EMsfbM/GNyFnnJYZRF\ne96MXxRfFR0JIMXwgd+OyNbrchVg02P8CoEJ5ei9v/jmorGEWyJKdMGsQDftK17u\n1SYHQqFA837HP1eqlDKcwLVFLQKBgQDxV8+BrI5e0DH1a8K4HNGSbsnB0+csE16Q\nhp+yUCnLNQgrnZUQSNw9rgMTRwt+Fb56qaTH3bao2CCLTqaNxQzeyNHTVTeYWrVc\n9Oblab0ixOz+XuoOBVyDz0N2Wvb8DoYSVFKE9EV1zOUvjTcXFxoeoF0fqZKT+eIF\nD4AB16IfnwKBgEYCUD9nd2nV3Aajj2SvWkNLZYclG1YNKcK24SVxdDKdoRfE18LQ\nt0GqWgLRmsv9hOu7XRRS002+/xSc8ly9iCxBlyBcd37to/5afLyiVgs+tr5hftA5\nkuDiM6gVYGbi6Ils61BBzew51SUi16/jIQWSbPxnnSSh3xjzMWG2djqJAoGBAI1G\nBJ74voI7xvLNuLcDj53zIkFG5IyFbhaV54d+q2hbS8QUQ3y72ch1QzGWpeCRo+Wz\nxlSEsXbWxP4m9RIJ5gXHciQOPzP87StT5JEoO2HN+pjQQJwigUxbGDeA+hEEA3FZ\nUNCpGLvjS8lxFW17xXtmDf0Jy1a5sJebwifR7QIrAoGBALtQVljnq2C+9GMMv0tO\n/0LZiL5EdmZkRnZMSg2amTjVmzdhvmluS6DLBidkYxWPLG+sdztLgo1rOVlSvYW1\nRM7WLkWX0BLb+cdU7ObIVbY/AVSFrFGPZXkOaB6+g5VTwkYLQgexm9/A/piehjkR\nFMTPlYdTslrCn7q1MJqPRP15\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-p1g9y@testing-320ed.iam.gserviceaccount.com",
  "client_id": "106609534272119371477",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p1g9y%40testing-320ed.iam.gserviceaccount.com"
  }),
  apiKey: "AIzaSyACtLJPVmbrm-VTam80pmNC6ev_C9mVTiA",
  authDomain: "testing-320ed.firebaseapp.com",
  projectId: "testing-320ed",
  storageBucket: "testing-320ed.appspot.com",
  messagingSenderId: "759480422005",
  appId: "1:759480422005:web:ed1e51cd3d09550041b23c"
});
const db = admin.firestore();
const auth = admin.auth();


var cron = require('node-cron');


const task = cron.schedule('* * * * * *', () => {
console.log('Task is running every minute');

// Get all users from Firebase auth
auth.listUsers().then((listUsersResult) => {
  listUsersResult.users.forEach((userRecord) => {
    const userUid = userRecord.uid;
    const userCreationTime = userRecord.metadata.creationTime;

    // Check if the user is not email verified
    if (!userRecord.emailVerified) {
      const timeSinceCreation = Date.now() - new Date(userCreationTime).getTime();
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