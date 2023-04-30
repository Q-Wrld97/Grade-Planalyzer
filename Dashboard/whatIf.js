//submit button functionality

const submitBtn = document.getElementById("submitButton");

submitBtn.addEventListener("click", () => {
  calculateWhatif();
});

/*=====================================Slider Functionalties End==================================================*/
var currentClassComplete;
var currentClassGrades;
var currentClassesWeight;
var currentClassGeneralData;

async function getWhatIf() {
  // if all global variable exist then we don't need to get the data
  if (
    globalGrades != undefined &&
    globalComplete != undefined &&
    globalWeight != undefined &&
    globalGeneralData != undefined
  ) {
    return;
  }
  //if all global variables are undefined, then we need to get the data
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
  let allWeightTypeData = {};
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
  console.log(allFinishTypeData);
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
        .doc(categoryList[j] + "Weight")
        .get();
      //store the data in the categoryData object
      categoryData = data.data();
      classData[categoryList[j]] = categoryData;
    }
    allWeightTypeData[classList[i]] = classData;
  }
  removeUndefined(allWeightTypeData);
  globalWeight = allWeightTypeData;
  console.log(allWeightTypeData);
  generalData = {};
  //grabbing general data
  for (let i = 0; i < classList.length; i++) {
    let data = await db
      .collection("users")
      .doc(userID)
      .collection(semester)
      .doc(classList[i])
      .get();
    generalData[classList[i]] = data.data();
  }
  globalGeneralData = generalData;
  console.log(generalData);
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
  openTab(e, "WhatIf");

  // Call the populateCourseTab function
  getWhatIf().then(() => {
    populateTabWhatIf();
  });
});

async function populateTabWhatIf() {
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
  let whatIfTabCourse = document.getElementById("whatIfTabCourse");
  whatIfTabCourse.innerHTML = "";
  for (i = 0; i < classList.length; i++) {
    tab = document.createElement("button");
    tab.className = "tablinks";
    tab.innerHTML = classList[i];
    tab.id = "whatIfTabCourse" + i;
    tab.onclick = function () {
      grabDataPerClass(this.innerHTML);
      for( i = 0 ; i < classList.length; i++){
        document.getElementById("whatIfTabCourse" + i).style.backgroundColor = "grey";
      }
      this.style.backgroundColor = "red";
    };
    
    whatIfTabCourse.appendChild(tab);
  }
}

async function grabDataPerClass(className) {
  //to grab the correct globalComplete base on the class
  currentClassComplete = globalComplete[className];
  //to grab the correct  globalGrades base on the class
  currentClassGrades = globalGrades[className];
  //to grab the correct  globalWeight base on the class
  currentClassWeight = globalWeight[className];
  //to grab the correct  globalGeneralData base on the class
  currentClassGeneralData = globalGeneralData[className];

  console.log(currentClassGrades);
  console.log(currentClassComplete);
  //grab the class category length
  allCategoryLength = Object.keys(currentClassComplete).length;
  let whatIfColumn1 = document.getElementById("whatIfColumn1");
  whatIfColumn1.innerHTML = "";
  //traverse and pouplate the whatIfSlider
  for (i = 0; i < allCategoryLength; i++) {
    //if # field in that category - # field completed = 0, then skip
    const currentCategory = Object.keys(currentClassComplete)[i];
    // If all fields in the current category are filled, then skip to the next iteration
    if (allGradeFilled(currentCategory)) {
      continue;
    }
    let catergorySliderDiv = document.createElement("div");
    catergorySliderDiv.className = "scrollbar";
    catergorySliderDiv.id = Object.keys(currentClassComplete)[i];
    whatIfColumn1.appendChild(catergorySliderDiv);
    let innerDivLabel = document.createElement("div");
    catergorySliderDiv.appendChild(innerDivLabel);
    let catergorySliderLabel = document.createElement("label");
    catergorySliderLabel.innerHTML = Object.keys(currentClassComplete)[i];
    catergorySliderLabel.for = "customRange" + (i + 1);
    innerDivLabel.appendChild(catergorySliderLabel);
    let innerDivInput = document.createElement("div");
    catergorySliderDiv.appendChild(innerDivInput);
    let catergorySlider = document.createElement("input");
    catergorySlider.type = "range";
    catergorySlider.min = "0";
    catergorySlider.max = "100";
    catergorySlider.value = "0";
    catergorySlider.className = "custom-range";
    catergorySlider.id = "customRange" + (i + 1);
    catergorySlider.step = "0.1";
    catergorySlider.oninput = (function (index) {
      return function () {
        const rangeInput = document.getElementById("customRange" + (index + 1));
        const scoreValue = document.getElementById("scoreValue" + (index + 1));
        scoreValue.innerHTML = rangeInput.value;
      };
    })(i);
    innerDivInput.appendChild(catergorySlider);
    let catergorySliderSpan = document.createElement("span");
    catergorySliderSpan.id = "scoreValue" + (i + 1);
    catergorySliderSpan.setAttribute(
      "name",
      Object.keys(currentClassComplete)[i] + "WhatifScore"
    );
    catergorySliderSpan.innerHTML = "0";
    innerDivInput.appendChild(catergorySliderSpan);
  }
}

