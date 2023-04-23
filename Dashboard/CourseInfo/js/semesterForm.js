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
    dbSemester = await db.collection("users").doc(userUID).get();
    console.log(dbSemester.data().semester);
    //if semester exist
    if (dbSemester.data().semester.length === null) {
        //keep going because semester does not exist
    } else {
      for (var i = 0; i < dbSemester.data().semester.length; i++) {
        if (dbSemester.data().semester[i] == semester) {
          alert("semester already exist");
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
