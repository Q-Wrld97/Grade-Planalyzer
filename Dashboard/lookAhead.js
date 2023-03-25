async function getLookAhead() {
  let userID = auth.currentUser.uid;
  let semester = document.getElementById("semesterSelect").value;
  let classes = await db
    .collection("users")
    .doc(userID)
    .collection(semester)
    .get();
  //grab all document from classes
  let classList = [];
  classes.forEach((doc) => {
    classList.push(doc.data().courseName);
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
  for (let i = 0; i < classList.length; i++) {
    allCategoryTypeData[classList[i]] = {};
    for (let j = 0; j < categoryList.length; j++) {
      individualClassCategory = await db
        .collection("users")
        .doc(userID)
        .collection(semester)
        .doc(classList[i])
        .collection(categoryList[j])
        .get();
      if (!individualClassCategory.empty) {
        allCategoryTypeData[classList[i]][categoryList[j]] = {};
        let categoryTypeData = allCategoryTypeData[classList[i]][categoryList[j]];
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
  return allCategoryTypeData
}

///////////////////////////////Filtering Start///////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function filterByWeek(data, currentDate) {
  let filteredData = {};
  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      filteredData[classKey][categoryKey] = {};
      for (let [itemKey, item] of Object.entries(data[classKey][categoryKey])) {
        let itemDate = new Date(item[`${categoryKey}Dates`].replace(/-/g, '/')); // parse with correct format
        let timeDiff = itemDate.getTime() - currentDate.getTime();
        let diffInDays = timeDiff / (1000 * 3600 * 24);
        if (diffInDays >= 0 && diffInDays < 7) {
          filteredData[classKey][categoryKey][itemKey] = {
            [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
            [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
            [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
          };
        }
      }
      if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
        delete filteredData[classKey][categoryKey];
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

function filterByWeek2(data, currentDate) {
  let filteredData = {};
  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      filteredData[classKey][categoryKey] = {};
      for (let [itemKey, item] of Object.entries(data[classKey][categoryKey])) {
        let itemDate = new Date(item[`${categoryKey}Dates`].replace(/-/g, '/')); // parse with correct format
        let timeDiff = itemDate.getTime() - currentDate.getTime();
        let diffInDays = timeDiff / (1000 * 3600 * 24);
        if (diffInDays >= 0 && diffInDays < 14) {
          filteredData[classKey][categoryKey][itemKey] = {
            [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
            [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
            [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
          };
        }
      }
      if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
        delete filteredData[classKey][categoryKey];
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}

function filterByWeek3(data, currentDate) {
  let filteredData = {};
  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      filteredData[classKey][categoryKey] = {};
      for (let [itemKey, item] of Object.entries(data[classKey][categoryKey])) {
        let itemDate = new Date(item[`${categoryKey}Dates`].replace(/-/g, '/')); // parse with correct format
        let timeDiff = itemDate.getTime() - currentDate.getTime();
        let diffInDays = timeDiff / (1000 * 3600 * 24);
        if (diffInDays >= 0 && diffInDays < 21) {
          filteredData[classKey][categoryKey][itemKey] = {
            [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
            [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
            [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
          };
        }
      }
      if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
        delete filteredData[classKey][categoryKey];
      }
    }
    if (Object.keys(filteredData[classKey]).length === 0) {
      delete filteredData[classKey];
    }
  }
  return filteredData;
}



function filterByWeek4(data, currentDate) {
  let filteredData = {};
  for (let classKey in data) {
    filteredData[classKey] = {};
    for (let categoryKey in data[classKey]) {
      filteredData[classKey][categoryKey] = {};
      for (let [itemKey, item] of Object.entries(data[classKey][categoryKey])) {
        let itemDate = new Date(item[`${categoryKey}Dates`].replace(/-/g, '/')); // parse with correct format
        let timeDiff = itemDate.getTime() - currentDate.getTime();
        let diffInDays = timeDiff / (1000 * 3600 * 24);
        if (diffInDays >= 0 && diffInDays < 28) {
          filteredData[classKey][categoryKey][itemKey] = {
            [`${categoryKey}Dates`]: item[`${categoryKey}Dates`],
            [`${categoryKey}Grades`]: item[`${categoryKey}Grades`],
            [`${categoryKey}Weight`]: item[`${categoryKey}Weight`],
          };
        }
      }
      if (Object.keys(filteredData[classKey][categoryKey]).length === 0) {
        delete filteredData[classKey][categoryKey];
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



//filtering by week length
async function weekLength(){
  let weeks = document.getElementById("weeks").value;
  let data = await getLookAhead();
  if (weeks == "Week1"){
    let currentDate = new Date();
    let filteredData = filterByWeek(data, currentDate);
    return filteredData;
  }
  else if (weeks == "Week2"){
    let currentDate = new Date();
    let filteredData = filterByWeek2(data, currentDate);
    return filteredData;
  }
  else if (weeks == "Week3"){
    let currentDate = new Date();
    let filteredData = filterByWeek3(data, currentDate);
    return filteredData;
  }
  else if (weeks == "Week4"){
    let currentDate = new Date();
    let filteredData = filterByWeek4(data, currentDate);
    return filteredData;
  }
}

//populate data on table
async function populateData() {
  let data = await weekLength();
  console.log(data);
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // clear the table body before repopulating it
  
  // create an array of items sorted by their deadline dates
  let items = [];
  for (let classKey in data) {
    for (let categoryKey in data[classKey]) {
      for (let itemKey in data[classKey][categoryKey]) {
        let item = data[classKey][categoryKey][itemKey];
        items.push({
          classKey: classKey,
          categoryKey: categoryKey,
          itemKey: itemKey,
          item: item,
          deadline: new Date(item[`${categoryKey}Dates`])
        });
      }
    }
  }
  items.sort((a, b) => a.deadline - b.deadline);
  
  // create table rows for each item in the sorted array
  let count = 0;
  for (let item of items) {
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
    deadlineTd.textContent = item.item[`${item.categoryKey}Dates`];
    let completionTd = document.createElement("td");
    let completionInput = document.createElement("input");
    completionInput.setAttribute("type", "checkbox");
    completionInput.setAttribute("id", `${item.classKey}-${item.categoryKey}-${item.itemKey}`);
    completionInput.setAttribute("name", `${item.classKey}-${item.categoryKey}-${item.itemKey}`);
    completionInput.setAttribute("value", "completed");
    completionTd.appendChild(completionInput);
    tr.appendChild(courseTd);
    tr.appendChild(assignmentTd);
    tr.appendChild(weightTd);
    tr.appendChild(deadlineTd);
    tr.appendChild(completionTd);
    tableBody.appendChild(tr);
  }

    // count number of items for each class
    let counts = {};
    for (let classKey in data) {
      let count = 0;
      for (let categoryKey in data[classKey]) {
        for (let itemKey in data[classKey][categoryKey]) {
          count++;
        }
      }
      counts[classKey] = count;
    }
 
// calculate weights for each category and class
let weights = {};
for (let classKey in data) {
  weights[classKey] = {};
  for (let categoryKey in data[classKey]) {
    let categoryWeight = 0;
    for (let itemKey in data[classKey][categoryKey]) {
      let item = data[classKey][categoryKey][itemKey];
      categoryWeight += parseFloat(item[`${categoryKey}Weight`]);
    }
    weights[classKey][categoryKey] = categoryWeight.toFixed(1);
  }
}

// calculate weights for each class
let classWeights = {};
for (let classKey in weights) {
  classWeights[classKey] = 0;
  for (let categoryKey in weights[classKey]) {
    let weight = parseFloat(weights[classKey][categoryKey]);
    classWeights[classKey] += weight;
  }
}

// normalize weights to get percentages
let totalWeight = 0;
for (let classKey in classWeights) {
  totalWeight += classWeights[classKey];
}
for (let classKey in classWeights) {
  classWeights[classKey] = ((classWeights[classKey] / totalWeight) * 100).toFixed(1);
}

console.log(classWeights);
      
  
    // create chart
    let chartData = {
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Number of Items',
          data: Object.values(classWeights),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  
    let pieChart = document.getElementById('pieChart');
    if (pieChart) {
      pieChart.remove();
    }

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'pieChart');
    document.getElementById('chartContainer').appendChild(canvas);
    let chart = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: chartData,
    });
}



