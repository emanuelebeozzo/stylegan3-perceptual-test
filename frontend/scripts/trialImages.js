import {obscureImage, getUserId } from './common.js';

(function ($){
  let imagesId = [];
  let index = 0;
  let userId = "";

  $(document).ready(function() {
    fetch('../api/images', {
      method: 'GET'
    })  
    .then((resp) => {
      if(resp.ok){
        return resp.json();
      }else{
        console.log("Error 500 or 405");
      }
    })
    .then((data) => {
      console.log(data);
      imagesId = data
      userId = getUserId();
      loadNewImage();
    })
  });

  $(document).ready(function() {
    $('#nextButton').click(function () {
      console.log(index);
      sendEval();
      index++;
      $('#sliderInput').val(4);
      loadNewImage();
    });
  });

  function loadNewImage(){
    if(index < 30 && imagesId.length == 30) {
      console.log("Carico img "+ index)
      fetch('../api/images/'+imagesId[index], {
        method: 'GET'
      })  
      .then((resp) => {
        if(resp.ok){
          return resp.json();
        }else{
          console.log("Error 500 or 405");
        }
      })
      .then((data) => {
        console.log(data);
        $('#progressImage').html("Image: "+(index+1)+"/30")
        $('#image').attr("src",data.path);
        if(index == 29){
          $('#nextButton').html('Submit the test');
        }
        $('#nextButton').attr('disabled', true); // TODO: evaluate if it is useful
        setTimeout(obscureImage, 3000);
      })
    } else if (index == 30){
      $(location).prop('href','conclusion.html');
    }
  }

  function sendEval(){
    let evaluationInput = $('#sliderInput').val();
    let userData = {
      user_id: userId,
      evaluation: evaluationInput
    }
    console.log(userData);
    fetch('../api/images/'+imagesId[index]+'/evaluations/', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      }
    })   
    .then((resp) => {
      if(resp.ok){
        return resp.json();
      }else{
        console.log("Error 500 or 405");
      }
    })
    .then((data) => {
      console.log("Eval id: " + data);
    })
  }

}) (jQuery);

