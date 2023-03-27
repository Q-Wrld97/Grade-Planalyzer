window.addEventListener("load", function () {
  auth.onAuthStateChanged((user) => {
    if (user) {
      return;
    } else {
      window.location.href = "../Home/home.html";
    }
  });
});

async function settingConfirm() {
  cumulativeGPA = document.getElementById("GPA").value;
  cumulativeCredit = document.getElementById("credit").value;
  if ((SchoolType = document.getElementById("customRadio1").checked)) {
    gpaScale = {
      'A': '93',
      'A-': '92',
      'B+': '87',
      'B': '83',
      'B-': '82',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D+': '67',
      'D': '63',
      'D-': '60',
      'F': '0'
    };
  } else if ((SchoolType = document.getElementById("customRadio2").checked)) {
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
  }
  receiveEmail = document.getElementById("receiveEmail").value;
  console.log(receiveEmail)

  await db.collection("users").doc(auth.currentUser.uid).update({
    cumulativeGPA: cumulativeGPA,
    cumulativeCredit: cumulativeCredit,
    gpaScale: gpaScale,
    receiveEmail: receiveEmail
  });

  alert("Setting Saved!")

}



function yesnoCheck() {
  if (document.getElementById('customRadio4').checked) {
      document.getElementById('ifYes').style.display = 'block';
  }
  if (document.getElementById('customRadio3').checked) {
  document.getElementById('ifYes').style.display = 'none';
  }
}