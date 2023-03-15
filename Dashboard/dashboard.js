/*Check user on auth state change*/
auth.onAuthStateChanged(user => {
  if (user) {
    
    return;
  } 
  else {
    window.location.href = "../Home/html/home.html";
  }
});


async function getSemester() {
  const semesterSelect = document.getElementById("semesterSelect");
  const userId = auth.currentUser.uid;
  db.collection('users').doc(userId).getCollections()
  .then((collections) => {
    collections.forEach((collection) => {
      console.log(collection.id);
      // Replace this console.log statement with the code that you want to execute for each sub-collection
    });
  })
  .catch((error) => {
    console.error('Error listing sub-collections: ', error);
  });

}





/* Tabs Section */
function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}