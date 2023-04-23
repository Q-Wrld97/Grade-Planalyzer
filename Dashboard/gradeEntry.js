var globalGrades; // global variable to store the grades
var globalComplete; // global variable to store the completion status
var currentTabPick; // global variable to store the current tab pick
var globalDates;

//grabbing data from the database
async function getGradeEntry() {
  //if global variable exist then we don't need to grab data
  let userID = auth.currentUser.uid;
  let semester = document.getElementById("semesterSelect").value;
  let classes = await db
    .collection("users")
    .doc(userID)
    .collection(semester)
    .get();
  let classList = [];
  classes.forEach((doc) => {
    classList.push(doc.id);
  });
  let categoryList = [
    "exam",
    "quiz",
    "assignment",
    "discussion",
    "project",
    "participation",
  ];
  let allCategoryTypeData = {};
  let allFinishTypeData = {};
  let allDateTypeData = {};
  for (let i = 0; i < classList.length; i++) {
    let classData = {};
    for (let j = 0; j < categoryList.length; j++) {
      let categoryData = {};
      let data = await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(classList[i])
        .collection(categoryList[j])
        .doc(categoryList[j] + "Grades")
        .get();
      //store the data in the categoryData object
      categoryData = data.data();
      classData[categoryList[j]] = categoryData;
    }
    allCategoryTypeData[classList[i]] = classData;
  }
  removeUndefined(allCategoryTypeData);
  console.log(allCategoryTypeData);
  globalGrades = allCategoryTypeData;
  for (let i = 0; i < classList.length; i++) {
    let classData = {};
    for (let j = 0; j < categoryList.length; j++) {
      let categoryData = {};
      let data = await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(classList[i])
        .collection(categoryList[j])
        .doc(categoryList[j] + "Complete")
        .get();
      //store the data in the categoryData object
      categoryData = data.data();
      classData[categoryList[j]] = categoryData;
    }
    allFinishTypeData[classList[i]] = classData;
  }
  removeUndefined(allFinishTypeData);
  console.log(allFinishTypeData);
  globalComplete = allFinishTypeData;
  //now we grab the dates for the grade entry
  for (let i = 0; i < classList.length; i++) {
    let classData = {};
    for (let j = 0; j < categoryList.length; j++) {
      let categoryData = {};
      let data = await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(classList[i])
        .collection(categoryList[j])
        .doc(categoryList[j] + "Dates")
        .get();
      //store the data in the categoryData object
      categoryData = data.data();
      classData[categoryList[j]] = categoryData;
    }
    allDateTypeData[classList[i]] = classData;
  }
  removeUndefined(allDateTypeData);
  console.log(allDateTypeData);
  globalDates = allDateTypeData;
  return allCategoryTypeData;
}

//removes undefined values from the object
function removeUndefined(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeUndefined(obj[key]);
    }
  }
}

//Extract key from hash map
function extractKeys(obj) {
  const result = [];
  for (const key in obj) {
    result.push(key);
  }
  return result;
}

//tabbing function for grade entry tab
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

//populate the tab for the grade entry
async function populateCourseTab() {
  if (globalGrades === undefined) {
    var data = await getGradeEntry();
  } else {
    var data = globalGrades;
  }
  let courseList = extractKeys(data);
  let courseTab = document.getElementById("courseTab");

  for (let i = 0; i < courseList.length; i++) {
    let buttonId = "courseButton" + i;

    // Check if a button with the specific ID already exists
    if (document.getElementById(buttonId) === null) {
      let course = document.createElement("button");
      course.className = "tablinks";
      course.innerHTML = courseList[i];
      course.id = buttonId;
      course.onclick = function () {
        populateGradeEntryTab(this.innerHTML);
      };
      courseTab.appendChild(course);
    }
  }
}

//create an event  for id=gradeEntry
document.getElementById("gradeEntryIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(e, "GradeEntry");

  // Call the populateCourseTab function
  populateCourseTab();
});

