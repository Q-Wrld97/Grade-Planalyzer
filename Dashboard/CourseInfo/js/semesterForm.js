// animate img to disspear slowly and let the login form appear
$(window).bind('load', function () {
    var img = document.getElementById("loginImg");
    var opacity = 1;
    var timer = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(timer);
            img.style.display = "none";
        }
        img.style.opacity = opacity;
        opacity -= opacity * 0.1;
    }, 50);
});

document.getElementById('next-btn').addEventListener('click', function () {
    // Get the values from the form
    let semesterSeason = document.getElementById('semester-season').value;
    let semesterYear = document.getElementById('semester-year').value;
    let semesterStartingDate = document.getElementById('semester-starting-date').value;
    let semesterEndingDate = document.getElementById('semester-ending-date').value;

    // Log the values to the console
    console.log('Semester Season:', semesterSeason);
    console.log('Semester Year:', semesterYear);
    console.log('Semester Starting Date:', semesterStartingDate);
    console.log('Semester Ending Date:', semesterEndingDate);

    // You can add code here to submit the form or perform other actions with the form data
});