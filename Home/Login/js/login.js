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


function login () {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;


  auth.signInWithEmailAndPassword(email, password)
  .then((res) => {
    db.collection('users').doc(res.user.uid).update({
      loginTime: new Date().toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'}),
    })
    .then(() => {
      // Check if the email is verified
      if (res.user.emailVerified == false) {
        // notified user that they need to verify their email
        alert('please verify your email in 24 hrs from the time of creation of your account'); // Change with pop up
        // Go to Firestore and check user's creation date
        db.collection('users').doc(res.user.uid).get()
        .then((doc) => {
          // If the user's creation date is more than 24 hours old, delete user from Auth and Firestore
          if (doc.data().creationDate < new Date().toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})) {
            // Delete user from Auth
            res.user.delete()
            .then(() => {
              // Delete user from Firestore
              db.collection('users').doc(res.user.uid).delete()
              .then(() => {
                alert('Your account has been deleted due to not verifying your email in 24 hours'); // Change with pop up
                return
                //stop running code
              })
            });
          }
        });
      }
      //redirect user to dashboard and pass auth token
      window.location.href = '../../../Dashboard/CourseInfo/html/courseForm.html';
    })
    .catch((error) => {
      alert(error.message);// Change with pop up
    });
  })
  .catch((error) => {
    alert(error.message);// Change with pop up
  });

  alert('User Logged In!'); // Change with pop up
}
