// Preloader
$(window).on('load', function() {
    setTimeout(function() {
        $(".preloader").fadeOut("slow");
    }, 2000); // 2000ms = 2 seconds   
});

//reload page when resize to fix slider bugs
window.addEventListener('resize', function() {
    location.reload();
  });

//Slider simple left and right 

const slides = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slideWidth = document.querySelector(".slider").offsetWidth;
let slideIndex = 0;

function moveToSlide(index) {
  slides.style.transform = `translateX(-${slideWidth * index}px)`;
}

function handlePrevClick() {
if (slideIndex === 0) {
    slideIndex = slides.children.length - 1;
    } else {
    slideIndex--;
    }
    moveToSlide(slideIndex);
    slides.style.opacity = '100%';
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
      existingPopup.remove();
      
    }

}


function handleNextClick() {
if (slideIndex === slides.children.length - 1) {
    slideIndex = 0;
    } else {
    slideIndex++;
    }
    moveToSlide(slideIndex);
    slides.style.opacity = '100%';
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
      existingPopup.remove();
      
    }

}


prevBtn.addEventListener("click", handlePrevClick);
nextBtn.addEventListener("click", handleNextClick);

//slider window pop up

const images = document.querySelectorAll('.slides img');

images.forEach(image => {
  image.addEventListener('click', () => {
    // Remove any existing pop-up windows
    
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create the pop-up window
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const slides = document.querySelector(".slides");
    slides.style.opacity = '0%';

    // Create the image, header, and description elements
    const sliderimage = document.createElement('img');
    sliderimage.setAttribute('src', image.getAttribute('data-image'));
    const header = document.createElement('h2');
    header.textContent = image.getAttribute('data-header');
    const description = document.createElement('p');
    description.textContent = image.getAttribute('data-description');
    // Create and append the second description paragraph
    const newP = document.createElement('p');
    newP.textContent = image.getAttribute('data-description2');
    description.appendChild(newP);

    // Set the popup images, header and description styles
    sliderimage.style.width= '50vw';
    sliderimage.style.float= 'left';
    sliderimage.style.position = 'relative';

    
    description.style.color= 'white';
    description.style.float= 'right';
    description.style.width= '40vw';
    description.style.position = 'relative';


    header.style.color= 'white';
    header.style.float= 'right';
    header.style.width= '40vw';
    header.style.position = 'relative';
   



    // Add the image
    const left = document.createElement('div');
    left.classList.add('left');
    left.appendChild(sliderimage);
    popup.appendChild(left); //left container

    //Add header and description to the popup
    const right = document.createElement('div');
    right.classList.add('right');
    right.appendChild(header);    
    right.appendChild(description); 
    popup.appendChild(right); //right container

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'X';

    // Add the close button to the popup
    popup.appendChild(closeButton);

    // Set the close button styles
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.style.padding = '5px';
    closeButton.style.margin = '10px';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.color = 'red';
    closeButton.style.border = '2px solid red';
    closeButton.style.borderRadius = '0';
    closeButton.style.width = '20px';
    closeButton.style.height = '20px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
  

    // Set the pop-up window styles
    popup.style.position = 'fixed';
    popup.style.top = '55%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '95vw';
    popup.style.height = 'auto';
    popup.style.backgroundColor = '#333';
    popup.style.padding = '20px';
    popup.style.border = '2px solid #BF4047';

// // Add animation to the border
// popup.style.animation = 'pulse 20s ease-in-out infinite';

// // Define the pulse animation
// var style = document.createElement('style');
// style.innerHTML = `
//   @keyframes pulse {
//     0% {
//       border-color: red;
//     }
//     17% {
//       border-color: orange;
//     }
//     34% {
//       border-color: yellow;
//     }
//     51% {
//       border-color: green;
//     }
//     68% {
//       border-color: blue;
//     }
//     85% {
//       border-color: indigo;
//     }
//     100% {
//       border-color: violet;
//     }
//   }
// `;
// document.head.appendChild(style);

    // Add the event listener for the close button
    
    closeButton.addEventListener('click', () => {
      slides.style.opacity = '100%';
      popup.remove();
    });

    // Add the popup to the page
    document.body.appendChild(popup);
  });
});


//slider thumbnails

const thumbnailsContainer = document.createElement('div');
thumbnailsContainer.classList.add('thumbnails');

// Loop through all images and create thumbnails
images.forEach((image, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.classList.add('thumbnail');
  thumbnail.src = image.src;
  thumbnail.addEventListener('click', () => {
    slideIndex = index;
    slides.style.opacity = '100%';
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
      existingPopup.remove();
      
    }
    moveToSlide(slideIndex);
  });
  thumbnailsContainer.appendChild(thumbnail);
});

const slider = document.querySelector(".slider");
slider.appendChild(thumbnailsContainer);

//footer icon
var coll = document.getElementsByClassName("info-float");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });

}

//click and slide

  

//left and right arrow

window.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
    // Handle left arrow key down event
    setTimeout(function(){
        handlePrevClick();
    },100);
    } else if (e.keyCode === 39) {
    // Handle right arrow key down event
    setTimeout(function(){
        handleNextClick();
    },100);
    
    }
});




  