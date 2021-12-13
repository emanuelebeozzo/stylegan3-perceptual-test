import {obscureImage } from './common.js';

(function ($){
  let imagePath = "../../img/familiarization/test.png";

  $(document).ready(function() {
    $('#image').attr("src", imagePath);
    setTimeout(obscureImage, 3000);
  });

  $(document).ready(function() {
    $('#nextButton').click(function () {
      $(location).prop('href','startTest.html');
    });  
  });

}) (jQuery);

