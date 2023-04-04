let globalData; 

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
  globalData = allCategoryTypeData;
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
//tabbing function
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
  if (globalData === undefined) {
    var data = await getGradeEntry();
  } else {
    var data = globalData;
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
      courseTab.appendChild(course);
      course.onclick = function (event) {
        openTab(event, courseList[i]);
        
      };
    }
  }
}

//create an event listner for id=gradeEntry
document.getElementById("gradeEntryIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(e, 'GradeEntry');
  
  // Call the populateCourseTab function
  populateCourseTab();
});