//function to check if any field is null
function allGradeFilled(category) {
  let categoryCurrentData = currentClassGrades[category];
  let categoryCurrentLength = Object.keys(categoryCurrentData).length;

  let filled = true;
  for (let i = 0; i < categoryCurrentLength; i++) {
    // Use a local variable instead of the global one
    if (categoryCurrentData[Object.keys(categoryCurrentData)[i]] == null) {
      return false; // Return false as soon as a null value is found
    }
  }
  return filled;
}

function calculateWhatif() {
  let categoryList = Object.keys(currentClassComplete);
  let whatIfAllCategoryHashMap = {};
  for (let i = 0; i < categoryList.length; i++) {
    let currentCategory = categoryList[i];
    console.log(currentCategory);
    console.log(allGradeFilled(currentCategory));
    if (allGradeFilled(currentCategory) == true) {
      let categoryCurrentData = currentClassGrades[currentCategory];
      let categoryCurrentLength = Object.keys(categoryCurrentData).length;
      let categoryCurrentTotal = 0;
      for (let j = 0; j < categoryCurrentLength; j++) {
        categoryCurrentTotal +=
          categoryCurrentData[Object.keys(categoryCurrentData)[j]];
      }
      let categoryCurrentAverage =
        categoryCurrentTotal / categoryCurrentLength / 100;
      let categoryCurrentWeight = currentClassWeight[currentCategory];
      //sum of category current weight
      let categoryCurrentWeightTotal = 0;
      //sum of category current weight
      for (let k = 0; k < Object.keys(categoryCurrentWeight).length; k++) {
        categoryCurrentWeightTotal +=
          categoryCurrentWeight[Object.keys(categoryCurrentWeight)[k]];
      }
      totalCategoryScore = categoryCurrentAverage * categoryCurrentWeightTotal;
      whatIfAllCategoryHashMap[currentCategory] = totalCategoryScore;
    } else if (allGradeFilled(currentCategory) == false) {
      let categoryCurrentData = currentClassGrades[currentCategory];
      let categoryCurrentLength = Object.keys(categoryCurrentData).length;
      let categoryCurrentTotal = 0;
      let remainingField = 0;
      for (let j = 0; j < categoryCurrentLength; j++) {
        //if the field is not null, then add it to the total
        if (categoryCurrentData[Object.keys(categoryCurrentData)[j]] != null) {
          categoryCurrentTotal +=
            categoryCurrentData[Object.keys(categoryCurrentData)[j]];
        } else if (
          categoryCurrentData[Object.keys(categoryCurrentData)[j]] == null
        ) {
          remainingField += 1;
        }
      }
      whatIfScore = parseFloat(
        document.getElementsByName(currentCategory + "WhatifScore")[0].innerHTML
      );
      let whatIfSum = whatIfScore * remainingField;
      let categoryCurrentAverage =
        (categoryCurrentTotal + whatIfSum) / categoryCurrentLength / 100;
      let categoryCurrentWeight = currentClassWeight[currentCategory];
      //sum of category current weight
      let categoryCurrentWeightTotal = 0;
      //sum of category current weight
      for (let k = 0; k < Object.keys(categoryCurrentWeight).length; k++) {
        categoryCurrentWeightTotal +=
          categoryCurrentWeight[Object.keys(categoryCurrentWeight)[k]];
      }
      totalCategoryScore = categoryCurrentAverage * categoryCurrentWeightTotal;
      whatIfAllCategoryHashMap[currentCategory] = totalCategoryScore;
    }
  }
  console.log(whatIfAllCategoryHashMap);
  lengthOfCategory = Object.keys(whatIfAllCategoryHashMap).length;
  let totalWhatIfScore = 0;
  for (let i = 0; i < lengthOfCategory; i++) {
    totalWhatIfScore +=
      whatIfAllCategoryHashMap[Object.keys(whatIfAllCategoryHashMap)[i]];
  }
  console.log(currentClassGeneralData);
  //grab gradeScale from current class general data
  let gradeScale = currentClassGeneralData["gradeScale"];
  //convert all gradeScale value to number
  for (let i = 0; i < Object.keys(gradeScale).length; i++) {
    gradeScale[Object.keys(gradeScale)[i]] = parseFloat(
      gradeScale[Object.keys(gradeScale)[i]]
    );
  }
  //sort grade scale values from lowest to highest
  gradeScale = Object.fromEntries(
    Object.entries(gradeScale).sort(([, a], [, b]) => a - b)
  );
  //gradeScale hold the lowest threshold for each letter grade compare it to the current total score
  for (let i = 0; i < Object.keys(gradeScale).length; i++) {
    if (totalWhatIfScore >= gradeScale[Object.keys(gradeScale)[i]]) {
      var gradeLetter = Object.keys(gradeScale)[i];
      console.log(gradeScale[Object.keys(gradeScale)[i]]);
    }
  }

  let whatifGradeBoxValue = document.getElementById("whatIfGradeBoxValue");
  whatifGradeBoxValue.innerHTML = "";
  let totalScoreHtml = document.createElement("h3");
  totalScoreHtml.id = "whatIfTotalScoreHtml";
  totalScoreHtml.innerHTML = totalWhatIfScore.toFixed(2);
  let gradeLetterHtml = document.createElement("h3");
  gradeLetterHtml.id = "whatIfGradeLetterHtml";
  gradeLetterHtml.innerHTML = gradeLetter;

  whatifGradeBoxValue.appendChild(totalScoreHtml);
  whatifGradeBoxValue.appendChild(gradeLetterHtml);
}
