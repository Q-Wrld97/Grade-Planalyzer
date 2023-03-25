/*Check user on auth state change*/
window.addEventListener('load', function() {
  auth.onAuthStateChanged(user => {
    if (user) {
      getSemester()
      return;
    } 
    else {
      window.location.href = "../Home/home.html";
    }
  });
});

//add data to drop down list
async function getSemester() {
  const semesterSelect = document.getElementById("semesterSelect");
  const userId = auth.currentUser.uid;
  const semesterRef = await db.collection('users').doc(userId).get()
  .then(doc => {
    if (doc.exists) {
       let semester = doc.data().semester;
       for(i=0 ; i<semester.length ; i++){
        // Create an option element
        const option = document.createElement("option");
        // Set the value of the option element
        option.value = semester[i];
        // Set the text of the option element
        option.text = semester[i];
        // Append the option element to the select element
        semesterSelect.appendChild(option);
      }
    } else {
      console.log("No such document!");
    }
  })
}

async function signOut() {
  await auth.signOut().then(function() {
    window.location.href = "../Home/home.html";
    }).catch(function(error) {
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

const currentWeatherItemsEl = document.getElementById('current-weather-items');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    //timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

   // dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 10000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        const API_KEY ='c78e07cb8ae9610397a15131d4cbbde5';
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;



    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="temp">${window.moment(day.dt * 1000).format('MMMM Do, YYYY')}</div>
                <br>
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="temp">${window.moment(day.dt * 1000).format('MMMM Do, YYYY')}</div>
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;F</div>
                <div class="temp">Day - ${day.temp.day}&#176;F</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

