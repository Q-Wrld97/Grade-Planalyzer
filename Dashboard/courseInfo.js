let addButton = document.querySelector('.course-square');
let container = document.querySelector('.courseInfoContainer');

addButton.addEventListener('click', function() {
  let newButton = document.createElement('div');
  newButton.classList.add('course-square', 'added-course');
  newButton.innerHTML = '<i class="fa fa-book"></i><span>Course Name</span> <button class="edit-button">Edit</button> <button class="delete-button">Delete</button>';
  
  let deleteButton = newButton.querySelector('.delete-button');
  deleteButton.addEventListener('click', function() {
    newButton.remove();
  });
  
  container.prepend(newButton);
});