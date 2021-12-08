import {getUserId } from './common.js';

(function ($){
  let userId = "";

  $(document).ready(function() {
    userId = getUserId();
    fetch('../api/users/' + userId + "/evaluations", {
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
    })
  });

}) (jQuery);

