let globalGrades; 
let globalComplete;
//grabbing data from the database
async function getGradeEntry() {
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
      course.onclick =function() { populateGradeEntryTab(this.innerHTML) };
      courseTab.appendChild(course);
      
    }
  }
}

//create an event  for id=gradeEntry
document.getElementById("gradeEntryIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(e, 'GradeEntry');
  
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
  let courseData = data[courseName];
  let courseData2 = data2[courseName];
  console.log(courseData)
  let gradeEntryRecent = document.getElementById("recentFormSize");
  gradeEntryRecent.innerHTML = "";
  let pastDiscussion = document.getElementById("pastDiscussion");
  pastDiscussion.innerHTML = "";
  let pastQuiz=document.getElementById("pastQuiz");
  pastQuiz.innerHTML="";
  let pastExam=document.getElementById("pastExam");
  pastExam.innerHTML="";
  let pastAssignment=document.getElementById("pastAssignment");
  pastAssignment.innerHTML="";
  let pastProject=document.getElementById("pastProject");
  pastProject.innerHTML="";
  let pastParticipation=document.getElementById("pastParticipation");
  pastParticipation.innerHTML="";

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
        gradeEntryLabel.className="recentFormLabel"
        gradeEntryForm.appendChild(gradeEntryLabel);
        let gradeEntryInput = document.createElement("input");
        gradeEntryInput.id=key2+"Recent";
        gradeEntryInput.type="number";
        gradeEntryInput.className="form-control";
        gradeEntryLabel.appendChild(gradeEntryInput)
      }
      let strippedKey = key.replace(/[0-9]/g, '');
      let capitalizedKey = strippedKey.charAt(0).toUpperCase() + strippedKey.slice(1);
      //populate for grade entry for Past grade in the proper section
      if (courseData[key][key2] !== null && courseData2[key][key2] === true) {
        let gradeEntryForm = document.createElement("div");
        gradeEntryForm.className = "form-group";
        let gradeEntryLabel = document.createElement("label");
        gradeEntryLabel.innerHTML = key2;
        gradeEntryLabel.className="recentFormLabel"
        gradeEntryForm.appendChild(gradeEntryLabel);
        let gradeEntryInput = document.createElement("input");
        gradeEntryInput.id=key2+"Past";
        gradeEntryInput.type="number";
        gradeEntryInput.value=courseData[key][key2]
        gradeEntryInput.className="form-control";
        gradeEntryLabel.appendChild(gradeEntryInput)
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
}






