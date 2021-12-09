import {getUserId } from './common.js';

(function ($){
  let userId = "";
  let realEval = [];
  let genEval = [];

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
      data["gen"].forEach(function(item){
        //console.log(item.evaluations_list[0].evaluation); 
        genEval.push(item.evaluations_list[0].evaluation)
      });  
      data["real"].forEach(function(item){
        //console.log(item.evaluations_list[0].evaluation); 
        realEval.push(item.evaluations_list[0].evaluation)
      }); 
      console.log(genEval);
      console.log(realEval);
      let correctReal = countCorrectReal();
      let correctGen = countCorrectGen();
      $('#results').html("Real images evalueted correctly: " + correctReal + "/" + realEval.length);
    })
  });

  function countCorrectReal(){
    let count = 0;
    realEval.forEach(function(item){
      if(item < 4)
        count++;
    });
  }

  function countCorrectGen(){
    let count = 0;
    genEval.forEach(function(item){
      if(item > 4)
        count++;
    });
  }

}) (jQuery);

