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


//auth forget password firebase
function forgetPassword(){
  var emailAddress = document.getElementById("email").value;
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    alert("Email sent");
  }).catch(function(error) {
    // An error happened.
    alert(error);
  })
  .then(() => {
    // Alert the user that an email has been sent
    alert('Verification email sent.') // Change with pop up
    //redirect user to login after 5 seconds
    setTimeout(function(){ window.location.href = '../../Login/html/login.html'; }, 1000);

  });
}