$('.toggle-response').on('click', function() {
  $(this).toggleClass('open');
  $(this).next('.response').slideToggle();
});


