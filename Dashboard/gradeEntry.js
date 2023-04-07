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
//Extract key from hashnmap
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
  let gradeEntry = document.getElementById("recentFormSize");
  gradeEntry.innerHTML = "";
  // go throught the courseData if any field is null, populate it in html
  for (const key in courseData) {
    for (const key2 in courseData[key]) {
      if (courseData[key][key2] === null && courseData2[key][key2] === true) {
        let gradeEntryForm = document.createElement("div");
        gradeEntryForm.className = "form-group";
        gradeEntry.appendChild(gradeEntryForm);
        let gradeEntryLabel = document.createElement("label");
        gradeEntryLabel.innerHTML = key2;
        gradeEntryLabel.className="recentFormLabel"
        gradeEntryForm.appendChild(gradeEntryLabel);
        let gradeEntryInput = document.createElement("input");
        gradeEntryInput.id=key2;
        gradeEntryInput.type=Number;
        gradeEntryInput.className="form-control";
        gradeEntryLabel.appendChild(gradeEntryInput)

      }
    }
  }
}





