function addNewData(){
  

  //==========GRABBING SEMESTER COURSE LENGTH, TERM LENGTH AND CREDIT HOURS===================//
  semesterSeason=document.getElementById('semesterSeason').value;
  semesterYear=document.getElementById('semesterYear').value;
  semester=semesterSeason+semesterYear;
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
      'A': 93,
      'A-': 92,
      'B+': 87,
      'B': 83,
      'B-': 82,
      'C+': 77,
      'C': 73,
      'C-': 70,
      'D+': 67,
      'D': 63,
      'D-': 60,
      'F': 0
    };

  }

  else if (document.getElementById("customRadio2").checked){
    
    var gradeScale = {
      'A': 90,
      'A-': 87,
      'B+': 83,
      'B': 80,
      'B-': 77,
      'C+': 73,
      'C': 70,
      'C-': 67,
      'D+': 63,
      'D': 60,
      'F': 0
    };

  }

  else if (document.getElementById("customRadio3").checked){
    

    var gradeScale = {
      'A': parseFloat(document.getElementsByName('A')[0].value),
      'A-': parseFloat(document.getElementsByName('A-')[0].value),
      'B+': parseFloat(document.getElementsByName('B+')[0].value),
      'B': parseFloat(document.getElementsByName('B')[0].value),
      'B-': parseFloat(document.getElementsByName('B-')[0].value),
      'C+': parseFloat(document.getElementsByName('C+')[0].value),
      'C': parseFloat(document.getElementsByName('C')[0].value),
      'C-': parseFloat(document.getElementsByName('C-')[0].value),
      'D+': parseFloat(document.getElementsByName('D+')[0].value),
      'D': parseFloat(document.getElementsByName('D')[0].value),
      'D-': parseFloat(document.getElementsByName('D-')[0].value),
      'F': parseFloat(document.getElementsByName('F')[0].value)
    };
    
    //fuction check to see 
    //if the gradeSacle is not greater than the previous value and nuke it if its NULL

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



  if (document.getElementById("Exam").checked && document.getElementById("CategoryYesExam4").value=='Yes'){
    
    var examWeight = {
      'examWeight': document.getElementById("CategoryYesExam").value,
      'examQuantity': document.getElementById("CategoryYesExam2").value,
      'equallyWeighted': document.getElementById("CategoryYesExam4").value,
    }
    // make variable to store all exam quantity with blank value
    var examQuantity = document.getElementById("CategoryYesExam2").value;
    var perExamWeightData = document.getElementById("CategoryYesExam").value / document.getElementById("CategoryYesExam2").value  //this is the weight of each exam;
    // make a dictionary to store all exam and per exam weight with blank value
    var exam = {};
    var perExamWeight = {};
    var examComplete= {};
    for (let i=1; i <= examQuantity; i++){
      exam[`exam${i}`] = null;
      perExamWeight[`exam${i}`] = parseFloat(perExamWeightData);
      examComplete[`exam${i}`] = false;
    }
  }

  //if check and Weighted equally is no
  else if (document.getElementById("Exam").checked && document.getElementById("CategoryYesExam4").value =='No'){
    var examWeight = {
      'examWeight': document.getElementById("CategoryYesExam").value,
      'examQuantity': document.getElementById("CategoryYesExam2").value, 
      'equallyWeighted': document.getElementById("CategoryYesExam4").value,
     }
    // make variable to store all exam quantity with blank value
    var examQuantity = document.getElementById("CategoryYesExam2").value;
    // make a dictionary to store all exam with blank value
    var exam = {};
    var perExamWeight = {};
    var examComplete ={};
    for (let i=1; i <= examQuantity; i++){
      const perExamWeightData = document.getElementById(`Exam${i}`);
      exam[`exam${i}`] = null;
      perExamWeight[`exam${i}`] = parseFloat(perExamWeightData.value);
      examComplete[`exam${i}`] = false;
    }
  }

  if (document.getElementById("Quiz").checked && document.getElementById("CategoryYesQuiz4").value == "Yes"){
    
    var quizWeight = {
      'quizWeight': document.getElementById("CategoryYesQuiz").value,
      'quizQuantity': document.getElementById("CategoryYesQuiz2").value,
      'equallyWeighted': document.getElementById("CategoryYesQuiz4").value,  
    }
    // make variable to store all exam quantity with blank value
    var quizQuantity = document.getElementById("CategoryYesQuiz2").value;
    var perQuizWeightData = document.getElementById("CategoryYesQuiz").value / document.getElementById("CategoryYesQuiz2").value  //this is the weight of each exam;
    // make a dictionary to store all exam with blank value
    var quiz = {};
    var perQuizWeight = {};
    var quizComplete = {};
    for (let i=1; i <= quizQuantity; i++){
      quiz[`quiz${i}`] = null;
      perQuizWeight[`quiz${i}`] = parseFloat(perQuizWeightData);
      quizComplete[`quiz${i}`] = false;
    }
  }
  //if check and Weighted equally is no
  else if (document.getElementById("Quiz").checked && document.getElementById("CategoryYesQuiz4").value == "No"){
    var quizWeight = {
      'quizWeight': document.getElementById("CategoryYesQuiz").value,
      'quizQuantity': document.getElementById("CategoryYesQuiz2").value, 
      'equallyWeighted': document.getElementById("CategoryYesQuiz4").value,
     }
    // make variable to store all exam quantity with blank value
    var quizQuantity = document.getElementById("CategoryYesQuiz2").value;
    // make a dictionary to store all exam with blank value
    var quiz = {};
    var perQuizWeight = {};
    var quizComplete = {};
    for (let i=1; i <= quizQuantity; i++){
      const perQuizWeightData = document.getElementById(`Quiz${i}`).value;
      quiz[`quiz${i}`] = null;
      perQuizWeight[`quiz${i}`] = parseFloat(perQuizWeightData);
      quizComplete[`quiz${i}`] = false;
    }
  }

  if (document.getElementById("Assignment").checked && document.getElementById("CategoryYesAssignment4").value == "Yes"){
    
    var assignmentWeight = {
      'assignmentWeight': document.getElementById("CategoryYesAssignment").value,
      'assignmentQuantity': document.getElementById("CategoryYesAssignment2").value,
      'equallyWeighted': document.getElementById("CategoryYesAssignment4").value, 
    }
    // make variable to store all exam quantity with blank value
    var assignmentQuantity = document.getElementById("CategoryYesAssignment2").value;
    var perAssignmentWeightData = document.getElementById("CategoryYesAssignment").value / document.getElementById("CategoryYesAssignment2").value  //this is the weight of each exam;
    // make a dictionary to store all exam with blank value
    var assignment = {};
    var perAssignmentWeight = {};
    var assignmentComplete = {};
    for (let i=1; i <= assignmentQuantity; i++){
      assignment[`assignment${i}`] = null;
      perAssignmentWeight[`assignment${i}`] = parseFloat(perAssignmentWeightData);
      assignmentComplete[`assignment${i}`] = false;
    }
  }
  //if check and Weighted equally is no
  else if (document.getElementById("Assignment").checked && document.getElementById("CategoryYesAssignment4").value == "No"){
    var assignmentWeight = {
      'assignmentWeight': document.getElementById("CategoryYesAssignment").value,
      'assignmentQuantity': document.getElementById("CategoryYesAssignment2").value,
      'equallyWeighted': document.getElementById("CategoryYesAssignment4").value,
      }
    // make variable to store all exam quantity with blank value
    var assignmentQuantity = document.getElementById("CategoryYesAssignment2").value;
    // make a dictionary to store all exam with blank value
    var assignment = {};
    var perAssignmentWeight = {};
    var assignmentComplete = {};
    for (let i=1; i <= assignmentQuantity; i++){
      const perAssignmentWeightData = document.getElementById(`Assignment${i}`);
      assignment[`assignment${i}`] = null;
      perAssignmentWeight[`assignment${i}`] = parseFloat(perAssignmentWeightData.value);
      assignmentComplete[`assignment${i}`] = false;
    }
  }


  if (document.getElementById("Discussion").checked && document.getElementById("CategoryYesDiscussion4").value == "Yes"){
    
    var discussionWeight = {
      'discussionWeight': document.getElementById("CategoryYesDiscussion").value,
      'discussionQuantity': document.getElementById("CategoryYesDiscussion2").value,
      'equallyWeighted': document.getElementById("CategoryYesDiscussion4").value,
    }
    // make variable to store all exam quantity with blank value
    var discussionQuantity = document.getElementById("CategoryYesDiscussion2").value;
    var perDiscussionWeightData = document.getElementById("CategoryYesDiscussion").value / document.getElementById("CategoryYesDiscussion2").value  //this is the weight of each exam;
    // make a dictionary to store all exam with blank value
    var discussion = {};
    var perDiscussionWeight = {};
    var discussionComplete = {};
    for (let i=1; i <= discussionQuantity; i++){
      discussion[`discussion${i}`] = null;
      perDiscussionWeight[`discussion${i}`] = parseFloat(perDiscussionWeightData);
      discussionComplete[`discussion${i}`] = false;
    }


  }
  //if check and Weighted equally is no
  else if (document.getElementById("Discussion").checked && document.getElementById("CategoryYesDiscussion4").value == "No"){
    var discussionWeight = {
      'discussionWeight': document.getElementById("CategoryYesDiscussion").value,
      'discussionQuantity': document.getElementById("CategoryYesDiscussion2").value,
      'equallyWeighted': document.getElementById("CategoryYesDiscussion4").value,
      }
    // make variable to store all exam quantity with blank value
    var discussionQuantity = document.getElementById("CategoryYesDiscussion2").value;
    // make a dictionary to store all exam with blank value
    var discussion = {};
    var perDiscussionWeight = {};
    var discussionComplete = {};
    for (let i=1; i <= discussionQuantity; i++){
      const perDiscussionWeightData = document.getElementById(`Discussion${i}`);
      discussion[`discussion${i}`] = null;
      perDiscussionWeight[`discussion${i}`] = parseFloat(perDiscussionWeightData.value);
      discussionComplete[`discussion${i}`] = false;
    }
  }
  
  if (document.getElementById("Project").checked && document.getElementById("CategoryYesProject4").value =="Yes"){
    
    var projectWeight = {
      'projectWeight': document.getElementById("CategoryYesProject").value,
      'projectQuantity': document.getElementById("CategoryYesProject2").value,
      'equallyWeighted': document.getElementById("CategoryYesProject4").value,
    }
    // make variable to store all exam quantity with blank value
    var projectQuantity = document.getElementById("CategoryYesProject2").value;
    var perProjectWeightData = document.getElementById("CategoryYesProject").value / document.getElementById("CategoryYesProject2").value  //this is the weight of each exam;
    // make a dictionary to store all exam with blank value
    var project = {};
    var perProjectWeight = {};
    var projectComplete = {};
    for (let i=1; i <= projectQuantity; i++){
      project[`project${i}`] = null;
      perProjectWeight[`project${i}`] = parseFloat(perProjectWeightData);
      projectComplete[`project${i}`] = false;
    }

  }
  //if check and Weighted equally is no
  else if (document.getElementById("Project").checked && document.getElementById("CategoryYesProject4").value =="No"){
    var projectWeight = {
      'projectWeight': document.getElementById("CategoryYesProject").value,
      'projectQuantity': document.getElementById("CategoryYesProject2").value,
      'equallyWeighted': document.getElementById("CategoryYesProject4").value,
      }
    // make variable to store all exam quantity with blank value
    var projectQuantity = document.getElementById("CategoryYesProject2").value;
    // make a dictionary to store all exam with blank value
    var project = {};
    var perProjectWeight = {};
    var projectComplete = {};
    for (let i=1; i <= projectQuantity; i++){
      const perProjectWeightData = document.getElementById(`Project${i}`);
      project[`project${i}`] = null;
      perProjectWeight[`project${i}`] = parseFloat(perProjectWeightData.value);
      projectComplete[`project${i}`] = false;
    }
  }

  if (document.getElementById("Participation").checked && document.getElementById("CategoryYesParticipation4").value =="Yes"){
    
    var participationWeight = {
      'participationWeight': document.getElementById("CategoryYesParticipation").value,
      'participationQuantity': document.getElementById("CategoryYesParticipation2").value,
      'equallyWeighted': document.getElementById("CategoryYesParticipation4").value, 
    }
    // make variable to store all exam quantity with blank value
    var participationQuantity = document.getElementById("CategoryYesParticipation2").value;
    var perParticipationWeightData = document.getElementById("CategoryYesParticipation").value / document.getElementById("CategoryYesParticipation2").value  //this is the weight of each exam;
    // make a dictionary to store all exam with blank value
    var participation = {};
    var perParticipationWeight = {};
    var participationComplete = {};
    for (let i=1; i <= participationQuantity; i++){
      participation[`participation${i}`] = null;
      perParticipationWeight[`participation${i}`] = parseFloat(perParticipationWeightData);
      participationComplete[`participation${i}`] = false;
    }
  }
  //if check and Weighted equally is no
  else if (document.getElementById("Participation").checked && document.getElementById("CategoryYesParticipation4").value =="No"){
    var participationWeight = {
      'participationWeight': document.getElementById("CategoryYesParticipation").value,
      'participationQuantity': document.getElementById("CategoryYesParticipation2").value,
      'equallyWeighted': document.getElementById("CategoryYesParticipation4").value,
      }
    // make variable to store all exam quantity with blank value
    var participationQuantity = document.getElementById("CategoryYesParticipation2").value;
    // make a dictionary to store all exam with blank value
    var participation = {};
    var perParticipationWeight = {};
    var participationComplete = {};
    for (let i=1; i <= participationQuantity; i++){
      const perParticipationWeightData = document.getElementById(`Participation${i}`);
      participation[`participation${i}`] = null;
      perParticipationWeight[`participation${i}`] = parseFloat(perParticipationWeightData.value);
      participationComplete[`participation${i}`] = false;
    }
  }

  let weightScale=[examWeight,quizWeight,assignmentWeight,discussionWeight,projectWeight,participationWeight];

  let SubCollectionName = ['exam','quiz','assignment','discussion','project','participation'];

  let SubCollectionQuantity = [exam,quiz,assignment,discussion,project,participation];

  let SubCollectionPerWeight = [perExamWeight,perQuizWeight,perAssignmentWeight,perDiscussionWeight,perProjectWeight,perParticipationWeight];

  let SubCollectionComplete = [examComplete,quizComplete,assignmentComplete,discussionComplete,projectComplete,participationComplete];

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
  alert(totalWeight)
  if (totalWeight > 100 || totalWeight < 100) {
    return alert('The total weight for all categories exceeds or below 100%. Please adjust the weights accordingly.');
  }

  //we have to add a sub collection per weight catg 
  //====================================================================================//


  auth.onAuthStateChanged(async function(user) {
    if (user) {
      alert(weightScale)
      // User is signed in.      
     await db.collection('users').doc(user.uid).collection(semester).doc(courseName).set({
        courseName: courseName,
        termLength: termLength,
        creditHours: creditHours,
        classDays: checkedDays,
        gradeScale: gradeScale,
        weightScale: weightScale,
      } ,

     await db.collection('users').doc(user.uid).update({
        semester: firebase.firestore.FieldValue.arrayUnion(semester)
        
      })

      // now we have to add a sub collection per category
      ).then(async () => {
        
        for (i=0; i < SubCollectionName.length; i++){
          //check condition for any sub collection that is not null
          if (SubCollectionQuantity[i] != null){
            //add sub collection
          await  db.collection('users').doc(user.uid).collection(semester).doc(courseName).collection(SubCollectionName[i]).doc(SubCollectionName[i]+'Grades').set(
              SubCollectionQuantity[i]
            )
          await  db.collection('users').doc(user.uid).collection(semester).doc(courseName).collection(SubCollectionName[i]).doc(SubCollectionName[i]+'Weight').set(
              SubCollectionPerWeight[i]
            )
          await db.collection('users').doc(user.uid).collection(semester).doc(courseName).collection(SubCollectionName[i]).doc(SubCollectionName[i]+'Complete').set(
              SubCollectionComplete[i]
            )
          }  
        }
      }).then(() => {
        var para = new URLSearchParams();
        para.append("courseName", courseName);
        para.append("semester", semester);

        //make it wait 2 second before redirecting to the next page
        setTimeout(function(){window.location.href = "../html/courseForm2.html?" + para.toString();}, 2000);
      }
      ).catch((error) => {
        // Firebase will use this to alert of its errors
        var error_message = error.message
    
        alert(error_message)
      })
      
    }
    else{
      window.location.href =  window.location.href = "../../../index.html";
    }
  });
 
}