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
      getUserId();
      loadNewImage();
    })
  });

  $(document).ready(function() {
    $('#nextButton').click(function () {
      sendEval();
      $('#myRange').val(4);
      loadNewImage();
    });
  });

  function loadNewImage(){
    if(index < 30 && imagesId.length == 30) {
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
        $('#image').attr("src",data.path);
        if(index == 30){
          $('#nextButton').html('Submit the test');
        }
        $('#nextButton').attr('disabled', true); // TODO: evaluate if it is useful
        setTimeout(obscureImage, 3000);
      })
    } else if (index == 30){
      $(location).prop('href','conclusion.html');
    }
  }

  function obscureImage(){
    $('#image').attr("src","../../img/mmlab.png");
    $('#nextButton').attr('disabled', false); // TODO: evaluate if it is useful
  }

  function getUserId(){
    let address = $(location).prop('href');
    userId = address.split("?")[1];
    console.log("Userid: " + userId);
  }

  function sendEval(){
    let eval = $('#myRange').val();
    let userData = {
      user_id: userId,
      evaluation: eval
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
        index++;
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
