$('.toggle-response').on('click', function() {
  $(this).toggleClass('open');
  $(this).next('.response').slideToggle();
});


async function signOut() {
  await auth
    .signOut()
    .then(function () {
      window.location.href = "../../../../Home/home.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("Sign out error");
    });
}


