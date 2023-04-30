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

    data = globalGrades;
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
          if (itemData !== null) {
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
    grandTotalCompleted = (grandTotalCompleted / grandTotalItems) * 100;
    grandTotalNotCompleted = (grandTotalNotCompleted / grandTotalItems) * 100;

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
    semesterDatesArray = userGeneralData["semesterStartAndEnd"];
    var startAndEnd;
    //go through arrayy and find the semester
    for (i = 0; i < semesterDatesArray.length; i++) {
      const targetKey = semester;
      const semesterDates = semesterDatesArray[i];
      if (semesterDates.hasOwnProperty(targetKey)) {
        startAndEnd = semesterDatesArray[i];
        break;
      } else {
        console.log("key not found");
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

    // Save courseDataTotal with date ranges in a dictionary
    const weeksDictionary = {};
    weeklyChunks.forEach((chunk, index) => {
      const weekKey = `Week ${index + 1}`;
      const weekValue = `${chunk[0]}||${chunk[chunk.length - 1]}`;
      weeksDictionary[weekKey] = weekValue;
    });

    console.log(weeksDictionary);

    //for each week range in week dictionary, check if the task date is in the range
    //if it is, add it to the output dictionary
    const weeklyAssignmentSplit = {};

    for (const week in weeksDictionary) {
      const weekRange = weeksDictionary[week];
      weeklyAssignmentSplit[week] = {};

      for (const course in currentDates) {
        weeklyAssignmentSplit[week][course] = {};

        for (const taskType in currentDates[course]) {
          weeklyAssignmentSplit[week][course][taskType] = {};

          for (const task in currentDates[course][taskType]) {
            const taskDate = currentDates[course][taskType][task];

            if (isDateInWeek(taskDate, weekRange)) {
              weeklyAssignmentSplit[week][course][taskType][task] = taskDate;
            }
          }

          // If no task found for the taskType, delete the empty object
          if (
            Object.keys(weeklyAssignmentSplit[week][course][taskType])
              .length === 0
          ) {
            delete weeklyAssignmentSplit[week][course][taskType];
          }
        }
      }
    }

    console.log(weeklyAssignmentSplit);
    //for each week in the output dictionary, replace the task date with the grade
    const weeklyAssignmentGradeSplit = JSON.parse(
      JSON.stringify(weeklyAssignmentSplit)
    );

    for (const week in weeklyAssignmentGradeSplit) {
      for (const course in weeklyAssignmentGradeSplit[week]) {
        for (const taskType in weeklyAssignmentGradeSplit[week][course]) {
          for (const task in weeklyAssignmentGradeSplit[week][course][
            taskType
          ]) {
            const grade = currentGrades[course][taskType][task];
            weeklyAssignmentGradeSplit[week][course][taskType][task] = grade;
          }
        }
      }
    }

    // go through weeklyAssignmentGradeSplit and remove any null tasks
    removeNullValues(weeklyAssignmentGradeSplit);
    removeEmptyObjects(weeklyAssignmentGradeSplit);
    console.log(weeklyAssignmentGradeSplit);

    //for each week in the output dictionary, replace the task date with the weight
    const weeklyAssignmentWeightSplit = JSON.parse(
      JSON.stringify(weeklyAssignmentSplit)
    );

    for (const week in weeklyAssignmentWeightSplit) {
      for (const course in weeklyAssignmentWeightSplit[week]) {
        for (const taskType in weeklyAssignmentWeightSplit[week][course]) {
          for (const task in weeklyAssignmentWeightSplit[week][course][
            taskType
          ]) {
            const weight = currentWeight[course][taskType][task];
            weeklyAssignmentWeightSplit[week][course][taskType][task] = weight;
          }
        }
      }
    }

    console.log(weeklyAssignmentWeightSplit);

    for (const week in weeklyAssignmentWeightSplit) {
      for (const class_name in weeklyAssignmentWeightSplit[week]) {
        for (const category in weeklyAssignmentWeightSplit[week][class_name]) {
          const taskNames = Object.keys(
            weeklyAssignmentWeightSplit[week][class_name][category]
          );
          for (const taskName of taskNames) {
            if (
              !weeklyAssignmentGradeSplit.hasOwnProperty(week) ||
              !weeklyAssignmentGradeSplit[week].hasOwnProperty(class_name) ||
              !weeklyAssignmentGradeSplit[week][class_name].hasOwnProperty(
                category
              ) ||
              !weeklyAssignmentGradeSplit[week][class_name][
                category
              ].hasOwnProperty(taskName)
            ) {
              delete weeklyAssignmentWeightSplit[week][class_name][category][
                taskName
              ];
            }
          }
        }
      }
    }

    removeEmptyObjects(weeklyAssignmentWeightSplit);
    console.log(weeklyAssignmentWeightSplit);

    carryOverTasks(weeklyAssignmentGradeSplit);
    carryOverTasks(weeklyAssignmentWeightSplit);
    console.log(weeklyAssignmentGradeSplit);
    console.log(weeklyAssignmentWeightSplit);
    /* For Each category in the course {
      currentCategorySum = sum of all graded score percentages in a category
      numGradedItems = #Num of fields with grades in that category
      sumGradedCatWeights = sum of individual weights for each graded field
      earnedCatWeight=((currentCategorySum/numGradedItems))/100*sumGradedCatWeights
      totalEarnedWeight += earnedCatWeight
      totalGradedCatWeights += sumGradedCatWeights
    */
    const courseDataTotal = {};

    for (const week in weeklyAssignmentGradeSplit) {
      courseDataTotal[week] = {};

      for (const class_name in weeklyAssignmentGradeSplit[week]) {
        if (!courseDataTotal[week].hasOwnProperty(class_name)) {
          courseDataTotal[week][class_name] = {
            totalEarnedWeight: 0,
            totalGradedCatWeights: 0,
          };
        }

        for (const category in weeklyAssignmentGradeSplit[week][class_name]) {
          let currentCategorySum = 0;
          let numGradedItems = 0;
          let sumGradedCatWeights = 0;

          for (const taskName in weeklyAssignmentGradeSplit[week][class_name][
            category
          ]) {
            const grade =
              weeklyAssignmentGradeSplit[week][class_name][category][taskName];
            const weight =
              weeklyAssignmentWeightSplit[week][class_name][category][taskName];

            currentCategorySum += grade;
            numGradedItems += 1;
            sumGradedCatWeights += weight;
          }

          const earnedCatWeight =
            (currentCategorySum / numGradedItems / 100) * sumGradedCatWeights;

          courseDataTotal[week][class_name].totalEarnedWeight +=
            earnedCatWeight;
          courseDataTotal[week][class_name].totalGradedCatWeights +=
            sumGradedCatWeights;
        }
      }
    }

    console.log("Weeks Data:", courseDataTotal);

    courseGPA = globalUserData.gpaScale;
    console.log(courseGPA);

    courseCreditHrs = {};

    for (const className in currentClassGeneral) {
      courseCreditHrs[className] = currentClassGeneral[className].creditHours;
    }

    console.log(courseCreditHrs);
    for (const course in courseCreditHrs) {
      const creditHours = parseInt(courseCreditHrs[course].match(/\d+/)[0], 10);
      courseCreditHrs[course] = creditHours;
    }
    console.log(courseCreditHrs);

    gradeScale = {};

    for (const class_name in currentClassGeneral) {
      gradeScale[class_name] = currentClassGeneral[class_name].gradeScale;
    }

    console.log("Grade Scale:", gradeScale);
    // Sort gradeScale in descending order
    for (let course in gradeScale) {
      let sortedGrades = Object.entries(gradeScale[course])
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      gradeScale[course] = sortedGrades;
    }

    // Sort courseGPA in descending order
    let sortedGPA = Object.entries(courseGPA)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    courseGPA = sortedGPA;

    /*
  courseGrade = (totalEarnedWeight / totalgradedCatWeights)*100
	courseGPA = Compare to scale to get the 0-4.0 number.
	courseCreditHrs = # credit hours for that course
	weightedGPAPts = (courseGPA*courseCreditHrs)
	totalWeightedGPAPts += weightedGPAPts
	totalCourseCreditHrs += courseCreditHrs
  */
    const courseGradeData = {};
    console.log(courseGPA);
    for (const week in courseDataTotal) {
      courseGradeData[week] = {};

      for (const class_name in courseDataTotal[week]) {
        const totalEarnedWeight =
          courseDataTotal[week][class_name].totalEarnedWeight;
        const totalGradedCatWeights =
          courseDataTotal[week][class_name].totalGradedCatWeights;

        const courseGrade = (totalEarnedWeight / totalGradedCatWeights) * 100;
        //compare courseGrade to gradeScale value to get back the key
        for (grade in gradeScale[class_name]) {
          if (courseGrade >= gradeScale[class_name][grade]) {
            letterCourseGrade = grade;
            break;
          }
        }
        const currentcourseGPA = courseGPA[letterCourseGrade];
        const currentCourseCreditHrs = courseCreditHrs[class_name];
        const weightedGPAPts =
          parseFloat(currentcourseGPA) * parseFloat(currentCourseCreditHrs);

        courseGradeData[week][class_name] = {
          courseCreditHrs: currentCourseCreditHrs,
          weightedGPAPts: weightedGPAPts,
        };
      }
    }
    let weeklyTotals = {};

    for (let week in courseGradeData) {
      let totalCreditHrs = 0;
      let totalWeightedPts = 0;
      for (let course in courseGradeData[week]) {
        totalCreditHrs += courseGradeData[week][course].courseCreditHrs;
        totalWeightedPts += courseGradeData[week][course].weightedGPAPts;
      }
      weeklyTotals[week] = {
        totalCreditHrs,
        totalWeightedPts,
      };
    }

    console.log(weeklyTotals);
    let GPAbyWeek = {};

    for (let week in weeklyTotals) {
      const totalWeightedPts = weeklyTotals[week].totalWeightedPts;
      const totalCreditHrs = weeklyTotals[week].totalCreditHrs;
      const GPA = totalWeightedPts / totalCreditHrs;
      GPAbyWeek[week] = GPA.toFixed(2);
    }

    console.log(GPAbyWeek);
    let GPAbyWeekWithDates = {};
    //replace the  week1- end of term to the actual week ranges
    for (let week in GPAbyWeek) {
      const GPA = GPAbyWeek[week];
      const dateRange = weeksDictionary[week];
      GPAbyWeekWithDates[dateRange] = GPA;
    }
    // remove the ending dates of each weeks
    for (let week in GPAbyWeekWithDates) {
      const newKey = week.split("|")[0].substring(5);
      GPAbyWeekWithDates[newKey] = GPAbyWeekWithDates[week];
      delete GPAbyWeekWithDates[week];
    }

    console.log(courseGPA);
    //iterate courseGPA store the first value in a variable call max and the last value in a variable call min
    let max = 0;
    let min = 0;
    for (let course in courseGPA) {
      if (max == 0) {
        max = courseGPA[course];
      }
      min = courseGPA[course];
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let week in GPAbyWeekWithDates) {
      const monthNum = Number(week.split("|")[0].substring(0, 2));
      const monthName = monthNames[monthNum - 1];
      const dayNum = week.split("|")[0].substring(3);
      const newKey = `${monthName} ${dayNum}`;
      GPAbyWeekWithDates[newKey] = GPAbyWeekWithDates[week];
      delete GPAbyWeekWithDates[week];
    }

    title = document.getElementById("rollingBar")

    title.innerHTML = "Weekly Rolling Semester GPA"

    console.log(GPAbyWeekWithDates);
    let barChart = document.getElementById("barChart");
    if (barChart) {
      barChart.remove();
    }

    let canvasBar = document.createElement("canvas");
    canvasBar.setAttribute("id", "barChart");
    document.getElementById("barChartSize").appendChild(canvasBar);

 // Define the data for the chart
const dataForBar = {
  labels: Object.keys(GPAbyWeekWithDates),
  datasets: [
    {
      label: "", // update label to an empty string
      data: Object.values(GPAbyWeekWithDates),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

// Define the options for the chart
const options = {
  scales: {
    y: {
      min: min,
      max: max,
      ticks: {
        stepSize: 0.5,
      },
    },
  
    
  },
  legend: {
    labels: {
      boxWidth: 0 } },
};

// Create the chart
const ctx = canvasBar.getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: dataForBar,
  options: options,
});


    // Calculate the overall grade for each class
    const [updatedGrades, updatedWeights, updatedDates] = removeNullTasks(currentGrades, currentWeight, currentDates);
    

    console.log(updatedGrades);
    console.log(updatedWeights);
    console.log(updatedDates);
    

    var [updatedGradesCurrently, updatedWeightsCurrently, updatedDatesCurrently] = removeUnpassedTasks(updatedGrades, updatedWeights, updatedDates);
    console.log("-----------------------------------------------------");
    console.log(updatedGradesCurrently);
    console.log(updatedWeightsCurrently);
    updatedGradesCurrently=removeEmptyValues(updatedGradesCurrently)
    updatedWeightsCurrently=removeEmptyValues(updatedWeightsCurrently)
    updatedWeightsCurrently=removeEmptyObjectsForLetter(updatedWeightsCurrently)
    updatedGradesCurrently=removeEmptyObjectsForLetter(updatedGradesCurrently)
    console.log(updatedGradesCurrently);
    console.log(updatedWeightsCurrently);

    
    const gradesWithWeightByClass = calculateGradesWithWeight(updatedGradesCurrently, updatedWeightsCurrently);
      
    console.log(gradesWithWeightByClass);


    const overallGrades = calculateOverallGrades(gradesWithWeightByClass);
    console.log(overallGrades);


    const letterGrades = getLetterGrades(overallGrades, gradeScale);
    console.log(letterGrades);
   //calculate potential grade


  //remove unpassed tasks
  var updatedGradesPotential =  currentGrades
  var updatedWeightsPotential = currentWeight

   

  console.log(updatedGradesPotential);
  console.log(updatedWeightsPotential);
  updateGradesPotential=removeEmptyObjectsForLetter(updatedGradesPotential)
  updatedWeightsPotential=removeEmptyObjectsForLetter(updatedWeightsPotential)
  //add 100 to all null tasks
  updatedGradesPotential = fillNullTasks(updatedGradesPotential, 100);
  console.log(updatedGradesPotential);
  //calculate grades with weight

  const gradesWithWeightByClassPotential = calculateGradesWithWeight(updatedGradesPotential, updatedWeightsPotential);

  console.log(gradesWithWeightByClassPotential);

  //calculate overall grades
  const overallGradesPotential = calculateOverallGrades(gradesWithWeightByClassPotential);
  console.log(overallGradesPotential);

  //calculate letter grades
  const letterGradesPotential = getLetterGrades(overallGradesPotential, gradeScale);
  console.log(letterGradesPotential);

    const tableBody = document.getElementById("tableBodyInfo");
    tableBody.innerHTML = "";

    for (const className in letterGrades) {
        const tr = document.createElement("tr");

        const classCell = document.createElement("td");
        classCell.textContent = className;
        tr.appendChild(classCell);

        const gradeCell = document.createElement("td");
        gradeCell.textContent = letterGrades[className];
        tr.appendChild(gradeCell);

        const potentialGradeCell = document.createElement("td");
        potentialGradeCell.textContent = letterGradesPotential[className];
        tr.appendChild(potentialGradeCell);

        tableBody.appendChild(tr);
    }

   
  



  });

  function removeEmptyObjectsForLetter(obj) {
    for (const classKey in obj) {
      const classObj = obj[classKey];
      for (const categoryKey in classObj) {
        if (Object.keys(classObj[categoryKey]).length === 0) {
          delete classObj[categoryKey];
        }
      }
    }
    return obj;
  }
  
  function removeEmptyValues(obj) {
    // Create a new object to store the non-empty values
    const newObj = {};
    
    // Loop through each key in the input object
    for (const key in obj) {
      // Check if the value is empty (i.e. an empty object or array)
      if (Object.keys(obj[key]).length === 0) {
        continue; // Skip to the next key
      }
      
      // Otherwise, add the key-value pair to the new object
      newObj[key] = obj[key];
    }
    
    // Return the new object without empty values
    return newObj;
  }

///////////function for all other course tab/////////////////
async function dataForTabs(course) {
  // Check if data is available
  if (globalGrades === undefined) {
    var data = await getInfographicData();
  } else {
    var data = globalGrades;
  }
  data = globalGrades;
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
        if (itemData !== null) {
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
          data: [
            (classTotals[course].completed / classTotals[course].total) * 100,
            (notCompleted / classTotals[course].total) * 100,
          ],
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
  semesterDatesArray = userGeneralData["semesterStartAndEnd"];
  var startAndEnd;
  //go through arrayy and find the semester
  for (i = 0; i < semesterDatesArray.length; i++) {
    const targetKey = semester;
    const semesterDates = semesterDatesArray[i];
    if (semesterDates.hasOwnProperty(targetKey)) {
      startAndEnd = semesterDatesArray[i];
      break;
    } else {
      console.log("key not found");
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

  // Save courseDataTotal with date ranges in a dictionary
  const weeksDictionary = {};
  weeklyChunks.forEach((chunk, index) => {
    const weekKey = `Week ${index + 1}`;
    const weekValue = `${chunk[0]}||${chunk[chunk.length - 1]}`;
    weeksDictionary[weekKey] = weekValue;
  });

  console.log(weeksDictionary);

  console.log(currentDates);

  const weeklyAssignmentSplit = {};

  for (const week in weeksDictionary) {
    const weekRange = weeksDictionary[week];
    weeklyAssignmentSplit[week] = {};

    for (const taskType in currentDates) {
      weeklyAssignmentSplit[week][taskType] = {};

      for (const task in currentDates[taskType]) {
        const taskDate = currentDates[taskType][task];

        if (isDateInWeek(taskDate, weekRange)) {
          weeklyAssignmentSplit[week][taskType][task] = taskDate;
        }
      }

      // If no task found for the taskType, delete the empty object
      if (Object.keys(weeklyAssignmentSplit[week][taskType]).length === 0) {
        delete weeklyAssignmentSplit[week][taskType];
      }
    }
  }
  console.log(weeklyAssignmentSplit);

  //for each week in the output dictionary, replace the task date with the grade
  const weeklyAssignmentGradeSplit = JSON.parse(
    JSON.stringify(weeklyAssignmentSplit)
  );

  for (const week in weeklyAssignmentGradeSplit) {
    for (const taskType in weeklyAssignmentGradeSplit[week]) {
      for (const task in weeklyAssignmentGradeSplit[week][taskType]) {
        const grade = currentGrades[taskType][task];
        weeklyAssignmentGradeSplit[week][taskType][task] = grade;
      }
    }
  }

  // go through weeklyAssignmentGradeSplit and remove any null tasks
  console.log(weeklyAssignmentGradeSplit);

  //for each week in the output dictionary, replace the task date with the weight
  const weeklyAssignmentWeightSplit = JSON.parse(
    JSON.stringify(weeklyAssignmentSplit)
  );

  for (const week in weeklyAssignmentWeightSplit) {
    for (const taskType in weeklyAssignmentWeightSplit[week]) {
      for (const task in weeklyAssignmentWeightSplit[week][taskType]) {
        const weight = currentWeight[taskType][task];
        weeklyAssignmentWeightSplit[week][taskType][task] = weight;
      }
    }
  }

  console.log(weeklyAssignmentWeightSplit);

  // go through weeklyAssignmentGradeSplit annd weeklyAssignmentWeightsplit and if any task is null in weeklyAssignmentGradeSplit, remove it from weeklyAssignmentWeightSplit and weeklyAssignmentGradeSplit
  for (const week in weeklyAssignmentGradeSplit) {
    for (const taskType in weeklyAssignmentGradeSplit[week]) {
      for (const task in weeklyAssignmentGradeSplit[week][taskType]) {
        const grade = weeklyAssignmentGradeSplit[week][taskType][task];
        if (grade === null) {
          delete weeklyAssignmentGradeSplit[week][taskType][task];
          delete weeklyAssignmentWeightSplit[week][taskType][task];
        }
      }
    }
  }
  console.log(weeklyAssignmentGradeSplit);
  console.log(weeklyAssignmentWeightSplit);
  // go through weeklyAssignmentGradeSplit and weeklyAssignmentWeightsplit and remove any empty objects
  removeEmptyObjectsForSingleCourse(weeklyAssignmentGradeSplit);
  removeEmptyObjectsForSingleCourse(weeklyAssignmentWeightSplit);
  console.log(weeklyAssignmentWeightSplit);
  console.log(weeklyAssignmentGradeSplit);
  removeInvalidEntries(weeklyAssignmentWeightSplit, weeklyAssignmentGradeSplit);
  const keys = Object.keys(weeklyAssignmentWeightSplit);
  // Iterate over the weeks, merging each previous week's assignments
// Iterate over the weeks, merging each previous week's assignments
for (let i = 1; i < keys.length; i++) {
  const currentWeekKey = keys[i];
  const prevWeekKey = keys[i - 1];

  // Add previous week's weight and grade to the current week
  mergeAssignments(
    weeklyAssignmentWeightSplit[currentWeekKey],
    weeklyAssignmentWeightSplit[prevWeekKey]
  );
  mergeAssignments(
    weeklyAssignmentGradeSplit[currentWeekKey],
    weeklyAssignmentGradeSplit[prevWeekKey]
  );
}
  

  console.log(
    "Updated weeklyAssignmentWeightSplit:",
    weeklyAssignmentWeightSplit
  );
  console.log(
    "Updated weeklyAssignmentGradeSplit:",
    weeklyAssignmentGradeSplit
  );
  
  removeInvalidEntries(weeklyAssignmentWeightSplit, weeklyAssignmentGradeSplit);

  console.log(
    "Updated weeklyAssignmentWeightSplit:",
    weeklyAssignmentWeightSplit
  );
  console.log(
    "Updated weeklyAssignmentGradeSplit:",
    weeklyAssignmentGradeSplit
  );


let weeklyCourseGrades = {};

for (const week in weeklyAssignmentWeightSplit) {
  let totalEarnedWeight = 0;
  let totalGradedCatWeights = 0;

  for (const category in weeklyAssignmentWeightSplit[week]) {
    let currentCategorySum = 0;
    let numGradedItems = 0;
    let sumGradedCatWeights = 0;

    for (const task in weeklyAssignmentWeightSplit[week][category]) {
      const weight = weeklyAssignmentWeightSplit[week][category][task];
      const grade = weeklyAssignmentGradeSplit[week][category][task];

      if (grade !== undefined) {
        currentCategorySum += grade;
        numGradedItems += 1;
        sumGradedCatWeights += weight;
      }
    }

    if (numGradedItems > 0) {
      const earnedCatWeight = ((currentCategorySum / numGradedItems) / 100) * sumGradedCatWeights;
      totalEarnedWeight += earnedCatWeight;
      totalGradedCatWeights += sumGradedCatWeights;
    }
  }

  const courseGrade = (totalEarnedWeight / totalGradedCatWeights) * 100;
  weeklyCourseGrades[week] = courseGrade;
}

console.log(weeklyCourseGrades);

let updatedWeeklyCourseGrades = {};

for (const key in weeklyCourseGrades) {
  if (weeksDictionary[key]) {
    updatedWeeklyCourseGrades[weeksDictionary[key]] = weeklyCourseGrades[key];
  }
}

console.log(updatedWeeklyCourseGrades);

for (const key in updatedWeeklyCourseGrades) {
  const newKey = key.split("||")[0].trim();
  const newValue = parseFloat(updatedWeeklyCourseGrades[key].toFixed(2));
  delete updatedWeeklyCourseGrades[key];
  updatedWeeklyCourseGrades[newKey] = newValue;
}

console.log(updatedWeeklyCourseGrades);

const monthNames = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};

const newWeeklyCourseGrades = {};

for (const [key, value] of Object.entries(updatedWeeklyCourseGrades)) {
  const dateParts = key.split('-');
  const newKey = `${monthNames[dateParts[1]]}-${dateParts[2]}`;
  newWeeklyCourseGrades[newKey] = value;
}

console.log(newWeeklyCourseGrades);

title = document.getElementById("rollingBar")

title.innerHTML = "Rolling Average Grade"

let barChart = document.getElementById("barChart");
if (barChart) {
  barChart.remove();
}

let canvasBar = document.createElement("canvas");
canvasBar.setAttribute("id", "barChart");
document.getElementById("barChartSize").appendChild(canvasBar);

// Define the data for the chart
const dataForBar = {
  labels: Object.keys(newWeeklyCourseGrades),
  datasets: [
    {
      label: "Grades",
      data: Object.values(newWeeklyCourseGrades),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

// Define the options for the chart
const options = {
  scales: {
    y: {
      min: 0,
      max: 100,

      ticks: {
        stepSize: 0.5,
      },
    },
  },
};

// Create the chart
const ctx = canvasBar.getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: dataForBar,
  options: options,
});





}

function isDateBeforeToday(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);
  return inputDate < currentDate;
}

function removeInvalidEntries(weightSplit, gradeSplit) {
  for (const week in weightSplit) {
    for (const category in weightSplit[week]) {
      for (const item in weightSplit[week][category]) {
        const grade = gradeSplit[week][category][item];
        if (grade === null || Number.isNaN(grade)) {
          delete weightSplit[week][category][item];
          delete gradeSplit[week][category][item];
        }
      }
    }
  }
}


function mergeAssignments(target, week) {
  Object.keys(week).forEach((category) => {
    if (!target.hasOwnProperty(category)) {
      target[category] = {};
    }
    Object.assign(target[category], week[category]);
  });
}

//helper function for rolling GPA
function isDateInWeek(dateStr, weekRange) {
  const date = new Date(dateStr);
  const [start, end] = weekRange.split("||").map((str) => new Date(str));

  return date >= start && date <= end;
}

//helper function to remove null task
function removeNullValues(data) {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (data[key] === null) {
        delete data[key];
      } else {
        removeNullValues(data[key]);
      }
    }
  }
}
function removeEmptyObjectsForSingleCourse(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      removeEmptyObjectsForSingleCourse(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
}

//help function to remove any empty object
function removeEmptyObjects(data) {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (
        typeof data[key] === "object" &&
        Object.keys(data[key]).length === 0
      ) {
        delete data[key];
      } else {
        removeEmptyObjects(data[key]);
      }
    }
  }
}

//helper function to calculate average of grades
function calculateAverages(data) {
  const averages = {};
  for (const className in data) {
    averages[className] = {};
    for (const category in data[className]) {
      const values = Object.values(data[className][category]);
      const validValues = values.filter((value) => value !== null);
      const sum = validValues.reduce((total, value) => total + value, 0);
      const average = sum / validValues.length / 100;
      averages[className][category] = average;
    }
  }
  return averages;
}

//helper function to calculate sums of weighted cat
function sumValidWeights(grades, weights) {
  const summedWeights = {};
  for (const className in grades) {
    summedWeights[className] = {};
    for (const category in grades[className]) {
      let sum = 0;
      for (const item in grades[className][category]) {
        if (grades[className][category][item] !== null) {
          sum += weights[className][category][item];
        }
      }
      summedWeights[className][category] = sum;
    }
  }
  return summedWeights;
}

function calculateWeightedAverages(avgGrades, catWeights) {
  const weightedAverages = {};
  for (const className in avgGrades) {
    weightedAverages[className] = {};
    for (const category in avgGrades[className]) {
      const product =
        avgGrades[className][category] * catWeights[className][category];
      weightedAverages[className][category] = product;
    }
  }
  return weightedAverages;
}

//Total Earn Weight
function sumNestedValues(data) {
  const summedValues = {};
  for (const className in data) {
    let sum = 0;
    for (const category in data[className]) {
      sum += data[className][category];
    }
    summedValues[className] = sum;
  }
  return summedValues;
}

function carryOverTasks(weeklyTaskSplit) {
  for (const week in weeklyTaskSplit) {
    const weekNumber = parseInt(week.split(" ")[1]);
    const nextWeek = "Week " + (weekNumber + 1);

    if (weeklyTaskSplit.hasOwnProperty(nextWeek)) {
      for (const class_name in weeklyTaskSplit[week]) {
        if (!weeklyTaskSplit[nextWeek].hasOwnProperty(class_name)) {
          weeklyTaskSplit[nextWeek][class_name] = {};
        }

        for (const category in weeklyTaskSplit[week][class_name]) {
          if (!weeklyTaskSplit[nextWeek][class_name].hasOwnProperty(category)) {
            weeklyTaskSplit[nextWeek][class_name][category] = {};
          }

          for (const taskName in weeklyTaskSplit[week][class_name][category]) {
            if (
              !weeklyTaskSplit[nextWeek][class_name][category].hasOwnProperty(
                taskName
              )
            ) {
              weeklyTaskSplit[nextWeek][class_name][category][taskName] =
                weeklyTaskSplit[week][class_name][category][taskName];
            }
          }
        }
      }
    }
  }
}

function fillNullTasks(grades, fillValue) {
  for (const className in grades) {
      for (const category in grades[className]) {
          for (const task in grades[className][category]) {
              if (grades[className][category][task] === null || Number.isNaN(grades[className][category][task])) {
                  grades[className][category][task] = fillValue;
              }
          }
      }
  }

  return grades;
}
function getLetterGrades(overallGrades, gradeScale) {
  const letterGrades = {};

  for (const className in overallGrades) {
      const grade = overallGrades[className];
      const scale = gradeScale[className];

      for (const letter in scale) {
          if (Math.floor(grade + 0.5) >= scale[letter]) {
              letterGrades[className] = letter;
              break;
          }
      }
  }

  return letterGrades;
}


function calculateGradesWithWeight(grades, weights) {
  const gradesWithWeightByClass = {};

  for (const className in grades) {
      gradesWithWeightByClass[className] = {};

      for (const category in grades[className]) {
          let totalWeight = 0;
          let weightedSum = 0;

          for (const task in grades[className][category]) {
              const grade = grades[className][category][task];
              const weight = weights[className][category][task];

              totalWeight += weight;
              weightedSum += grade * weight;
          }

          if (totalWeight > 0) {
              gradesWithWeightByClass[className][category] = weightedSum / totalWeight;
          } else {
              gradesWithWeightByClass[className][category] = 0;
          }
      }
  }

  return gradesWithWeightByClass;
}


function calculateOverallGrades(grades) {
const overallGrades = {};

for (const className in grades) {
    let total = 0;
    let numComponents = 0;

    for (const component in grades[className]) {
        total += grades[className][component];
        numComponents += 1;
    }

    overallGrades[className] = parseFloat((total / numComponents).toFixed(2));
}

return overallGrades;
}

function removeUnpassedTasks(grades, weights, dates) {
  const updatedGrades = JSON.parse(JSON.stringify(grades));
  const updatedWeights = JSON.parse(JSON.stringify(weights));
  const updatedDates = JSON.parse(JSON.stringify(dates));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const className in updatedDates) {
      for (const category in updatedDates[className]) {
          for (const task in updatedDates[className][category]) {
              const taskDate = new Date(updatedDates[className][category][task]);
              if (taskDate >= today) {
                  delete updatedGrades[className][category][task];
                  delete updatedWeights[className][category][task];
                  delete updatedDates[className][category][task];
              }
          }
      }
  }

  return [updatedGrades, updatedWeights, updatedDates];

}


