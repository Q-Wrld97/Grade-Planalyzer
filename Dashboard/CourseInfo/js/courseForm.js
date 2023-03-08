// Limit user input to 4 characters
function limitInputToFourCharacters(inputElement) {
  inputElement.addEventListener('input', function(event) {
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });
}

// Take An Input Element Id And Add An Event Listener To uppercase The Input and throw error when user use ALL as input
function addUpperCaseHandler(inputId) {
  const inputElement = document.getElementById(inputId);
  inputElement.addEventListener('input', function() {
    let cursorPosition = this.selectionStart;
    this.value = this.value.toUpperCase();
    this.setSelectionRange(cursorPosition, cursorPosition);  
  });
  //Error message when user use ALL as input
  inputElement.addEventListener('input', () => {
    if (/\b(all)\b/i.test(inputElement.value)) {
      document.getElementById('error1').style.display = 'block';
      document.getElementById('error1').style.color = 'red';
      inputElement.value = inputElement.value.replace(/\b(all)\b/i, '');
    } 
    else if(inputElement.value.length == 3){
      document.getElementById('error1').style.display = 'none';
    }
  });
}

// Check if remote is CHECKED than rest of the days must be UNCHECKED
function classDayCheck() {
  if (document.getElementById("day-7").checked === true) {
    // If Remote is checked, uncheck all other days
    for (let i = 0; i <= 6; i++) {
      document.getElementById(`day-${i}`).checked = false;
    }
  } else {
    // If a day of the week is checked, uncheck Remote
    document.getElementById("day-7").checked = false;
  }
}

// Check for the value of the radio button and display the text box or not
function yesnoCheck() {
  if (document.getElementById('customRadio3').checked) {
      document.getElementById('ifYes').style.display = 'block';
  }
  if (document.getElementById('customRadio2').checked) {
    document.getElementById('ifYes').style.display = 'none';
  }
  if (document.getElementById('customRadio1').checked) {
  document.getElementById('ifYes').style.display = 'none';
  }
}

// check if the checkbox is checked and display the text box or not
function GradeCategory() {
  const categories = [
    { id: 'Exam', suffix: 'Exam' },
    { id: 'Quiz', suffix: 'Quiz' },
    { id: 'Assignment', suffix: 'Assignment' },
    { id: 'Discussion', suffix: 'Discussion' },
    { id: 'Project', suffix: 'Project' },
    { id: 'Participation', suffix: 'Participation' }
  ];

  categories.forEach(category => {
    const checkbox = document.getElementById(category.id);
    const categoryYes = document.getElementById(`CategoryYes${category.suffix}`);
    const categoryYes2 = document.getElementById(`CategoryYes${category.suffix}2`);
    const categoryYes3 = document.getElementById(`CategoryYes${category.suffix}3`);
    const categoryYes4 = document.getElementById(`CategoryYes${category.suffix}4`);
    if (checkbox.checked) {
      categoryYes.style.display = 'block';
      categoryYes2.style.display = 'block';
      categoryYes3.style.display = 'block';
      categoryYes4.style.display = 'block';
    } else {
      categoryYes.style.display = 'none';
      categoryYes2.style.display = 'none';
      categoryYes3.style.display = 'none';
      categoryYes4.style.display = 'none';
    }
  });
}

// if equally weighted is no and quanity more than 1 than add the text box base on amount of quantity
function generateFields2(category) {
  const categoryIdMap = {
    Exam: {
      quantityContainerId: 'quantityContainer',
      categoryYes2Id: 'CategoryYesExam2',
      categoryYes4Id: 'CategoryYesExam4'
    },
    Quiz: {
      quantityContainerId: 'quantityContainer2',
      categoryYes2Id: 'CategoryYesQuiz2',
      categoryYes4Id: 'CategoryYesQuiz4'
    },
    Assignment: {
      quantityContainerId: 'quantityContainer3',
      categoryYes2Id: 'CategoryYesAssignment2',
      categoryYes4Id: 'CategoryYesAssignment4'
    },
    Discussion: {
      quantityContainerId: 'quantityContainer4',
      categoryYes2Id: 'CategoryYesDiscussion2',
      categoryYes4Id: 'CategoryYesDiscussion4'
    },
    Project: {
      quantityContainerId: 'quantityContainer5',
      categoryYes2Id: 'CategoryYesProject2',
      categoryYes4Id: 'CategoryYesProject4'
    },
    Participation: {
      quantityContainerId: 'quantityContainer6',
      categoryYes2Id: 'CategoryYesParticipation2',
      categoryYes4Id: 'CategoryYesParticipation4'
    }
  };

  const categoryId = categoryIdMap[category];
  const categoryYes2 = document.getElementById(categoryId.categoryYes2Id);
  const categoryYes4 = document.getElementById(categoryId.categoryYes4Id);
  if (categoryYes4.value == 'No' && categoryYes2.value > 1) {
    const quantityContainer = document.getElementById(categoryId.quantityContainerId);
    quantityContainer.style.display = 'block';
    quantityContainer.innerHTML = '';
    for (let i = 1; i <= categoryYes2.value; i++) {
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.id = `${category}${i}`;
      quantityInput.name = `${category}${i}`;
      quantityInput.placeholder = `${category}${i} %`;
      quantityInput.onchange = () => checkPercentage(category);
      quantityContainer.appendChild(quantityInput);
    }
  } else {
    const quantityContainer = document.getElementById(categoryId.quantityContainerId);
    quantityContainer.style.display = 'none';
  }  
}

// check if the sum of the text box is equal to the original percentage
function checkPercentage(category) {
  const originaPercent = document.getElementById(`CategoryYes${category}`);
  const quanity = document.getElementById(`CategoryYes${category}2`);
  const equallyWeighted = document.getElementById(`CategoryYes${category}4`);
  if (equallyWeighted.value == 'No' && quanity.value > 1) {
    let sum = 0;
    for (let i = 1; i <= quanity.value; i++) {
      const quantityInput = document.getElementById(`${category}${i}`);
      sum += Number(quantityInput.value);
    }
    if (sum != originaPercent.value) {
      document.getElementById(`error2`).style.display = 'block';
      document.getElementById(`error2`).style.color = 'red';
    } else {
      document.getElementById(`error2`).style.display = 'none';
    }
  }
}

