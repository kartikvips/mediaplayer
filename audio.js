
let songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3"];

// let songTitle = document.getElementById('songTitle');
let songSlider = document.getElementById('songSlider');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let volumeSlider = document.getElementById('volumeSlider');
let previousVolume = [];
let song = new Audio();
let currentSong = 0;
let audioBox = document.getElementById('audio-box');
let playButton = document.getElementById('playButton');
let header = document.getElementById('header');
let title = document.getElementById('title');
let dragDrop = document.getElementById('dragDrop');
let playlist = document.getElementById('playlist');
let pauseText = document.getElementById('pausetext');
let infoBox = document.getElementById('infoBox');
let barss = document.getElementById('barss');
let red = 127;
let blue = 127; 
let green = 127;
let redSlider = document.getElementById('redSlider');
let blueSlider = document.getElementById('blueSlider');
let greenSlider = document.getElementById('greenSlider');
// let title = document.getElementById('title');

// song.crossOrigin = "anonymous";


let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.onload = () => { 
    loadSong();
    initMp3Player();
    window.addEventListener('drop', onDrop, false);
    window.addEventListener('dragover', onDrag, false);
    window.addEventListener('resize', resizeCanvas, false);
    song.addEventListener('ended', function () {
        //play next song
        next();
    });
    generatePlaylist();

};

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        playOrPause();
    }
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function onDrag(e) {
    e.stopPropagation();
    e.preventDefault();
    // $('#notification').velocity('fadeOut', {
    //     duration: 150
    // });
    return false;
    }

function onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    var droppedFiles = e.dataTransfer.files;
    loadSong(droppedFiles[0]); // initiates audio from the dropped file
    generatePlaylist();
    }

function loadSong(input = null) {
        // debugger;
    if(input){
        songs.push(URL.createObjectURL(input));
        currentSong = songs.length - 1;
        song.src = songs[currentSong];
        // songTitle.textContent = songs[currentSong];
        song.volume = volumeSlider.value;
        setTimeout(showDuration, 1000);
        playOrPause();
    } else {
        song.src = songs[currentSong];
        // songTitle.textContent = songs[currentSong];
        song.volume = volumeSlider.value;
        setTimeout(showDuration, 1000);
    }
}

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    let c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);

}

function generatePlaylist() {
    playlist.innerHTML = "";
    for (let i = 0; i < songs.length; i++) {
        let iterSong = new Audio(songs[i]);

        // songs[i];
        let ul = document.createElement('ul');
        let songName = document.createElement('li');
        let timer = document.createElement('li');
        songName.appendChild(document.createTextNode(`Track ${i+1}`));
        // debugger;
        timer.appendChild(document.createTextNode(convertTime(Math.floor(iterSong.duration))));
        // debugger;
        ul.appendChild(songName);
        // ul.appendChild(timer);
        ul.addEventListener('click',() => playSong(i));
        ul.className='nameSong';
        
        playlist.appendChild(ul);
    }
}

function playSong(idx){
    currentSong = idx;
    loadSong();
    hide();
    song.play();
}

function convertTime (secs) {
    let min = Math.floor(secs/60);
    let sec = secs % 60;
    min = (min<10) ? "0" + min : min;
    sec = (sec<10) ? "0" + sec : sec;
    return(min + ":" + sec);
}

function showDuration() {
    let d = Math.floor(song.duration);
    songSlider.setAttribute('max', d);
    duration.textContent = convertTime(d);
    generatePlaylist();
}

function playOrPause(){
    if (song.paused) {
        // debugger;
        song.play();
        playButton.className = "fas fa-pause";
        hide();
        // canvas.style.opacity = '1';
        // header.style.visibility = "hidden";
        // debugger;
    } else {
        song.pause();
        // canvas.style.opacity = '0.5';
        playButton.className = "fas fa-play-circle";
        reveal();
        // header.style.visibility = "visible";
        // audioBox.style.display = "flex";
    }
}

