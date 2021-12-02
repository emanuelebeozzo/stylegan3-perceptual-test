(function ($){
  let imagesId = []
  let index = 0

  $(document).ready(function() {
    $('#list').click(function () {
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
      })
    });

    $('#next').click(function () {
      if(index < 30 && imagesId.length == 30) {
        fetch('../api/images/'+imagesId[index], {
          method: 'GET'
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
          console.log(data);
          $('#img').attr("src",data.path);
        })
      }
    });
  });

}) (jQuery);
