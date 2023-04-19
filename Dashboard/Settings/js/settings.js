document.addEventListener("DOMContentLoaded", function ()  {
  auth.onAuthStateChanged( async (user) => {
    if (user) {
      semesterData = await db.collection("users").doc(auth.currentUser.uid).get();
      semester= semesterData.data().semester;
      console.log(semester)
      if (semester == null) {
        document.getElementById("faq").style.display = "none";
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("reportIssue").style.display = "none";
        document.getElementById("settings").style.display = "none";
      }
      else {
    
      }  
    } 
    else {
      window.location.href = "../../../Home/home.html";
    }
  });
});

//CAPTURE User setting Input and save it to DB
async function settingConfirm() {
  cumulativeGPA = document.getElementById("GPA").value;
  cumulativeCredit = document.getElementById("credit").value;
  if ((gpaType= document.getElementById("customRadio1").checked)) {
    gpaScale = {
      'A': 4,
      'A-': 3.67,
      'B+': 3.33,
      'B': 3,
      'B-': 2.67,
      'C+': 2.33,
      'C': 2,
      'C-': 1.67,
      'D+': 1.33,
      'D': 1,
      'D-': 0.67,
      'F': 0
    };
  } else if ((gpaType= document.getElementById("customRadio2").checked)) {
    gpaScale = {
      'A': document.getElementsByName('A')[0].value,
      'A-': document.getElementsByName('A-')[0].value,
      'B+': document.getElementsByName('B+')[0].value,
      'B': document.getElementsByName('B')[0].value,
      'B-': document.getElementsByName('B-')[0].value,
      'C+': document.getElementsByName('C+')[0].value,
      'C': document.getElementsByName('C')[0].value,
      'C-': document.getElementsByName('C-')[0].value,
      'D+': document.getElementsByName('D+')[0].value,
      'D': document.getElementsByName('D')[0].value,
      'D-': document.getElementsByName('D-')[0].value,
      'F': document.getElementsByName('F')[0].value
    };

    //check if previous value is greater than current value and remove any empty value
    let prevValue = Infinity; // Set to infinity to ensure that the first comparison will pass
    let prevKey = "";

    for (const key in gpaScale) {
      const value = parseInt(gpaScale[key]); // Convert value to integer for comparison

      if (!value || isNaN(value)) {
        delete gpaScale[key]; // Remove the key if value is empty or not a number
      } else {
        if (value > prevValue) {
          alert(
            `Value for ${key} (${value}) is greater than previous value for ${prevKey} (${prevValue}).`
          );
          // Do something here to handle the case where the value is not decreasing
          return;
        }
        prevValue = value;
        prevKey = key;
      }
    }
  } else {
    return alert("Please select School Type");
  }

  receiveEmail = document.getElementById("receiveEmail").value;
  console.log(receiveEmail);

  await db.collection("users").doc(auth.currentUser.uid).update({
    cumulativeGPA: cumulativeGPA,
    cumulativeCredit: cumulativeCredit,
    gpaScale: gpaScale,
    receiveEmail: receiveEmail,
  });

  semesterData = await db.collection("users").doc(auth.currentUser.uid).get();
  semester= semesterData.data().semester;
  if (semester == null) {
    window.location.href = "../../CourseInfo/html/courseForm.html";
  }
  else {
    window.location.href = "../../dashboard.html";
  }



  alert("Setting Saved!");
}


//Hide and show GPA scale
function yesnoCheck() {
  if (document.getElementById("customRadio2").checked) {
    document.getElementById("ifYes").style.display = "block";
  }
  if (document.getElementById("customRadio1").checked) {
    document.getElementById("ifYes").style.display = "none";
  }
}

async function signOut() {
  await auth.signOut().then(function() {
    window.location.href = "../Home/home.html";
    }).catch(function(error) {
      // An error happened.
      console.log("Sign out error");
  });
}

