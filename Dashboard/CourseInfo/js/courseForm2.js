// grab elements from the DOM
var exam = document.getElementById('exam');
var quiz = document.getElementById('quiz');
var assignment = document.getElementById('assignment');
var discussion = document.getElementById('discussion');
var project = document.getElementById('project');
var participation = document.getElementById('participation');

// add event listeners so that before page load it will generate html elements
window.addEventListener('load', function() {
  auth.onAuthStateChanged(function(user) {
    //check if user is authenticated
    if (user) {
      var para = new URLSearchParams(window.location.search);
      var semester = para.get("semester");
      var courseName = para.get("courseName");
      let subCollectionName = ['exam','quiz','assignment','discussion','project','participation'];
      var userId = user.uid;
      dataChecker(semester, courseName, userId, subCollectionName);
    } else {
      window.location.href = "../../../index.html";
    }
  });
});

async function dataChecker(semester, courseName, userId, subCollectionName) {
  const previousKeys = [];

  for (const subCollection of subCollectionName) {
    try {
      const snapshot = await db.collection('users').doc(userId).collection(semester).doc(courseName).collection(subCollection).get();
      if (snapshot.empty) {
        console.log('empty');
      } else {
        const label = document.createElement('label');
        label.innerText = subCollection;
        label.id = subCollection;
        document.getElementById(subCollection).appendChild(label);

        snapshot.forEach(doc => {
          const data = doc.data();
          const keys = Object.keys(data).sort();
          keys.forEach(key => {
            if (!previousKeys.includes(key)) {
              const inputGroup = document.createElement('div');
              inputGroup.setAttribute('class', 'input-group mb-3');

              const inputGroupPrepend = document.createElement('div');
              inputGroupPrepend.setAttribute('class', 'input-group-prepend');

              const inputGroupText = document.createElement('span');
              inputGroupText.setAttribute('class', 'input-group-text');
              inputGroupText.innerText = key.slice(0, 1).toUpperCase() + key.slice(1,key.length).toLowerCase() + " Date"; //format the key to look nice

              const input = document.createElement('input');
              input.setAttribute('type', 'text');
              input.setAttribute('name', key);
              input.setAttribute('class', 'form-control datepicker');
              input.setAttribute('id', key);
              input.setAttribute('placeholder', "yy-mm-dd");
              input.setAttribute('required', '');

              inputGroupPrepend.appendChild(inputGroupText);
              inputGroup.appendChild(inputGroupPrepend);
              inputGroup.appendChild(input);
              document.getElementById(subCollection).appendChild(inputGroup);

              previousKeys.push(key);

              $( function() {
                $( ".datepicker" ).datepicker({
                  dateFormat: "yy-mm-dd",
                  beforeShow: function(input, inst) {
                    inst.dpDiv.css({
                      marginLeft: input.offsetWidth + "px",
                      marginTop: -input.offsetHeight + "px",
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
