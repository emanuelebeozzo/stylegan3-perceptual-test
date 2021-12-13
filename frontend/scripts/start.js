(function ($){
  $(document).ready(function() {
    $('#startButton').click(function () {
      fetch('../api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })  
      .then((resp) => {
        if(resp.ok){
          return resp.json();
        }else{
          //console.log("Error 500 or 405");
        }
      })
      .then((data) => {
        //console.log(data);
        $(location).prop('href','test.html?' + data);
      })
    });
  });
}) (jQuery);