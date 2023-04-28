var userUID;

//check if user is authenticated and if not take them back to home page on load
window.onload = function () {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      userUID = user.uid;
      return;
    } else {
      window.location.href = "../../../index.html";
    }
  });
};

// Limit user input to 4 characters
function limitInputToFourCharacters(inputElement) {
  inputElement.addEventListener("input", function (event) {
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });
}

async function addSemesterData() {
  semesterSeasons = document.getElementById("semesterSeason").value;
  semesterYears = document.getElementById("semesterYear").value;
  semesterStartDate = document.getElementById("semesterStartingDate").value;
  semesterEndDate = document.getElementById("semesterEndingDate").value;

  if (
    semesterSeasons == "" ||
    semesterYears == "" ||
    semesterStartDate == "" ||
    semesterEndDate == ""
  ) {
    console.log("Empty field");
    return;
  } else {
    var semester = semesterSeasons + semesterYears;
    var semesterStartAndEnd = semesterStartDate + "||" + semesterEndDate;
    //check start date is before end date 
    if (semesterStartDate > semesterEndDate) {
        alert("Start date must be before end date");
        return;
    }
    //check if semester exists in database
    const dbSemester = await db.collection("users").doc(userUID).get();
    const semesters = dbSemester.data().semester;
    
    // if semester field does not exist or is null
    if (!semesters || semesters === null) {
      // do something when semester is null or does not exist
    } else {
      // loop through the array of semesters and check if semester already exists
      for (let i = 0; i < semesters.length; i++) {
        if (semesters[i] === semester) {
          alert("semester already exists");
          return;
        }
      }
    }
    //make a dictionary with semester and start and end date
    var semesterDict = {};
    semesterDict[semester] = semesterStartAndEnd;
    console.log(semesterDict);
    //update semester start and end date as dictionary in database by semester
    await db
        .collection("users")
        .doc(userUID)
        .update({
            semesterStartAndEnd: firebase.firestore.FieldValue.arrayUnion(semesterDict),
        });
    //pass over URL parameters
    var para = new URLSearchParams();
    para.append("semesterSeason", semesterSeasons);
    para.append("semesterYear", semesterYears);
    window.location.href = "../html/courseForm.html?" + para.toString();
  }
  

}
