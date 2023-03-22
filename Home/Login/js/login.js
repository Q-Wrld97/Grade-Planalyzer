// animate img to disspear slowly and let the login form appear
$(window).bind('load', function() {
  var img = document.getElementById("loginImg");
  var opacity = 1;
  var timer = setInterval(function(){
      if(opacity <= 0.1){
          clearInterval(timer);
          img.style.display = "none";
      }
      img.style.opacity = opacity;
      opacity -= opacity * 0.1;
  }, 50);
});



async function Login() {
  // Get all our input fields
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // Check authorization
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    // if email is not verified
    if (!res.user.emailVerified) {
      alert("Your email was not verified. Please verify your email.");
      // Sign out the user
      await auth.signOut();
      return;
    }
    // Fetch the user document from Firestore
    const userDoc = await db.collection("users").doc(res.user.uid).get();
    const semester = userDoc.data()?.semester;
    if (semester == null) {
      // Store login time if not exist
      await db.collection("users").doc(res.user.uid).update({
        timeLogin: new Date(),
      });
      // wait for 1 second before redirecting to course form
      setTimeout(() => {
        window.location.href =
          "../../../Dashboard/CourseInfo/html/courseForm.html";
      }, 500);
    } else {
      // Update the login time in the user document and redirect to dashboard
      await db.collection("users").doc(res.user.uid).update({
        timeLogin: new Date(),
      });
      setTimeout(() => {
        window.location.href = "../../../Dashboard/dashboard.html";
      }, 500);
    }
  } catch (error) {
    alert("Wrong Username or Password or Email not verified within 24 Hrs");
  }
}


// Old login functionality
/*function Login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // Check authorization
  auth.signInWithEmailAndPassword(email, password)
  .then((res) => {
    //store login time
    db.collection('users').doc(res.user.uid).update({
      timeLogin: new Date()
    });
    // if email is not verified
    if (res.user.emailVerified == false) {
      // get creationDate from firestore
      var userdata = db.collection('users').doc(res.user.uid).get();
      // use snapshot to query timeVerification
      userdata.then((snapshot) => {
        var timeVerification = snapshot.data().timeVerification;
        // if 24 hours have passed, delete user from Auth and Firestore
        if (new Date().getTime() - timeVerification >= 24 * 60 * 60 * 1000) {
          // delete user from firestore
          db.collection('users').doc(res.user.uid).delete()
            .then(() => {
            // delete user from auth
            res.user.delete()
            alert('Your account has been deleted because you did not verify your email within 24 Hrs of account creation.');
            setTimeout(() => {window.location.href = '../../Register/html/register.html';}, 2000);
           
          })
        }
        else {
          // if user time has not expire
          alert('please verify your email in 24 Hrs from the time of creation of your account'); // Change with pop up
          window.location.href = '../../../Dashboard/CourseInfo/html/courseForm.html';
        }
      });
    }
    else {
      //verified email go to 
      window.location.href = '../../../Dashboard/CourseInfo/html/courseForm.html';
    }
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Wrong Username or Password");
  });
}*\

// test code for login and verification delete after 60 seconds instead
/*function Login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // Check authorization
  auth.signInWithEmailAndPassword(email, password)
  .then((res) => {
    //store login time
    db.collection('users').doc(res.user.uid).update({
      timeLogin: new Date()
    });
    // if email is not verified
    if (res.user.emailVerified == false) {
      // get creationDate from firestore
      var userdata = db.collection('users').doc(res.user.uid).get();
      // use snapshot to query timeVerification
      userdata.then((snapshot) => {
        var timeVerification = snapshot.data().timeVerification;
        // if 24 hours have passed, delete user from Auth and Firestore
        if (new Date().getTime() - timeVerification >=  60 * 1000) {
          // delete user from firestore
          db.collection('users').doc(res.user.uid).delete()
            .then(() => {
            // delete user from auth
            res.user.delete()
            alert('Your account has been deleted because you did not verify your email within 24 Hrs of account creation.');
            window.location.href = '../../Register/html/register.html';
            //stop running code
          })
        }
        else {
          // if user time has not expire
          alert('please verify your email in 24 Hrs from the time of creation of your account'); // Change with pop up
          window.location.href = '../../../Dashboard/CourseInfo/html/courseForm.html';
        }
      });
    }
    else {
      //verified email go to 
      window.location.href = '../../../Dashboard/CourseInfo/html/courseForm.html';
    }
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Wrong Username or Password");
  });
}
*/