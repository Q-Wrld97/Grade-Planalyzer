// animate img to disspear slowly and let the login form appear
$(window).bind('load', function() {
  var img = document.getElementById("loginImg");
  var opacity = 1;
  var timer = setInterval(function(){
      if(opacity <= 0.1){
          clearInterval(timer);
          img.style.display = "none";
      }
      img.style.opacity = opacity;
      opacity -= opacity * 0.1;
  }, 50);
});
