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
}

