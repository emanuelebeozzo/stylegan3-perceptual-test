let images=["../lol.jpg", "../mmlab.png"];
let index=0;


function timeoutImage(){
    document.getElementById("image").src=images[index];
    if (index==0){
        index=1;
    }
    setTimeout(timeoutImage, 3000);
}

function nextImage(){
    
}
