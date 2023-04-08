let addButton = document.querySelector(".course-square");
let container = document.querySelector(".courseInfoContainer");

addButton.addEventListener("click", function () {
  let newButton = document.createElement("div");
  newButton.classList.add("course-square", "added-course");
  newButton.innerHTML =
    '<i class="fa fa-book"></i><span>Course Name</span> <button class="edit-button">Edit</button> <button class="delete-button">Delete</button>';

  let deleteButton = newButton.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    newButton.remove();
  });

  container.prepend(newButton);
});

//grab data for course info
async function getCourseInfoForInfoTab() {
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
  for (i in classList) {
    let newButton = document.createElement("div");
    newButton.classList.add("course-square", "added-course");
    newButton.innerHTML =
      '<i class="fa fa-book"></i><span>' +
      classList[i] +
      '</span> <button class="edit-button">Edit</button> <button class="delete-button">Delete</button>';
    let deleteButton = newButton.querySelector(".delete-button");
    deleteButton.id = classList[i];
    deleteButton.addEventListener("click", async function () {
      //alert to confirm deletion
      const userConfirmationDelete = confirm(
        "Do you want to proceed with deleting?"
      );
      if (userConfirmationDelete) {
        newButton.remove();
        //delete all subcollections first
        let categoryList = [
          "exam",
          "quiz",
          "assignment",
          "discussion",
          "project",
          "participation",
        ];
        for (let i = 0; i < categoryList.length; i++) {
          const subcollectionRef = await db
            .collection("users")
            .doc(userID)
            .collection(semester)
            .doc(deleteButton.id)
            .collection(categoryList[i]);

          const documentsSnapshot = await subcollectionRef.get();

          // Delete documents one by one
          for (const doc of documentsSnapshot.docs) {
            await subcollectionRef.doc(doc.id).delete();
          }
        }
        //delete the whole course
        await db
          .collection("users")
          .doc(userID)
          .collection(semester)
          .doc(deleteButton.id)
          .delete();
      } else {
        //do nothing
      }
    });
    //edit button
    let editButton = newButton.querySelector(".edit-button");
    editButton.id = classList[i] + "edit";
    editButton.addEventListener("click", function () {
      const userConfirmationEdit = confirm(
        "Do you want to proceed with editing?"
      );
      if (userConfirmationEdit) {
        courseName = editButton.id.slice(0, -4);
        semesterSeason= semester.slice(0, -4);
        semesterYear = semester.replace(/\D/g, '');
        console.log(semesterYear);
        console.log(semesterSeason);
        //pass through the course name and semester to the edit page
        var para = new URLSearchParams();
        para.append("courseName", courseName);
        para.append("semesterSeason", semesterSeason);
        para.append("semesterYear", semesterYear);
      } else {
        //do nothing
      }
    });
    container.prepend(newButton);
  }
}

//event listener for the course info tab
document.getElementById("courseInfoIcon").addEventListener("click", (e) => {
  // Call the openTab function with the appropriate parameters
  openTab(event, "CourseInfo");
  // Call the populateCourseTab function
  getCourseInfoForInfoTab();
});
