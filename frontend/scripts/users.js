(function ($){
  $(document).ready(function() {
    $('#formNickname').submit(function (event) {
      userData = {username: $('#nickname').val()}
      console.log(JSON.stringify(userData));
      fetch('../api/users/', {
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
        console.log(data);
        $(location).prop('href','pages/familiarization.html?' + data);
      })
      event.preventDefault();
    });
  });

}) (jQuery);
