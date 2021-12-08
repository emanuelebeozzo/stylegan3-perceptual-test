import {obscureImage } from './common.js';

(function ($){
  let imagePath = "../../img/familiarization/test.png";

  $(document).ready(function() {
    $('#image').attr("src", imagePath);
    setTimeout(obscureImage, 3000);
  });

}) (jQuery);

