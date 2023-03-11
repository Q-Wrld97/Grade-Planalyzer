// grab elements from the DOM
var exam= document.getElementById('exam');
var quiz= document.getElementById('quiz');
var assignment= document.getElementById('assignment');
var discussion= document.getElementById('discussion');
var project= document.getElementById('project');
var participation= document.getElementById('participation');


// add event listeners so that before page load it will generate html elements
window.addEventListener('load', function() {
  auth.onAuthStateChanged(function(user) {
    //check if user is authenticated
    if (user) {


    }
    else {
      window.location.href = "../../../index.html";
    }
  
  
  
  
  
  });

});


function DataChecker() {
  categoryAssignment = db.collection('users').doc(user.uid).collection(semester).doc(courseName).collection(SubCollectionName[i]).get();
  categoryAssignment.then((snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.data().category == "Assignment") {
        
      }
      if (doc.data().category == "Discussion") {
        
      }
      if (doc.data().category == "Exam") {
        
      }
      if (doc.data().category == "Quiz") {
        
      }
      if (doc.data().category == "Project") {
        
      }
      if (doc.data().category == "Participation") {
        
      }
    });
  });
}
