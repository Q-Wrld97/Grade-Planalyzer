
$(window).bind('load', function() {
  var img = document.getElementById("loginImg");
  var form = document.getElementsByClassName("box")[0];
  var opacity = 1;
  var timer = setInterval(function(){
      if(opacity <= 0.1){
          clearInterval(timer);
          img.style.display = "none";
          form.style.height = "620px";
      }
      img.style.opacity = opacity;
      opacity -= opacity * 0.1;
  }, 50);
  form.style.transition = "height 0.5s ease"; // add the transition property
});


