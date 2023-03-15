/*Check user on auth state change*/
auth.onAuthStateChanged(user => {
  if (user) {
    
    return;
  } 
  else {
    window.location.href = "../Home/html/home.html";
  }
});


//Grab Semester From DataBase and display it in the dropdown menu
async function getSemester() {
  semesterSelect= document.getElementById("semesterSelect");
  //Get Semester From DataBase
  //const snapshot = await db.collection('users').doc(auth.currentUser).collection(semester).get();

  //grab user id from auth
  const user = auth.currentUser;
  alert(user)




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