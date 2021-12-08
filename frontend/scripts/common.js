export {obscureImage, getUserId};

function obscureImage(){
  $('#image').attr("src","../../img/white.png");
  //$('#nextButton').attr('disabled', false); // TODO: evaluate if it is useful
}

function getUserId(){
  let address = $(location).prop('href');
  let userId = address.split("?")[1];
  console.log("Userid: " + userId);
  return userId;
}

