//sign out using auth from firebase
async function signOut() {
    await auth.signOut().then(function() {
      window.location.href = "/Home/home.html";
      }).catch(function(error) {
        // An error happened.
        console.log("Sign out error");
    });
}

