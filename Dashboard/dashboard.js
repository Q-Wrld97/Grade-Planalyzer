/*Check user on auth state change*/
window.addEventListener('load', function() {
  auth.onAuthStateChanged(user => {
    if (user) {
      getSemester()
      return;
    } 
    else {
      window.location.href = "../Home/html/home.html";
    }
  });
});

async function getSemester() {
  const semesterSelect = document.getElementById("semesterSelect");
  const userId = auth.currentUser.uid;
  const semesterRef = await db.collection('users').doc(userId).get()
  .then(doc => {
    if (doc.exists) {
       let semester = doc.data().semester;
       for(i=0 ; i<semester.length ; i++){
        // Create an option element
        const option = document.createElement("option");
        // Set the value of the option element
        option.value = semester[i];
        // Set the text of the option element
        option.text = semester[i];
        // Append the option element to the select element
        semesterSelect.appendChild(option);
      }
    } else {
      console.log("No such document!");
    }
  })
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