function removeNullTasks(grades, weights, dates) {
  const updatedGrades = JSON.parse(JSON.stringify(grades));
  const updatedWeights = JSON.parse(JSON.stringify(weights));
  const updatedDates = JSON.parse(JSON.stringify(dates));

  for (const className in updatedGrades) {
      for (const category in updatedGrades[className]) {
          for (const task in updatedGrades[className][category]) {
              if (updatedGrades[className][category][task] === null) {
                  delete updatedGrades[className][category][task];
                  delete updatedWeights[className][category][task];
                  delete updatedDates[className][category][task];
              }
          }
      }
  }

  return [updatedGrades, updatedWeights, updatedDates];
}


/*
    avgCurrentGrades=calculateAverages(currentGrades)

    console.log(avgCurrentGrades)

    sumGradedCatWeights=sumValidWeights(currentGrades, currentWeight);

    console.log(sumGradedCatWeights)

    earnedCatWeights = calculateWeightedAverages(avgCurrentGrades, sumGradedCatWeights);

    console.log(earnedCatWeights)

    totalEarnedWeight  = sumNestedValues(earnedCatWeights)

    console.log(totalEarnedWeight)

    totalGradedCatWeights = sumNestedValues(sumGradedCatWeights)

    console.log(totalGradedCatWeights)
*/
