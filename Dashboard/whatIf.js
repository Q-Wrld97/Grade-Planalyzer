//submit button functionality

const submitBtn = document.getElementById('submitButton');

submitBtn.addEventListener("click", () => {
    const score1 = parseFloat(scoreValue1.innerText);
    const score2 = parseFloat(scoreValue2.innerText);
    const score3 = parseFloat(scoreValue3.innerText);
    const score4 = parseFloat(scoreValue4.innerText);
    const score5 = parseFloat(scoreValue5.innerText);

    const averageScore = (score1 + score2 + score3 + score4 + score5) / 5;

    console.log(`Class 1: ${score1}, Class 2: ${score2}, Class 3: ${score3}, Class 4: ${score4}, Class 5: ${score5}`);
    console.log(`Average Score: ${averageScore}`);

    const whatIfGradeBoxValue = document.querySelector('.whatIfGradeBoxValue');
    whatIfGradeBoxValue.innerHTML = `<h3>${averageScore.toFixed(2)}%</h3>`;
});

/*=====================================Slider Functionalties End==================================================*/
var currentClassComplete;
var currentClassGrades;

async function getWhatIf() {
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
  globalComplete = allFinishTypeData;
  console.log(allFinishTypeData)
  return allCategoryTypeData;
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

//create an event  for id=
document.getElementById("whatIfIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(e, 'WhatIf');
  
  // Call the populateCourseTab function
  getWhatIf().then(() => {
    populateTabWhatIf();
  });
});



async function populateTabWhatIf(){
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
  let whatIfTabCourse= document.getElementById("whatIfTabCourse");
  whatIfTabCourse.innerHTML = "";
  for (i=0; i < classList.length; i++) {
    tab = document.createElement("button");
    tab.className= "tablinks";
    tab.innerHTML = classList[i];
    tab.onclick = function() {
      grabDataPerClass(this.innerHTML);
    }
    whatIfTabCourse.appendChild(tab);
  }
  
}

async function grabDataPerClass(className){
//to grab the correct globalComplete base on the class
currentClassComplete= globalComplete[className];
//to grab the correct  globalGrades base on the class
currentClassGrades= globalGrades[className];
console.log(currentClassGrades)
console.log(currentClassComplete)
//grab the class category length
allCategoryLength=Object.keys(currentClassComplete).length
let whatIfColumn1 = document.getElementById("whatIfColumn1");
whatIfColumn1.innerHTML = "";
//traverse and pouplate the whatIfSlider
for (i=0; i < allCategoryLength; i++){
  //if # field in that category - # field completed = 0, then skip
  const currentCategory = Object.keys(currentClassComplete)[i];
  // If all fields in the current category are filled, then skip to the next iteration
  if (allGradeFilled(currentCategory)) {
    continue;
  }
  let catergorySliderDiv = document.createElement("div");
  catergorySliderDiv.className = "scrollbar";
  catergorySliderDiv.id =Object.keys(currentClassComplete)[i];
  whatIfColumn1.appendChild(catergorySliderDiv);
  let innerDivLabel= document.createElement("div");
  catergorySliderDiv.appendChild(innerDivLabel);
  let catergorySliderLabel = document.createElement("label");
  catergorySliderLabel.innerHTML = Object.keys(currentClassComplete)[i];
  catergorySliderLabel.for="customRange"+(i+1);
  innerDivLabel.appendChild(catergorySliderLabel);
  let innerDivInput = document.createElement("div");
  catergorySliderDiv.appendChild(innerDivInput);
  let catergorySlider = document.createElement("input");
  catergorySlider.type = "range";
  catergorySlider.min = "0";
  catergorySlider.max = "100";
  catergorySlider.value = "0";
  catergorySlider.className = "custom-range";
  catergorySlider.id = "customRange"+(i+1);
  catergorySlider.step="0.1";
  catergorySlider.oninput = (function(index) {
    return function() {
      const rangeInput = document.getElementById('customRange' + (index + 1));
      const scoreValue = document.getElementById('scoreValue' + (index + 1));
      scoreValue.innerHTML = rangeInput.value;
    }
  })(i);
  innerDivInput.appendChild(catergorySlider);
  let catergorySliderSpan = document.createElement("span");
  catergorySliderSpan.id ="scoreValue"+(i+1);
  catergorySliderSpan.setAttribute("name", Object.keys(currentClassComplete)[i] + "WhatifScore");
  catergorySliderSpan.innerHTML = "0";
  innerDivInput.appendChild(catergorySliderSpan);
}

}

//function to check if any field is null
function allGradeFilled(category) {
  let categoryCurrentData = currentClassGrades[category];
  let categoryCurrentLength = Object.keys(categoryCurrentData).length;

  let filled = true;
  for (let i = 0; i < categoryCurrentLength; i++) { // Use a local variable instead of the global one
    if (categoryCurrentData[Object.keys(categoryCurrentData)[i]] == null) {
      return false; // Return false as soon as a null value is found
    }
  }
  return filled;
}



