// $('.toggle-response').on('click', function () {
//   $(this).toggleClass('open');
//   $(this).next('.response').slideToggle();
// });


async function signOut() {
  await auth
    .signOut()
    .then(function () {
      window.location.href = "../../../../Home/home.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("Sign out error");
    });
}

// //To Do
// var firebaseConfig = {
//   // Your Firebase configuration goes here
// };
// firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();

// var form = document.getElementById("form");
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   var formData = new FormData(form);
//   var name = formData.get("name");
//   var category = formData.get("category");
//   var date = formData.get("date");
//   var time = formData.get("time");
//   var email = formData.get("email");
//   var comment = formData.get("comment");
//   var file = formData.get("file");
//   var storageRef = firebase.storage().ref();
//   var fileRef = storageRef.child(file.name);
//   fileRef.put(file).then(function (snapshot) {
//     console.log("File uploaded successfully");
//     fileRef.getDownloadURL().then(function (url) {
//       db.collection("users").add({
//         name: name,
//         category: category,
//         date: date,
//         time: time,
//         email: email,
//         comment: comment,
//         fileUrl: url
//       })

//         .then(function (docRef) {
//           console.log("Document written with ID: ", docRef.id);
//         })
//         .catch(function (error) {
//           console.error("Error adding document: ", error);
//         });
//     });
//   }).catch(function (error) {
//     console.error("Error uploading file: ", error);
//   });
// });