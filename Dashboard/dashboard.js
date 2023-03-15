/*Check user on auth state change*/
auth.onAuthStateChanged(user => {
  if (user) {
    
    return;
  } 
  else {
    window.location.href = "../Home/html/home.html";
  }
});

/*
async function getSemester() {
  const semesterSelect = document.getElementById("semesterSelect");
  const userId = auth.currentUser.uid;
  for(i=0)
  db.collection('users').doc(userId).collection('semesters').get()

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