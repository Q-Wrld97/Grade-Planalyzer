function addNewData(){
    
  //=================================================================================//
  //==========GRABBING COURSE LENGTH, TERM LENGTH AND CREDIT HOURS===================//
  //=================================================================================//
  courseName=document.getElementsByName('courseName')[0].value;
  termLength=document.getElementsByName('termLength')[0].value;
  creditHours=document.getElementsByName('creditHours')[0].value;

  //=================================================================================//
  //=================FETCHING DAYS OF THE WEEK THAT USER HAS CLASS===================//
  //=================================================================================//

  // Create an array to store the days that are checked
  let checkedDays = [];

  // Loop through each checkbox
  for (let i = 0; i < 8; i++) {
    // Get the checkbox element by its id
    let checkbox = document.getElementById(`day-${i}`);

    // If the checkbox is checked, add its value to the checkedDays array
    if (checkbox.checked) {
      checkedDays.push(checkbox.value);
    }
  }
  
  //=================================================================================//
  //=========================GRADE SCALE FUCNTION CHECK==============================//
  //=================================================================================//

  if (document.getElementById("customRadio1").checked){
    
    var gradeScale = {
      'A': '93',
      'A-': '92',
      'B+': '87',
      'B': '83',
      'B-': '82',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D+': '67',
      'D': '63',
      'D-': '60',
      'F': '0'
    };

  }

  else if (document.getElementById("customRadio2").checked){
    
    var gradeScale = {
      'A': '90',
      'A-': '87',
      'B+': '83',
      'B': '80',
      'B-': '77',
      'C+': '73',
      'C': '70',
      'C-': '67',
      'D+': '63',
      'D': '60',
      'F': '0'
    };

  }

  else if (document.getElementById("customRadio3").checked){
    

    var gradeScale = {
      'A': document.getElementsByName('A')[0].value,
      'A-': document.getElementsByName('A-')[0].value,
      'B+': document.getElementsByName('B+')[0].value,
      'B': document.getElementsByName('B')[0].value,
      'B-': document.getElementsByName('B-')[0].value,
      'C+': document.getElementsByName('C+')[0].value,
      'C': document.getElementsByName('C')[0].value,
      'C-': document.getElementsByName('C-')[0].value,
      'D+': document.getElementsByName('D+')[0].value,
      'D': document.getElementsByName('D')[0].value,
      'D-': document.getElementsByName('D-')[0].value,
      'F': document.getElementsByName('F')[0].value
    };
    
    //fuction check to see 
    //if the gradeSacle is not greater than the previos value and nuke it if its NULL

    let prevValue = Infinity; // Set to infinity to ensure that the first comparison will pass
    let prevKey = '';

    for (const key in gradeScale) {
      const value = parseInt(gradeScale[key]); // Convert value to integer for comparison

      if (!value || isNaN(value)) {
        delete gradeScale[key]; // Remove the key if value is empty or not a number
      } else {
        if (value > prevValue) {
          return alert(`Value for ${key} (${value}) is greater than previous value for ${prevKey} (${prevValue}).`);
          // Do something here to handle the case where the value is not decreasing
        }
        prevValue = value;
        prevKey = key;
      }
    }
  }

  else {
    return alert ("Invalid Input")
  }


  
  //=================================================================================//
  //=================FETCHING DAYS OF THE WEEK THAT USER HAS CLASS===================//
  //=================================================================================//



  if (document.getElementById("Exam").checked){
    
    var examWeight = {
      'examWeight': document.getElementById("CategoryYesExam").value,
      'examQuantity': document.getElementById("CategoryYesExam2").value,
      'perExamPercent': document.getElementById("CategoryYesExam").value / document.getElementById("CategoryYesExam2").value,  
    }
  }

  if (document.getElementById("Final").checked){
    
    var finalWeight = {
      'finalWeight': document.getElementById("CategoryYesFinal").value,
      'finalQuantity': document.getElementById("CategoryYesFinal2").value,
      'perFinalPercent': document.getElementById("CategoryYesFinal").value / document.getElementById("CategoryYesFinal2").value,  
    } 
  }

  if (document.getElementById("Midterm").checked){
    
    var midtermWeight = {
      'midtermWeight': document.getElementById("CategoryYesMidterm").value,
      'midtermQuantity': document.getElementById("CategoryYesMidterm2").value,
      'perMidtermPercent': document.getElementById("CategoryYesMidterm").value / document.getElementById("CategoryYesMidterm2").value,  
    }

  }

  if (document.getElementById("Quiz").checked){
    
    var quizWeight = {
      'quizWeight': document.getElementById("CategoryYesQuiz").value,
      'quizQuantity': document.getElementById("CategoryYesQuiz2").value,
      'perQuizPercent': document.getElementById("CategoryYesQuiz").value / document.getElementById("CategoryYesQuiz2").value,  
    }

  }

  if (document.getElementById("HW").checked){
    
    var hwWeight = {
      'hwWeight': document.getElementById("CategoryYesAssignment").value,
      'hwQuantity': document.getElementById("CategoryYesHW2").value,
      'perHWPercent': document.getElementById("CategoryYesHW").value / document.getElementById("CategoryYesHW2").value,  
    }

  }

  if (document.getElementById("Discussion").checked){
    
    var discussionWeight = {
      'discussionWeight': document.getElementById("CategoryYesDiscussion").value,
      'discussionQuantity': document.getElementById("CategoryYesDiscussion2").value,
      'perDiscussionPercent': document.getElementById("CategoryYesDiscussion").value / document.getElementById("CategoryYesDiscussion2").value,  
    }

  }
  
  if (document.getElementById("Project").checked){
    
    var projectWeight = {
      'projectWeight': document.getElementById("CategoryYesProject").value,
      'projectQuantity': document.getElementById("CategoryYesProject2").value,
      'perProjectPercent': document.getElementById("CategoryYesProject").value / document.getElementById("CategoryYesProject2").value,  
    }

  }

  if (document.getElementById("Participation").checked){
    
    var participationWeight = {
      'participationWeight': document.getElementById("CategoryYesParticipation").value,
      'participationQuantity': document.getElementById("CategoryYesParticipation2").value,
      'perParticipationPercent': document.getElementById("CategoryYesParticipation").value / document.getElementById("CategoryYesParticipation2").value,  
    }

  }

  let weightScale=[examWeight,finalWeight,midtermWeight,quizWeight,hwWeight,discussionWeight,projectWeight,participationWeight];

  


  //filter null and empty dictinary inside array
  weightScale = weightScale.filter(obj => obj && Object.keys(obj).length > 0);
  
  // checking weightScale add upto 100 

  let totalWeight = 0;

  weightScale.forEach((obj) => {
    for (const key in obj) {
      if (key.endsWith('Weight')) {
        totalWeight += parseInt(obj[key]);
      }
    }
  });

  if (totalWeight > 100 || totalWeight < 100) {
    return alert('The total weight for all categories exceeds or below 100%. Please adjust the weights accordingly.');
  }

  //we have to add a sub collection per weight catg 
  //====================================================================================//


  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.      
      alert(user.uid)
      alert(courseName)
      alert(termLength)  

      db.collection('users').doc(user.uid).collection('classes').doc(courseName).set({
        courseName: courseName,
        termLength: termLength,
        creditHours: creditHours,
        classDays: checkedDays,
        gradeScale: gradeScale,
        weightScale: weightScale
      }
      
      ).catch((error) => {
        // Firebase will use this to alert of its errors
        var error_message = error.message
    
        alert(error_message)
      })
      
    }
    else{
      window.location.href = "index.html"
    }
  });
 
} //)

//db.collection('users').doc(res.user.uid).collection('classes').update
// db.collection('users').doc(user.uid).update({
// db.collection('users').doc(res.user.uid).collection('classes').doc(courseName).set({