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
      $('#results').html("Real images evaluated correctly: " + correctReal + "/" + realEval.length + " (" + correctReal/realEval.length*100 + "%) <br>" +
                         "Generated images evaluated correctly: " + correctGen + "/" + genEval.length + " (" + correctGen/genEval.length*100 + "%) <br>" + 
                         "Total images evaluated correctly: " +  (correctGen+correctReal) + "/" + (genEval.length+realEval.length) + " (" + (correctGen+correctReal)/(genEval.length+realEval.length)*100 + "%) <br>");
      partialChart(correctReal, correctGen);
      totalChart(correctGen+correctReal,30-(correctGen+correctReal))
    })

    fetch('../api/users/' + userId, {
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
      $('#user').html("User " + data.username);
    })
  });

  function countCorrectReal(){
    let count = 0;
    realEval.forEach(function(item){
      if(item < 4)
        count++;
    });
    return count;
  }

  function countCorrectGen(){
    let count = 0;
    genEval.forEach(function(item){
      if(item > 4)
        count++;
    });
    return count;
  }

  function partialChart(correctReal, correctGen){
    var xValues = ["Real", "Fake"];
    var yValues = [correctReal, correctGen];
    var barColors = ["blue","orange"];

    new Chart("partialChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
        display: true,
        text: "Real vs Fake"
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 15,
              beginAtZero: true
            }
          }]
        }
    }
    });
  }

  function totalChart(correct, wrong){
    var xValues = ["Correct", "Wrong"];
    var yValues = [correct, wrong];
    var barColors = [
    "#1e7145",
    "#b91d47"
    ];

    new Chart("totalChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
        display: true,
        text: "Total of right images"
        }
    }
    });
  }

}) (jQuery);

