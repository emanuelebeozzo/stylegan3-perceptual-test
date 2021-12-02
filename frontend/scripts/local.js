let images=["../mmlab.png", "../lol.jpg", "../../img/ffhq/18366.png", "../../img/ffhq/18509.png"];
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

}