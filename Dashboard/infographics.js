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
    populateInfographicTabs();

    return;
  } else {
    getInfographicData();
    populateInfographicTabs();
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
    var data = await getInfographicData();
  } else {
    var data = globalGrades;
  }
  let courseList = extractKeys(data);
  //remove all tabs except the first one
  let infographicTabs = document.getElementById("infographicTabs");
  // Get the reference to the first child
  let firstChild = infographicTabs.firstElementChild;

  // Clear all tabs beside the first one
  while (infographicTabs.lastElementChild) {
    // Check if the current last child is the first child
    if (infographicTabs.lastElementChild === firstChild) {
      break;
    }

    // Remove the last child if it's not the first child
    infographicTabs.removeChild(infographicTabs.lastElementChild);
  }
  for (let i = 0; i < courseList.length; i++) {
    let buttonId = "infographicClass" + (i + 1);

    // Check if a button with the specific ID already exists
    if (document.getElementById(buttonId) === null) {
      let course = document.createElement("button");
      course.className = "tablinks";
      course.innerHTML = courseList[i];
      course.id = buttonId;
      course.onclick = function () {
        // populate the infographic data
        for (i = 0; i <= courseList.length; i++) {
          document.getElementById(
            "infographicClass" + i
          ).style.backgroundColor = "grey";
        }
        this.style.backgroundColor = "red";
        dataForTabs(this.innerHTML);
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
  getInfographicDataCheck();
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
  ) {
    //continue
  } else {
    getInfographicData();
  }

  compleleteData = globalComplete;
  datesData = globalDates;
  console.log(compleleteData);
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
          compleleteData[Object.keys(datesData)[i]][Object.keys(classData)[j]][
            Object.keys(categoryData)[k]
          ] = true;
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

// Create an event listener for the "All" button to turn red and populate data
document
  .getElementById("infographicClass0")
  .addEventListener("click", async function () {
    // Check if data is available
    if (globalGrades === undefined) {
      var data = await getInfographicData();
    } else {
      var data = globalGrades;
    }

    // Color the "All" button when clicked
    let courseList = extractKeys(data);
    for (let i = 0; i <= courseList.length; i++) {
      document.getElementById("infographicClass" + i).style.backgroundColor =
        "grey";
    }
    document.getElementById("infographicClass0").style.backgroundColor = "red";

    data = globalComplete;
    // Populate the infographic data for all tab
    // Loop through all the classes

    let classTotals = {};
    let grandTotalItems = 0;
    let grandTotalCompleted = 0;

    // Loop through all classes
    for (let i = 0; i < Object.keys(data).length; i++) {
      // Get the class name and its data
      let className = Object.keys(data)[i];
      let classData = data[className];

      // Initialize the dictionary for the current class if not already initialized
      if (!classTotals[className]) {
        classTotals[className] = { total: 0, completed: 0 };
      }

      // Loop through each category within the class
      for (let j = 0; j < Object.keys(classData).length; j++) {
        let categoryData = classData[Object.keys(classData)[j]];

        // Loop through each item within the category
        for (let k = 0; k < Object.keys(categoryData).length; k++) {
          let itemData = categoryData[Object.keys(categoryData)[k]];

          // If the item is completed, update the completed count in classTotals and grandTotalCompleted
          if (itemData === true) {
            classTotals[className].completed += 1;
            grandTotalCompleted += 1;
          }

          // Update the total count in classTotals and grandTotalItems
          classTotals[className].total += 1;
          grandTotalItems += 1;
        }
      }
    }

    // Log the results to the console
    console.log(classTotals);
    console.log("Grand Total Items:", grandTotalItems);
    console.log("Grand Total Completed:", grandTotalCompleted);

    // Calculate not completed items
    let grandTotalNotCompleted = grandTotalItems - grandTotalCompleted;

    let pieChart = document.getElementById("pieChartInfo");
    if (pieChart) {
      pieChart.remove();
    }

    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "pieChartInfo");
    document.getElementById("pieChartSize").appendChild(canvas);
    new Chart(document.getElementById("pieChartInfo"), {
      type: "pie",
      data: {
        labels: ["Completed", "Not Completed"],
        datasets: [
          {
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            data: [grandTotalCompleted, grandTotalNotCompleted],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Pie Chart - Completed vs. Not Completed",
        },
        responsive: true,
        legend: {
          position: "bottom",
        },
      },
    });
  completedWork = globalComplete;
  currentClassGeneral = globalGeneralData;
  currentGrades = globalGrades;
  currentDates = globalDates;
  currentWeight = globalWeight;

  semester = document.getElementById("semesterSelect").value;

  // call for all user general data
  userGeneralData = globalUserData;
  console.log(userGeneralData);
  //parsing out start and end date
  semesterDatesArray= userGeneralData["semesterStartAndEnd"]
  var startAndEnd
  //go through arrayy and find the semester
  for (i=0; i<semesterDatesArray.length; i++){
    const targetKey = semester
    const semesterDates = semesterDatesArray[i];
    if(semesterDates.hasOwnProperty(targetKey)){
      startAndEnd=semesterDatesArray[i]
      break
    }
    else{
      console.log("key not found")
    }
  }
  
  const dateRangeString = startAndEnd[semester];
  const dateSeparator = "||";
  const dates = dateRangeString.split(dateSeparator);
  const startDate = dates[0];
  const endDate = dates[1];

  console.log("Start date:", startDate);
  console.log("End date:", endDate);

  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);

  // Generate a list of dates between startDateFormat and endDateFormat
  const dateList = [];
  let currentDate = startDateFormat;
  while (currentDate <= endDateFormat) {
    dateList.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Split the dateList into chunks of 7 days
  const weeklyChunks = [];
  while (dateList.length) {
    weeklyChunks.push(dateList.splice(0, 7));
  }

  // Save weeks with date ranges in a dictionary
  const weeksDictionary = {};
  weeklyChunks.forEach((chunk, index) => {
    const weekKey = `Week ${index + 1}`;
    const weekValue = `${chunk[0]}-${chunk[chunk.length - 1]}`;
    weeksDictionary[weekKey] = weekValue;
  });

  console.log(weeksDictionary);

  //for each week range in week dictionary we want to find the number of assignments with grades !-null if it is remove from the dictionary
 

  });


//function for all other course tab
async function dataForTabs(course) {
  // Check if data is available
  if (globalGrades === undefined) {
    var data = await getInfographicData();
  } else {
    var data = globalGrades;
  }
  data = globalComplete;
  // Populate the infographic data for all tab
  // Loop through all the classes
  let classTotals = {};

  // Loop through all classes
  for (let i = 0; i < Object.keys(data).length; i++) {
    // Get the class name and its data
    let className = Object.keys(data)[i];
    let classData = data[className];

    // Initialize the dictionary for the current class if not already initialized
    if (!classTotals[className]) {
      classTotals[className] = { total: 0, completed: 0 };
    }

    // Loop through each category within the class
    for (let j = 0; j < Object.keys(classData).length; j++) {
      let categoryData = classData[Object.keys(classData)[j]];

      // Loop through each item within the category
      for (let k = 0; k < Object.keys(categoryData).length; k++) {
        let itemData = categoryData[Object.keys(categoryData)[k]];

        // If the item is completed, update the completed count in classTotals
        if (itemData === true) {
          classTotals[className].completed += 1;
        }

        // Update the total count in classTotals
        classTotals[className].total += 1;
      }
    }
  }

  // Log the results to the console
  console.log(classTotals);
  console.log(course);
  // Calculate not completed items
  let notCompleted = classTotals[course].total - classTotals[course].completed;
  // populate the pie chart
  let pieChart = document.getElementById("pieChartInfo");
  if (pieChart) {
    pieChart.remove();
  }

  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "pieChartInfo");
  document.getElementById("pieChartSize").appendChild(canvas);
  new Chart(document.getElementById("pieChartInfo"), {
    type: "pie",
    data: {
      labels: ["Completed", "Not Completed"],
      datasets: [
        {
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.5)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          data: [classTotals[course].completed, notCompleted],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pie Chart - Completed vs. Not Completed",
      },
      responsive: true,
      legend: {
        position: "bottom",
      },
    },
  });
  // grabbing data for rollin gpa
  completedWork = globalComplete[course];
  currentClassGeneral = globalGeneralData[course];
  currentGrades = globalGrades[course];
  currentDates = globalDates[course];
  currentWeight = globalWeight[course];



  console.log(completedWork);
  console.log(currentGrades);
  console.log(currentClassGeneral);
  console.log(currentDates);
  console.log(currentWeight);

  semester = document.getElementById("semesterSelect").value;

  // call for all user general data
  userGeneralData = globalUserData;
  console.log(userGeneralData);
  //parsing out start and end date
  semesterDatesArray= userGeneralData["semesterStartAndEnd"]
  var startAndEnd
  //go through arrayy and find the semester
  for (i=0; i<semesterDatesArray.length; i++){
    const targetKey = semester
    const semesterDates = semesterDatesArray[i];
    if(semesterDates.hasOwnProperty(targetKey)){
      startAndEnd=semesterDatesArray[i]
      break
    }
    else{
      console.log("key not found")
    }
  }
  
  const dateRangeString = startAndEnd[semester];
  const dateSeparator = "||";
  const dates = dateRangeString.split(dateSeparator);
  const startDate = dates[0];
  const endDate = dates[1];

  console.log("Start date:", startDate);
  console.log("End date:", endDate);

  const startDateFormat = new Date("2023-04-24");
  const endDateFormat = new Date("2023-05-06");

  // Generate a list of dates between startDateFormat and endDateFormat
  const dateList = [];
  let currentDate = startDateFormat;
  while (currentDate <= endDateFormat) {
    dateList.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Split the dateList into chunks of 7 days
  const weeklyChunks = [];
  while (dateList.length) {
    weeklyChunks.push(dateList.splice(0, 7));
  }

  // Save weeks with date ranges in a dictionary
  const weeksDictionary = {};
  weeklyChunks.forEach((chunk, index) => {
    const weekKey = `Week ${index + 1}`;
    const weekValue = `${chunk[0]}-${chunk[chunk.length - 1]}`;
    weeksDictionary[weekKey] = weekValue;
  });

  console.log(weeksDictionary);




  
  

  
}



