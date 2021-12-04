/* let images=["../mmlab.png", "../lol.jpg", "../../img/ffhq/18366.png", "../../img/ffhq/18509.png"];
let index=1;
let tmp=0;

function firstLoad(){
    disableButton();
    document.getElementById("image").src=images[index];
    setTimeout(function(){document.getElementById("image").src=images[tmp]; tmp=1;},3000);
}

//function to hide image after 3 seconds
function timeoutImage(){
    if(index<images.length){
        document.getElementById("image").src=images[index];
        if (index>0){
            tmp=index;
            index=0;
        }
        setTimeout(timeoutImage, 3000);
    }else window.alert("End of images");
}

//function to send data and change image
function nextImage(){
    sendData(document.getElementById("myRange").value);
    index=tmp;
    index++;
    document.getElementById("myRange").value=4;
    disableButton();
    timeoutImage();
}

// Disable the button to prevent instantanious clicks
function disableButton(){
    document.getElementById("nextButton").disabled = true;
    setTimeout(function(){document.getElementById("nextButton").disabled = false;},3000);
}

function sendData(value){

} */

/* const range = document.getElementById('range'), rangeV = document.getElementById('rangeV'),
  setValue = ()=>{
    const
      newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue); */

/* $('input[type="range"]').on('input', function() {

    var control = $(this),
      controlMin = control.attr('min'),
      controlMax = control.attr('max'),
      controlVal = control.val(),
      controlThumbWidth = control.data('thumbwidth');
  
    var range = controlMax - controlMin;
    
    var position = ((controlVal - controlMin) / range) * 100;
    var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
    var output = control.next('output');
    
    output
      .css('left', 'calc(' + position + '% - ' + positionOffset + 'px)')
      .text(controlVal);
  
  }); */

  function rangeSlider(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
  
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });
  
      range.on('input', function(){
        $(this).next(value).html(this.value);
      });
    });
  };

///////////////////////////////////////////////////////////////////////////////

const
range = document.getElementById('range'),
rangeV = document.getElementById('rangeV'),
setValue = ()=>{
const
    newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
    newPosition = 10 - (newValue * 0.2);
rangeV.innerHTML = `<span>${range.value}</span>`;
rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
  