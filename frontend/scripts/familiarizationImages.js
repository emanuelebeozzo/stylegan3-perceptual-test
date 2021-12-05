import {obscureImage, getUserId } from './common.js';

(function ($){
  let imagesPaths = ["../../img/familiarization/0.png", "../../img/familiarization/1.png", "../../img/familiarization/2.png",  "../../img/familiarization/3.png"];
  let index = 0;
  let userId = "";

  $(document).ready(function() {
      userId = getUserId();
      loadNewImage();
  });

  $(document).ready(function() {
    $('#nextButton').click(function () {
      //sendEval();
      $('#myRange').val(4);
      loadNewImage();
    });
  });

  function loadNewImage(){
    if(index < 4 && imagesPaths.length == 4) {
      console.log(imagesPaths[index])
      $('#image').attr("src", imagesPaths[index]);
      if(index == 3){
        $('#nextButton').html('End the familiarization and start the trial');
      }
      index++;
      $('#nextButton').attr('disabled', true); // TODO: evaluate if it is useful
      setTimeout(obscureImage, 3000);
    } else if (index == 4){
      $(location).prop('href','test.html?' + userId);
    }
  }

}) (jQuery);