// function to populate the grade entry tab
async function populateGradeEntryTab(courseName) {
  if (globalGrades === undefined) {
    var data = await getGradeEntry();
  } else {
    var data = globalGrades;
  }
  if (globalComplete === undefined) {
    var data2 = await getGradeEntry();
  } else {
    var data2 = globalComplete;
  }
  if (globalDates === undefined) {
    var data3 = await getGradeEntry();
  } else {
    var data3 = globalDates;
  }

  let courseData = data[courseName];
  let courseData2 = data2[courseName];
  let courseData3 = data3[courseName];
  // go through course data 3 and see what date has past and change courseData2 to true
  for (const key in courseData3) {
    for (const key2 in courseData3[key]) {
      if (courseData3[key][key2] !== null) {
        let date = new Date(courseData3[key][key2]);
        let today = new Date();
        if (date < today) {
          courseData2[key][key2] = true;
        }
      }
    }
  }
  console.log(courseData);
  let gradeEntryRecent = document.getElementById("recentFormSize");
  gradeEntryRecent.innerHTML = "";
  let pastDiscussion = document.getElementById("pastDiscussion");
  pastDiscussion.innerHTML = "";
  let pastQuiz = document.getElementById("pastQuiz");
  pastQuiz.innerHTML = "";
  let pastExam = document.getElementById("pastExam");
  pastExam.innerHTML = "";
  let pastAssignment = document.getElementById("pastAssignment");
  pastAssignment.innerHTML = "";
  let pastProject = document.getElementById("pastProject");
  pastProject.innerHTML = "";
  let pastParticipation = document.getElementById("pastParticipation");
  pastParticipation.innerHTML = "";

  // go and populate all the data in grade entry tab base on the class
  for (const key in courseData) {
    for (const key2 in courseData[key]) {
      //populate for recent grade
      if (courseData[key][key2] === null && courseData2[key][key2] === true) {
        let gradeEntryForm = document.createElement("div");
        gradeEntryForm.className = "form-group";
        gradeEntryRecent.appendChild(gradeEntryForm);
        let gradeEntryLabel = document.createElement("label");
        gradeEntryLabel.innerHTML = key2;
        gradeEntryLabel.className = "recentFormLabel";
        gradeEntryForm.appendChild(gradeEntryLabel);
        let gradeEntryInput = document.createElement("input");
        gradeEntryInput.id = key2 + "Recent";
        gradeEntryInput.name = "Recent";
        gradeEntryInput.value = null;
        gradeEntryInput.type = "number";
        gradeEntryInput.className = "form-control";
        gradeEntryLabel.appendChild(gradeEntryInput);
      }

      let strippedKey = key.replace(/[0-9]/g, "");
      let capitalizedKey =
        strippedKey.charAt(0).toUpperCase() + strippedKey.slice(1);
      //populate for grade entry for Past grade in the proper section
      if (courseData[key][key2] !== null && courseData2[key][key2] === true) {
        let gradeEntryForm = document.createElement("div");
        gradeEntryForm.className = "form-group";
        let gradeEntryLabel = document.createElement("label");
        gradeEntryLabel.innerHTML = key2;
        gradeEntryLabel.className = "pastFormLabel";
        gradeEntryForm.appendChild(gradeEntryLabel);
        let gradeEntryInput = document.createElement("input");
        gradeEntryInput.id = key2 + "Past";
        gradeEntryInput.type = "number";
        gradeEntryInput.name = "Past";
        gradeEntryInput.value = courseData[key][key2];
        gradeEntryInput.className = "form-control";
        gradeEntryLabel.appendChild(gradeEntryInput);
        if (capitalizedKey.includes("Discussion")) {
          pastDiscussion.appendChild(gradeEntryForm);
        } else if (capitalizedKey.includes("Quiz")) {
          pastQuiz.appendChild(gradeEntryForm);
        } else if (capitalizedKey.includes("Exam")) {
          pastExam.appendChild(gradeEntryForm);
        } else if (capitalizedKey.includes("Assignment")) {
          pastAssignment.appendChild(gradeEntryForm);
        } else if (capitalizedKey.includes("Project")) {
          pastProject.appendChild(gradeEntryForm);
        } else if (capitalizedKey.includes("Participation")) {
          pastParticipation.appendChild(gradeEntryForm);
        }
      }
    }
  }
  currentTabPick = courseName;
}

// function to submit grades
async function submitGrade() {
  //grab data from html elment for recent
  let recentGradeName = document.getElementsByClassName("recentFormLabel");
  let recentGradeValue = document.getElementsByName("Recent");
  let recentGrade = {};
  let recentGradeValueArray = Array.from(recentGradeValue);
  for (let i = 0; i < recentGradeName.length; i++) {
    recentGrade[recentGradeName[i].textContent] =
      recentGradeValueArray[i].value;
  }
  let pastGradeName = document.getElementsByClassName("pastFormLabel");
  let pastGradeValue = document.getElementsByName("Past");
  let pastGradeValueArray = Array.from(pastGradeValue);
  for (let i = 0; i < pastGradeName.length; i++) {
    recentGrade[pastGradeName[i].textContent] = pastGradeValueArray[i].value;
  }
  console.log(recentGrade);
  let userID = auth.currentUser.uid;
  let semester = document.getElementById("semesterSelect").value;
  let course = currentTabPick;
  //go through recentgrade and take out the key and store into array
  let recentGradeKey = Object.keys(recentGrade);
  // remove number from the key
  let recentGradeKeyArray = recentGradeKey.map((x) => x.replace(/[0-9]/g, ""));
  console.log(recentGradeKeyArray);
  console.log(recentGradeKey);
  for (i = 0; i < recentGradeKeyArray.length; i++) {
    courseData = await db
      .collection("users")
      .doc(userID)
      .collection(semester)
      .doc(course)
      .collection(recentGradeKeyArray[i])
      .doc(recentGradeKeyArray[i] + "Grades")
      .update({
        [recentGradeKey[i]]: parseFloat(recentGrade[recentGradeKey[i]]),
      });
  }
  getGradeEntry();
}
