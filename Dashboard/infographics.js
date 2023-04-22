// Pie chart for column 1

new Chart(document.getElementById("pieChartInfo"), {
  type: "pie",
  data: {
    labels: ["SWE", "MAT", "COT", "CEN", "CNT"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        data: [10, 60, 30, 20, 80],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Pie Chart",
    },
    reponsive: true,
    legend: {
      position: "bottom",
    },
  },
});

//Line chart for column

const ctx = document.getElementById("barChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["SWE", "LAN", "DES", "COS", "TOC", "CNT"],
    datasets: [
      {
        label: "Classes",
        data: [12, 19, 3, 5, 2, 33],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Grab Data for Infographic
function getInfographicDataCheck() {
  if (
    globalGrades != undefined &&
    globalComplete != undefined &&
    globalWeight != undefined &&
    globalGeneralData != undefined &&
    globalDates != undefined
  ) {
    populateInfographicTabs()

    return;
  } else {
    getInfographicData();
    populateInfographicTabs()
  }
}

// Grab Data for Infographic
async function getInfographicData() {
  //if all global variables are undefined, then we need to get the data
  //wait a second to make sure the user is logged in
  await new Promise((r) => setTimeout(r, 1000));
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
  let allWeightTypeData = {};
  let generalData = {};
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
}


// populate tabs for Infographic
async function populateInfographicTabs() {
  if (globalGrades === undefined) {
    var data = await getInfographicData() ;
  } else {
    var data = globalGrades;
  }
  let courseList = extractKeys(data);
  let infographicTabs= document.getElementById("infographicTabs");


  for (let i = 0; i < courseList.length; i++) {
    let buttonId = "infographicClass" + i;

    // Check if a button with the specific ID already exists
    if (document.getElementById(buttonId) === null) {
      let course = document.createElement("button");
      course.className = "tablinks";
      course.innerHTML = courseList[i];
      course.id = buttonId;
      course.onclick = function () {
        // populate the infographic data
      };
      infographicTabs.appendChild(course);
    }
  }
}


//tabbing function for infographic
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

//pathing for infographic tab
document.getElementById("infographicIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(e, "Infographics");

  // Call the populateCourseTab function
  getInfographicDataCheck()

});

//populate infographic data for all tabs in the infographic tab
async function populateInfographicDataAllTab() {
  //check if data is avaiable
  if (
    globalGrades != undefined &&
    globalComplete != undefined &&
    globalWeight != undefined &&
    globalGeneralData != undefined &&
    globalDates != undefined
  ){
    //continue

  }
  else {
    getInfographicData()
  }

  compleleteData = globalComplete;
  datesData = globalDates;
  console.log(compleleteData)
  //go throught date data and complete data if an item is pass the date make complete data true
  for (let i = 0; i < Object.keys(datesData).length; i++) {
    let classData = datesData[Object.keys(datesData)[i]];
    for (let j = 0; j < Object.keys(classData).length; j++) {
      let categoryData = classData[Object.keys(classData)[j]];
      for (let k = 0; k < Object.keys(categoryData).length; k++) {
        let itemData = categoryData[Object.keys(categoryData)[k]];
        let date = new Date(itemData);
        let today = new Date();
        if (date < today) {
          compleleteData[Object.keys(datesData)[i]][
            Object.keys(classData)[j]
          ][Object.keys(categoryData)[k]] = true;
        }
      }
    }
  }
  

  // get how many item is completed and divide by total number of items base on classes
  for (let i = 0; i < Object.keys(compleleteData).length; i++) {
    let classData = compleleteData[Object.keys(compleleteData)[i]];
    let totalItems = 0;
    let completedItems = 0;
    for (let j = 0; j < Object.keys(classData).length; j++) {
      let categoryData = classData[Object.keys(classData)[j]];
      for (let k = 0; k < Object.keys(categoryData).length; k++) {
        let itemData = categoryData[Object.keys(categoryData)[k]];
        if (itemData === true) {
          completedItems++;
        }
        totalItems++;
      }
    }

  }

}