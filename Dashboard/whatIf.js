// generating value when user scroll the range to select values from 0 to 100

const rangeInput1 = document.getElementById('customRange1');
const scoreValue1 = document.getElementById('scoreValue1');

rangeInput1.addEventListener('input', function() {
  scoreValue1.textContent = rangeInput1.value;
});

const rangeInput2 = document.getElementById('customRange2');
const scoreValue2 = document.getElementById('scoreValue2');

rangeInput2.addEventListener('input', function() {
  scoreValue2.textContent = rangeInput2.value;
});

const rangeInput3 = document.getElementById('customRange3');
const scoreValue3 = document.getElementById('scoreValue3');

rangeInput3.addEventListener('input', function() {
  scoreValue3.textContent = rangeInput3.value;
});

const rangeInput4 = document.getElementById('customRange4');
const scoreValue4 = document.getElementById('scoreValue4');

rangeInput4.addEventListener('input', function() {
  scoreValue4.textContent = rangeInput4.value;
});

const rangeInput5 = document.getElementById('customRange5');
const scoreValue5 = document.getElementById('scoreValue5');

rangeInput5.addEventListener('input', function() {
  scoreValue5.textContent = rangeInput5.value;
});

//submit button functionality

const submitBtn = document.getElementById('submitButton');

submitBtn.addEventListener("click", () => {
    const score1 = parseInt(scoreValue1.innerText);
    const score2 = parseInt(scoreValue2.innerText);
    const score3 = parseInt(scoreValue3.innerText);
    const score4 = parseInt(scoreValue4.innerText);
    const score5 = parseInt(scoreValue5.innerText);

    const averageScore = (score1 + score2 + score3 + score4 + score5) / 5;

    console.log(`Class 1: ${score1}, Class 2: ${score2}, Class 3: ${score3}, Class 4: ${score4}, Class 5: ${score5}`);
    console.log(`Average Score: ${averageScore}`);

    const whatIfGradeBoxValue = document.querySelector('.whatIfGradeBoxValue');
    whatIfGradeBoxValue.innerHTML = `<h3>${averageScore.toFixed(2)}%</h3>`;
});

