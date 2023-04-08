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
      const userConfirmation = confirm("Do you want to proceed with deleting?");
      if (userConfirmation) {
        newButton.remove();
        //delete from database
        await db.collection("users").doc(userID).collection(semester).doc(deleteButton.id).delete();
      } else {
        //do nothing
      }
    });
    container.prepend(newButton);
  }
}
