//video controls 

const videoInput = document.querySelector("#videoInput");
const videoBtn = document.querySelector("#video-btn");
const videoPlayer = document.querySelector("#main");
const videoSlider = document.querySelector("#video-slider");

const updateSlider = () => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
        videoSlider.max = videoElement.duration; // Set the max value of the slider
        videoSlider.value = videoElement.currentTime; // Update the slider position
    }
}

const InputHandler = () => {
    videoInput.click();
}

const acceptInputHandler = (obj) => {
    const selectedVideo = obj.target.files[0];

    //src->base64
    const link = URL.createObjectURL(selectedVideo);
    const videoElement = document.createElement("video");
    videoElement.src=link;
    //videoElement.controls="true";
    videoElement.setAttribute("class","video")
    videoPlayer.appendChild(videoElement);
    videoElement.play();

    videoElement.addEventListener('ended', () => {
        videoElement.currentTime = 0; // Reset the video to the beginning
        videoElement.pause(); // Pause the video
        videoSlider.value = 0; // Reset the slider position
    });
}

const seekerHandler = ()=> {
    const videoElement = document.querySelector("video");
    if (videoElement) {
        videoElement.currentTime = videoSlider.value; // Seek to the value of the slider
    }
}

setInterval(updateSlider, 1000);

videoBtn.addEventListener("click",InputHandler); 
videoInput.addEventListener("change",acceptInputHandler);
videoSlider.addEventListener("input",seekerHandler);


//volume and speed controls

const SpeedUp = document.querySelector("#SpeedUp");
const SpeedDown = document.querySelector("#SpeedDown");
const VolumeUp = document.querySelector("#VolumeUp");
const VolumeDown = document.querySelector("#VolumeDown");

const SpeedUpHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement == null || videoElement.playbackRate>2.5){
        return;
    }
    const increasedSpeed = videoElement.playbackRate + 0.5;
    videoElement.playbackRate=increasedSpeed;
    console.log("speed : ",increasedSpeed);

    //toast 
    const Toast = document.querySelector(".toast");
    Toast.textContent=`Speed : ${increasedSpeed}X`;
    Toast.style.display="block";

    setTimeout(function(){
        Toast.style.display="none";
    },2000);
    
}

const SpeedDownHandler=()=>{
    const videoElement = document.querySelector("video");
    if(videoElement==null || videoElement.playbackRate<0){
        return;
    }
   
    const decreasedSpeed=videoElement.playbackRate-0.5;
    videoElement.playbackRate=decreasedSpeed;
    const Toast = document.querySelector(".toast");
    Toast.textContent=`Speed : ${decreasedSpeed}X`;
    Toast.style.display="block";

    setTimeout(function(){
        Toast.style.display="none";
    },2000);
}

const VolumeUpHandler=()=>{
    const videoElement = document.querySelector("video");
    if(videoElement.volume>=0.99){
        videoElement.volume=1;
        return;
    }
    const increasedVolume = videoElement.volume+0.2;
    videoElement.volume=increasedVolume;
    console.log("increased volume : ",increasedVolume);

    const Toast = document.querySelector(".toast");
    Toast.textContent=`Volume : ${(increasedVolume*100).toFixed(0)}%`;
    Toast.style.display="block";

    setTimeout(function(){
        Toast.style.display="none";
    },2000);
}

const VolumeDownHandler=()=>{
    const videoElement = document.querySelector("video");
    if(videoElement.volume<0){
        videoElement.volume=1;
        return;
    }
    const decreasedVolume = videoElement.volume-0.2;
    videoElement.volume=decreasedVolume;
    console.log("decreased volume : ",decreasedVolume);

    const Toast = document.querySelector(".toast");
    Toast.textContent=`Volume : ${(decreasedVolume*100).toFixed(0)}%`;
    Toast.style.display="block";

    setTimeout(function(){
        Toast.style.display="none";
    },2000);
}

SpeedUp.addEventListener("click",SpeedUpHandler);
SpeedDown.addEventListener("click",SpeedDownHandler);
VolumeUp.addEventListener("click",VolumeUpHandler);
VolumeDown.addEventListener("click",VolumeDownHandler);


//footer functionalities

const Expand = document.querySelector("#expand");
const Pause = document.querySelector("#pause");
const Play = document.querySelector("#play");
const LeftSeek = document.querySelector("#backward");
const RightSeek = document.querySelector("#forward");
const Stop = document.querySelector("#stop");


const expandHandler = ()=>{
    const videoElement = document.querySelector("video");
        videoElement.requestFullscreen();
}

const togglePlayPause = () => {
    const videoElement = document.querySelector("video");
    if (videoElement.paused) {
        videoElement.play();
        Play.style.display = "none"; // Hide play button
        Pause.style.display = "inline"; // Show pause button
    } else {
        videoElement.pause();
        Play.style.display = "inline"; 
        Pause.style.display = "none"; 
    }
}

const pauseHandler = ()=>{
    const videoElement = document.querySelector("video");
    if (!videoElement.paused) {
        togglePlayPause(); 
    }
}

const playHandler = ()=>{
    togglePlayPause();
}

const seekLeftHandler = ()=>{
    const videoElement = document.querySelector("video");
    if(videoElement){
        videoElement.currentTime-=10;
    }
}

const seekRightHandler = ()=>{
    const videoElement = document.querySelector("video");
    if(videoElement){
        videoElement.currentTime += 10;
    }
}

const stopHandler = ()=>{
    const videoElement = document.querySelector("video");
    videoElement.currentTime=0;
}

Pause.addEventListener("click",pauseHandler);
Play.addEventListener("click",playHandler);
Expand.addEventListener("click",expandHandler);
LeftSeek.addEventListener("click",seekLeftHandler);
RightSeek.addEventListener("click",seekRightHandler);
Stop.addEventListener("click",stopHandler);

