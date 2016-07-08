$( document ).ready(function() {
  $("textarea").on("keyup", function() {

    $("span.counter").text(function() {
      var characterCount = (140 - $('textarea').val().length);

      if (characterCount < 0) {
        $(this).css("color", "red")
        //$(this).css("color", "red");
      } else {
        $(this).css("color", "black");
      }
      return characterCount;
    });
  });


});

