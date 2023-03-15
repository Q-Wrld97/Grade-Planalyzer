//delcare a global variable to store the elements for later use
const elements = [];
// add event listeners so that before page load it will generate html elements
window.addEventListener('load', function() {
  auth.onAuthStateChanged(function(user) {
    //check if user is authenticated
    if (user) {
      //get the semester and courseName from the url
      var para = new URLSearchParams(window.location.search);
      var semester = para.get("semester");
      var courseName = para.get("courseName");
      let subCollectionName = ['exam','quiz','assignment','discussion','project','participation'];
      var userId = user.uid;
      dataChecker(semester, courseName, userId, subCollectionName); //populate html elments
    } else {
      //if user is not authenticated, redirect to the homepage
      window.location.href = "../../../index.html";
    }
  });
});

// await function to make sure it waits for the data to be retrieved before populating the html elements
async function dataChecker(semester, courseName, userId, subCollectionName) {
  const previousKeys = [];

  //for each categories in subCollectionName, it will check if there is any data in the database
  for (const subCollection of subCollectionName) {
    try {
      const snapshot = await db.collection('users').doc(userId).collection(semester).doc(courseName).collection(subCollection).get();
      // if empty pass, else populate the html elements
      if (snapshot.empty) {
        console.log('empty');
      } else {
        //generate label html elements
        const label = document.createElement('label');
        label.innerText = subCollection.slice(0, 1).toUpperCase() + subCollection.slice(1,subCollection.length).toLowerCase() + " Date";
        label.id = subCollection;
        document.getElementById(subCollection).appendChild(label);

        // go throught each document in the subcollection
        snapshot.forEach(doc => {
          const data = doc.data();
          //sort the keys in the data array in ascending order based on the number in the key
          const keys = Object.keys(data).sort((a, b) => {
            const [aStr, aNum] = a.match(/^(\D+)(\d+)$/).slice(1); //split the key into string and number
            const [bStr, bNum] = b.match(/^(\D+)(\d+)$/).slice(1); //split the key into string and number
            //compare the string and number and return the result
            if (aStr < bStr) {
              return -1;
            } else if (aStr > bStr) {
              return 1;
            } else {
              return parseInt(aNum) - parseInt(bNum);
            }
          });
         //for each key in the keys array, it will check if the key is already in the previousKeys array
          keys.forEach(key => {
            if (!previousKeys.includes(key)) {
              // create the div element
              const inputGroup = document.createElement('div');
              inputGroup.setAttribute('class', 'input-group mb-3');
              // create the div element
              const inputGroupPrepend = document.createElement('div');
              inputGroupPrepend.setAttribute('class', 'input-group-prepend');
              // create the span element
              const inputGroupText = document.createElement('span');
              inputGroupText.setAttribute('class', 'input-group-text');
              inputGroupText.innerText = key.slice(0, 1).toUpperCase() + key.slice(1,key.length).toLowerCase() + " Date"; //format the key to look nice
              // create the input element
              const input = document.createElement('input');
              input.setAttribute('type', 'text');
              input.setAttribute('name', key);
              input.setAttribute('class', 'form-control datepicker');
              input.setAttribute('id', key);
              input.setAttribute('placeholder', "yy-mm-dd");
              input.setAttribute('required', '');
              // append the elements to the html
              inputGroupPrepend.appendChild(inputGroupText);
              inputGroup.appendChild(inputGroupPrepend);
              inputGroup.appendChild(input);
              document.getElementById(subCollection).appendChild(inputGroup);
              //push the key to the previousKeys array so that it won't be repeated
              previousKeys.push(key);
              //push the input to the elements array so that it can be used later
              elements.push(key);
              //initialize the datepicker
              $( function() {
                $( ".datepicker" ).datepicker({
                  dateFormat: "yy-mm-dd",
                  beforeShow: function(input, inst) {
                    inst.dpDiv.css({
                      color: "black",
                      backgroundColor:"grey"
                    });
                  }
                });
              });
            }
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}


// create an async function to save the dates to the database
async function saveDates() {
  var para = new URLSearchParams(window.location.search);
  var semester = para.get("semester");
  var courseName = para.get("courseName");
  var userId = auth.currentUser.uid;
  var dataHashmap = {};
  
  // For each element in the elements array, grab its value and add it to the dataHashmap
  for (const element of elements) {
    data =  document.getElementById(element).value;
    dataHashmap[element] = data;
  }
  
  // Split the data into categories
  const categorizedData = Object.entries(dataHashmap).reduce((acc, [key, value]) => {
    const [category] = key.split(/\d+/); // split the key into category and name
    if (!acc[category]) acc[category] = {}; // create category if not exists
    acc[category][key] = value; // add the data to the corresponding category
    return acc;
  }, {});
   
  // Save the data for each category to the database
  for (const category in categorizedData) {
    try {
      // Save the data to the database
      await db.collection('users').doc(userId).collection(semester).doc(courseName).collection(category).doc(category+'Dates').set(categorizedData[category]);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Redirect the user to the dashboard after all the data has been saved to the database
  setTimeout(function() {window.location.href = "../../dashboard.html";}, 3000);
}

