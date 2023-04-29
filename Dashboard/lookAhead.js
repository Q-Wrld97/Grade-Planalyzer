

///////////////////////////////Data Grabbing///////////////////////////////

async function getLookAhead() {
  let userID = auth.currentUser.uid;
  let semester = document.getElementById("semesterSelect").value;
  let classes = await db
    .collection("users")
    .doc(userID)
    .collection(semester)
    .get();
  //grab all document from classes
  let classList = {};
  classes.forEach((doc) => {
    classList[doc.data().courseName] = {
      creditHours: doc.data().creditHours,
    };
  });
  let categoryList = [
    "exam",
    "quiz",
    "assignment",
    "discussion",
    "project",
    "participation",
  ];
  //grabbing data for every Category Type for every class
  let allCategoryTypeData = {};
  for (let courseName in classList) {
    allCategoryTypeData[courseName] = {
      creditHours: classList[courseName]["creditHours"],
    };
    for (let j = 0; j < categoryList.length; j++) {
      individualClassCategory = await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(courseName)
        .collection(categoryList[j])
        .get();
      if (!individualClassCategory.empty) {
        allCategoryTypeData[courseName][categoryList[j]] = {};
        let categoryTypeData = allCategoryTypeData[courseName][categoryList[j]];
        individualClassCategory.forEach((doc) => {
          const docData = doc.data();
          for (let key in docData) {
            if (!categoryTypeData[key]) {
              categoryTypeData[key] = {};
            }
            categoryTypeData[key][doc.id] = docData[key];
          }
        });
      }
    }
  }
  console.log(allCategoryTypeData);
  return allCategoryTypeData;
}

///////////////////////////////Filtering Start///////////////////////////////
/////////////////////////////////////////////////////////////////////////////