function hide(){
    audioBox.style.visibility = "hidden";
    dragDrop.style.visibility = "hidden";
    playlist.style.visibility = "hidden";
    barss.style.visibility = "hidden";
    header.style.visibility = "visible";
    title.style.visibility = "hidden";
    pauseText.style.visibility = "visible";
    infoBox.style.visibility = "hidden";
}

function reveal(){
    audioBox.style.visibility = "visible";
    dragDrop.style.visibility = "visible";
    playlist.style.visibility = "visible";
    header.style.visibility = "visible";
    title.style.visibility = "visible";
    infoBox.style.visibility = "visible";
    barss.style.visibility = "visible";
    pauseText.style.visibility = "hidden";

}


function playOrPauseSong() {
    if(song.paused){
        // debugger;
        song.play();
        playButton.className = "fas fa-pause";
        hide();
        // canvas.style.opacity = '1';
        // header.style.visibility = "hidden";
        // debugger;
    } else {
        song.pause();
        //  canvas.style.opacity = '0.5';
        playButton.className = "fas fa-play-circle";
        reveal();
        // header.style.visibility = "visible";
    }
}

function next(){
    currentSong = (currentSong + 1) % songs.length;
    loadSong();
    hide();
    song.play();
}


function previous(){
    currentSong = (currentSong - 1);
    currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
    hide();
    loadSong();
    // setTimeout(() => {song.play()}, 1000);
    song.play();
}

function seekSong(){
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume(){
    song.volume = volumeSlider.value;
}

let vol = 0;

function mute(){
   
    if (song.volume === 0) {
        song.volume = vol;
        volumeSlider.value = vol;
    } else {
        vol = volumeSlider.value;
        song.volume = 0;
        volumeSlider.value = 0;

    }
}

function initMp3Player() {
    // document.getElementById('audio-box').appendChild(audio);
    context = new AudioContext();
    analyser = context.createAnalyser();
    canvas = document.getElementById('analyser-render');
    ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    source = context.createMediaElementSource(song);
    source.connect(analyser);
    analyser.connect(context.destination);

    // animate();
    frameLooper();
}

// function animate() {
//     window.requestAnimationFrame(animate);
//         ctx.fillRect(50, 50, 30, 30);
//         ctx.fillStyle = '#fff';
// }
function changeRed(){
    red = redSlider.value;

}
function changeGreen(){
    green = greenSlider.value;
}
function changeBlue(){
    blue = blueSlider.value;
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = '#00CCFF';
    bars = 1000;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    // console.log(fbc_array);
    // ctx.lineWidth =0.1;
    // ctx.beginPath();
    // ctx.moveTo(centerX, centerY);
    // ctx.fillRect(50, 50, 30, 30);
    


    for (var i = 0; i < bars; i++) {
        // let angle = 0.1 * (1000-i);
        let angle = 0.1 * (i);
        let x = (1 + angle) * Math.cos(angle) * 5 + centerX;
        let y = (1 + angle) * Math.sin(angle) * 5 + centerY;
 
        bar_width = canvas.width/bars;
        bar_x = i * 2;
        bar_height = -(fbc_array[i] / 2.5);
        let circleR = (fbc_array[i] / 17);
        //was 20
     
        // ctx.stroke();
        // ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            ctx.beginPath();
            ctx.arc(x, y, circleR, 0, Math.PI * 2, false);

            // ctx.fillStyle = '#00CCFF';
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fill();

        // ctx.lineTo(x, y);
    }

    // ctx.strokeStyle = `rgba(255, 0, 0)`;
    // ctx.stroke();
}

function fullScreen(){
    if (audioBox.style.visibility === "hidden"){
        document.body.webkitExitFullScreen();
    } else{
        hide();
        document.body.webkitRequestFullScreen();
    }
    
    // header.style.visibility = "hidden";
}

function displayInfo(){
    // console.log("gets here");
    if(infoBox.style.visibility === "hidden"){
        infoBox.style.visibility = "visible";
    } else {
        infoBox.style.visibility = "hidden";
    }
}