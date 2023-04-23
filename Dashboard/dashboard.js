/*Check user on auth state change*/
window.addEventListener("load", function () {
  auth.onAuthStateChanged((user) => {
    if (user) {
      getSemester();
      return;
    } else {
      window.location.href = "../Home/home.html";
    }
  });
});

var globalWeight; //global variable to store the weights
var globalGeneralData; //global variable to store the general data
var globalDates; //global variable to store the dates
var globalGrades; // global variable to store the grades
var globalComplete; // global variable to store the completion statu

//event listener on load to pull global variable
window.addEventListener("load", async () => {

  // show the loading screen
  var progressBar = document.getElementById('preLoading');
  const preloader = document.querySelector('.preloader');
  preloader.style.display = 'flex';

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
});

//add data to drop down list
async function getSemester() {
  const semesterSelect = document.getElementById("semesterSelect");
  const userId = auth.currentUser.uid;
  const semesterRef = await db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let semester = doc.data().semester;
        for (i = semester.length - 1; i >= 0; i--) {
          // Create an option element
          const option = document.createElement("option");
          // Set the value of the option element
          option.value = semester[i];
          // Set the text of the option element
          option.text = semester[i];
          // Append the option element to the select element
          semesterSelect.appendChild(option);
        }
        const option = document.createElement("option");
        // Set the value of the option element
        option.value = "CourseInfo/html/semesterForm.html";
        // Set the text of the option element
        option.text = "Add New Semester";
        // add on click event to the option element
        semesterSelect.addEventListener("change", function () {
          if (semesterSelect.value === "CourseInfo/html/semesterForm.html") {
            window.location.href = semesterSelect.value;
          }
        });
        // Append the option element to the select element
        semesterSelect.appendChild(option);
      } else {
        console.log("No such document!");
      }
    });
}

// add event listner to the semester select
document
  .getElementById("semesterSelect")
  .addEventListener("change", async function () {

    var progressBar = document.getElementById('preLoading');
    progressBar.setAttribute('aria-valuenow', 25);
    progressBar.style.width = 25 + '%';
    
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'flex';

    //wait a second to make sure the user is logged in
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

    //// show progress bar at 100%
    progressBar.setAttribute('aria-valuenow', 100);
    progressBar.style.width = 100 + '%';
    // opening LookAhead tab

    // hide the loading screen
    preloader.style.display = 'none';
    //=======================
    // Get the element you want to click
    const elementToClick = document.getElementById('lookAheadIcon');

    // Create a new mouse event
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    // Dispatch the event on the element
    elementToClick.dispatchEvent(clickEvent);

    //==================

    return allCategoryTypeData;
  });

async function signOut() {
  await auth
    .signOut()
    .then(function () {
      window.location.href = "../Home/home.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("Sign out error");
    });
}

/* Tabs Section */
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

//=======================This Part is for LOOK AHEAD================================//

const currentWeatherItemsEl = document.getElementById("current-weather-items");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  //timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  // dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 10000);

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    const API_KEY = "c78e07cb8ae9610397a15131d4cbbde5";
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${
              day.weather[0].icon
            }@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="temp">${window
                  .moment(day.dt * 1000)
                  .format("MMMM Do, YYYY")}</div>
                <br>
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("dddd")}</div>
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            
            </div>
            
            `;
    } else {
      otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="temp">${window
                  .moment(day.dt * 1000)
                  .format("MMMM Do, YYYY")}</div>
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            
            `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForcast;
}
//=============================================
// code for empty section. if tab != clicked show the information for each tab
// and if tab  == cliked then show only the element that is inside that tab
// Get all elements with class "tab"
const tabs = document.querySelectorAll('.tab');

// Loop through each tab and add a click event listener
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Get all elements with class "dashboardEmptySection"
    const sections = document.querySelectorAll('.dashboardEmptySection');
    
    // Loop through each section and hide it
    sections.forEach(section => {
      section.style.display = 'none';
    });
  });
});
