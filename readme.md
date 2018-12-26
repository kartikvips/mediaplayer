# audioViz

[Live Demo](https://kartikvips.github.io/mediaplayer)

A web based MP3 media player that allows users to drag and drop audio files to play music with audio visualizations. It uses vanilla JavaScript with HTML Canvas and Web Audio API.

## Introduction
* Features
* Technologies
* Challenges

## Features
* Custom Media Player
* Audio Visualization
* Drag and Drop MP3 Files

### Custom Media Player

Created custom media player utilizing Web Audio API. Necessary to create custom player to avoid default styling. 

![Player](https://raw.githubusercontent.com/kartikvips/fable/master/docs/pics/Screen%20Shot%202018-06-15%20at%203.02.34%20PM.png)

```javascript
        <div id='audio-box'>
            <div class = 'song-scroll' id = 'songScroll'>
                <div id = 'currentTime' class = 'current-time'>00:00</div>
                <input type="range" id = 'songSlider' class = 'song-slider' min = '0' step = '1' onchange="seekSong()" />
                <div id = 'duration' class = 'duration'>00:00</div>
            </div>
            <div class = 'buttons'>
                <i class="fa fa-step-backward" onclick="previous();"></i>
                <i id = 'playButton' onclick = 'playOrPauseSong();'class="fas fa-play-circle"></i>
                <i class="fa fa-step-forward" onclick = 'next();'></i>
                <i class="fas fa-volume-off" onclick = 'mute();'></i>
                <input type="range" id='volumeSlider' class = 'volume-slider' min='0' max='1' step = '0.01' onchange='adjustVolume();'/>

            </div>
        </div>

```

### Audio Visualization

Created custon audio visualization that adapts to song frequency and amplitude and then maps it using Archimedes Spiral Equation to the HTML Canvas element. 

![MediaPlayer](https://raw.githubusercontent.com/kartikvips/fable/master/docs/pics/Screen%20Shot%202018-06-15%20at%203.02.34%20PM.png)