async function filterByWeek(data, currentDate) {
  let filteredData = {};

  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      if (categoryKey === "creditHours") {
        filteredData[classKey][categoryKey] = data[classKey][categoryKey];
      } else {
        filteredData[classKey][categoryKey] = {};
        for (let [itemKey, item] of Object.entries(
          data[classKey][categoryKey]
        )) {
          let itemDate = new Date(
            item[`${categoryKey}Dates`].replace(/-/g, "/")
          ); // parse with correct format
          let timeDiff = itemDate.getTime() - currentDate.getTime();
          let diffInDays = timeDiff / (1000 * 3600 * 24);
          if (diffInDays >= 0 && diffInDays < 7) {
            filteredData[classKey][categoryKey][itemKey] = {
              [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
              [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
              [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
              [`${categoryKey}Complete`]: item[`${categoryKey}Complete`],
            };
          }
        }
        if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
          delete filteredData[classKey][categoryKey];
        }
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

async function filterByWeek2(data, currentDate) {
  let filteredData = {};

  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      if (categoryKey === "creditHours") {
        filteredData[classKey][categoryKey] = data[classKey][categoryKey];
      } else {
        filteredData[classKey][categoryKey] = {};
        for (let [itemKey, item] of Object.entries(
          data[classKey][categoryKey]
        )) {
          let itemDate = new Date(
            item[`${categoryKey}Dates`].replace(/-/g, "/")
          ); // parse with correct format
          let timeDiff = itemDate.getTime() - currentDate.getTime();
          let diffInDays = timeDiff / (1000 * 3600 * 24);
          if (diffInDays >= 0 && diffInDays < 14) {
            filteredData[classKey][categoryKey][itemKey] = {
              [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
              [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
              [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
              [`${categoryKey}Complete`]: item[`${categoryKey}Complete`],
            };
          }
        }
        if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
          delete filteredData[classKey][categoryKey];
        }
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

async function filterByWeek3(data, currentDate) {
  let filteredData = {};

  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      if (categoryKey === "creditHours") {
        filteredData[classKey][categoryKey] = data[classKey][categoryKey];
      } else {
        filteredData[classKey][categoryKey] = {};
        for (let [itemKey, item] of Object.entries(
          data[classKey][categoryKey]
        )) {
          let itemDate = new Date(
            item[`${categoryKey}Dates`].replace(/-/g, "/")
          ); // parse with correct format
          let timeDiff = itemDate.getTime() - currentDate.getTime();
          let diffInDays = timeDiff / (1000 * 3600 * 24);
          if (diffInDays >= 0 && diffInDays < 21) {
            filteredData[classKey][categoryKey][itemKey] = {
              [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
              [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
              [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
              [`${categoryKey}Complete`]: item[`${categoryKey}Complete`],
            };
          }
        }
        if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
          delete filteredData[classKey][categoryKey];
        }
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

async function filterByWeek4(data, currentDate) {
  let filteredData = {};

  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      if (categoryKey === "creditHours") {
        filteredData[classKey][categoryKey] = data[classKey][categoryKey];
      } else {
        filteredData[classKey][categoryKey] = {};
        for (let [itemKey, item] of Object.entries(
          data[classKey][categoryKey]
        )) {
          let itemDate = new Date(
            item[`${categoryKey}Dates`].replace(/-/g, "/")
          ); // parse with correct format
          let timeDiff = itemDate.getTime() - currentDate.getTime();
          let diffInDays = timeDiff / (1000 * 3600 * 24);
          if (diffInDays >= 0 && diffInDays < 28) {
            filteredData[classKey][categoryKey][itemKey] = {
              [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
              [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
              [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
              [`${categoryKey}Complete`]: item[`${categoryKey}Complete`],
            };
          }
        }
        if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
          delete filteredData[classKey][categoryKey];
        }
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

///////////////////////////END OF FILTERING/////////////////////////////
////////////////////////////////////////////////////////////////////////

async function weekLength() {
  let weeks = document.getElementById("weeks").value;
  let data = await getLookAhead();
  let currentDate = new Date();
  if (weeks == "Week1") {
    let filteredData = filterByWeek(data, currentDate);
    return filteredData;
  } else if (weeks == "Week2") {
    let filteredData = filterByWeek2(data, currentDate);
    return filteredData;
  } else if (weeks == "Week3") {
    let filteredData = filterByWeek3(data, currentDate);
    return filteredData;
  } else if (weeks == "Week4") {
    let filteredData = filterByWeek4(data, currentDate);
    return filteredData;
  }
}

///////////////////////////POPULATE DATA/////////////////////////////

async function populateData() {
  let data = await weekLength();
  console.log(data);
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // clear the table body before repopulating it

  // create an array of items sorted by their deadline dates
  let items = [];
  for (let classKey in data) {
    for (let categoryKey in data[classKey]) {
      // Skip processing creditHours
      if (categoryKey === "creditHours") {
        continue;
      }
      for (let itemKey in data[classKey][categoryKey]) {
        let item = data[classKey][categoryKey][itemKey];
        items.push({
          classKey: classKey,
          categoryKey: categoryKey,
          itemKey: itemKey,
          item: item,
          deadline: new Date(item[`${categoryKey}Dates`]),
        });
      }
    }
  }
  items.sort((a, b) => a.deadline - b.deadline);

  let count = 0;
  for (let item of items) {
    // check if the item is marked as complete, if it is, skip to the next item
    if (item.item[`${item.categoryKey}Complete`] === true) {
      continue;
    }

    // calculate the remaining days until the deadline
    let currentDate = new Date();
    let remainingDays = Math.ceil(
      (item.deadline - currentDate) / (1000 * 60 * 60 * 24)
    );

    count++;
    let tr = document.createElement("tr");
    tr.setAttribute("id", `tr${count}`);
    let courseTd = document.createElement("td");
    courseTd.textContent = item.classKey;
    let assignmentTd = document.createElement("td");
    assignmentTd.textContent = item.itemKey;
    let weightTd = document.createElement("td");
    weightTd.textContent = `${item.item[`${item.categoryKey}Weight`]}%`;
    let deadlineTd = document.createElement("td");
    deadlineTd.textContent = `${item.item[`${item.categoryKey}Dates`]
      } (${remainingDays} days left)`;
    let completionTd = document.createElement("td");
    let completionInput = document.createElement("input");
    completionInput.setAttribute("type", "checkbox");
    completionInput.setAttribute(
      "id",
      `${item.classKey}-${item.categoryKey}-${item.itemKey}`
    );
    completionInput.setAttribute("class", "completion");
    completionInput.setAttribute(
      "name",
      `${item.classKey}-${item.categoryKey}-${item.itemKey}`
    );
    completionInput.setAttribute("value", "completed");
    completionTd.appendChild(completionInput);
    tr.appendChild(courseTd);
    tr.appendChild(assignmentTd);
    tr.appendChild(weightTd);
    tr.appendChild(deadlineTd);
    tr.appendChild(completionTd);
    tableBody.appendChild(tr);
  }

  const pieChartData = calculatePieChartData(data);
  console.log(pieChartData);

  // create chart
  let chartData = {
    labels: Object.keys(pieChartData),
    datasets: [
      {
        label: "%",
        data: Object.values(pieChartData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let pieChart = document.getElementById("pieChart");
  if (pieChart) {
    pieChart.remove();
  }

  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "pieChart");
  document.getElementById("chartContainer").appendChild(canvas);
  let chart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: chartData,
  });
}
//CONFIRM BUTTON
document.getElementById("confirm").addEventListener("click", async function () {
  let data = Array.from(document.getElementsByClassName("completion"));
  console.log(data);
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].checked) {
      //update firestore with true
      let classKey = data[i].id.split("-")[0];
      let categoryKey = data[i].id.split("-")[1];
      let itemKey = data[i].id.split("-")[2];
      console.log(classKey, categoryKey, itemKey);
      //update firestore
      let userID = auth.currentUser.uid;
      let semester = document.getElementById("semesterSelect").value;
      await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(classKey)
        .collection(categoryKey)
        .doc(categoryKey + "Complete")
        .update({
          [itemKey]: true,
        });
      //delete the row from the table
      data[i].closest("tr").remove();
    }
  }
  reloadData()

});


function calculatePieChartData(data) {
  // todoCourseWeight 
  let weightedValues = {};
  for (let classKey in data) {
    weightedValues[classKey] = 0;
    for (let categoryKey in data[classKey]) {
      // Skip processing creditHours
      if (categoryKey === "creditHours") {
        continue;
      }
      for (let itemKey in data[classKey][categoryKey]) {
        let item = data[classKey][categoryKey][itemKey]; {
          weightedValues[classKey] += item[`${categoryKey}Weight`];
        }
      }
    }
  }
  // do the same thing but for CreditHours
  let creditHours = {};
  for (let classKey in data) {
    creditHours[classKey] = 0;
    for (let categoryKey in data[classKey]) {
      // Skip processing creditHours
      if (categoryKey === "creditHours") {
        const creditHoursString = data[classKey][categoryKey];
        const creditHoursInteger = parseInt(creditHoursString.replace(" Credits", ""));
        creditHours[classKey] = creditHoursInteger;
      }
    }
  }
  // todoRelativeWeight
  let weightedCreditHours = {};
  for (let classKey in weightedValues) {
    weightedCreditHours[classKey] = weightedValues[classKey] * creditHours[classKey];
  }
  // todoTotalWeight
  let totalWeightedCreditHours = 0;
  for (let classKey in weightedCreditHours) {
    totalWeightedCreditHours += weightedCreditHours[classKey];
  }
  // caculate percetnage by dividing todoRelativeWeight by todoTotalWeight
  let percentage = {};
  for (let classKey in weightedCreditHours) {
    percentage[classKey] = (weightedCreditHours[classKey] / totalWeightedCreditHours) * 100;
  }
  return percentage;

}


async function reloadData() {
  // show the loading screen
  var progressBar = document.getElementById('preLoading');
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'flex';
  progressBar.setAttribute('aria-valuenow', 25);
  progressBar.style.width = 25 + '%'
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

  // show progress bar at 50%
  progressBar.setAttribute('aria-valuenow', 50);
  progressBar.style.width = 50 + '%';

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

  // show progress bar at 75%
  progressBar.setAttribute('aria-valuenow', 75);
  progressBar.style.width = 75 + '%';

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

  // show progress bar at 100%
  progressBar.setAttribute('aria-valuenow', 100);
  progressBar.style.width = 100 + '%';
  // hide the loading screen
  preloader.style.display = 'none';

  return allCategoryTypeData;
}
///////////////////////////////////////////Generating Dates//////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function populateData() {

  var startDate = new Date(); // taking current date
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + 6);

  var selectedOption = document.getElementById("weeks").value; // get the value of the selected option from the dropdown

  if (selectedOption === "Week1") {  // if the user selects "Week1", set the start date to the current date and add 6 days to get the end date
    
   
  } else if (selectedOption === "Week2") {  // if the user selects "Week2", add 7 days to the current date to get the start date and add 6 days to get the end date
    startDate.setDate(startDate.getDate() + 7);
    endDate.setDate(startDate.getDate() + 6);

    if (startDate.getMonth() !== endDate.getMonth()) {
      endDate.setMonth(startDate.getMonth() + 1);
    }

  } else if (selectedOption === "Week3") {  // if the user selects "Week3", add 14 days to the current date to get the start date and add 6 days to get the end date
    startDate.setDate(startDate.getDate() + 14);
    endDate.setDate(startDate.getDate() + 6);

  } else if (selectedOption === "Week4") {  // if the user selects "Week4", add 21 days to the current date to get the start date and add 6 days to get the end date
    startDate.setDate(startDate.getDate() + 21);
    endDate.setDate(startDate.getDate() + 6);
  }

  var dateRangeElement = document.getElementById("date-range");
  var newDateRange = startDate.toLocaleDateString() + " to " + endDate.toLocaleDateString();
  dateRangeElement.innerText = newDateRange;
}



