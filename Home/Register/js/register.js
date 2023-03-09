
// Apple transition to sign up form
$(window).bind('load', function() {
  var img = document.getElementById("loginImg");
  var form = document.getElementsByClassName("box")[0];
  var opacity = 1;
  var timer = setInterval(function(){
      if(opacity <= 0.1){
          clearInterval(timer);
          img.style.display = "none";
          form.style.height = "620px";
      }
      img.style.opacity = opacity;
      opacity -= opacity * 0.1;
  }, 50);
  form.style.transition = "height 0.5s ease"; // add the transition property
});


// Set up our register function
function register() {
  // Get all our input fields
  userName = document.getElementById("userName").value;
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  passwordConfirm = document.getElementById('confirmPassword').value;

  // Check if the passwords match
  if (password != passwordConfirm) {
    return alert('Passwords do not match') // Change with pop up
    // Don't continue running the code
  }

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert('Bad email or Password') // Change with pop up
    // Don't continue running the code
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Save the user's email to Firestore
    const userDocRef = db.collection('users').doc(userCredential.user.uid)
    return userDocRef.set({
      email: email,
      username: userName,
      creationDate: new Date().toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})
    })
    .then(() => {
      // Send the user a verification email
      return userCredential.user.sendEmailVerification()
    })
    .then(() => {
      // Alert the user that an email has been sent
      alert('Verification email sent.') // Change with pop up
      //redirect user to login after 5 seconds
      setTimeout(function(){ window.location = '../../login/html/login.html'; }, 5000);

    })
    .catch((error) => {
      // Handle any errors that occur during the process
      alert(error.message) // Change with pop up
      throw error
    })
  })
  .catch((error) => {
    // Handle any authentication errors that occur
    alert(error.message) // Change with pop up
  })
}


// Validate that email is in the correct format
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}
//validate password is in the correct format (1 number, 1 special character, 6 characters, 1 uppercase letter,1 lowercase letter)
function validate_password(password) {
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;;
  if (re.test(password)==true) {
    return true
  } else {
    return false
  }
}



