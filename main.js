// Get all necessary elements from the DOM
const playBtn = document.querySelector('#mainPlayBtn');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const trackTitle = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover');
const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const volumeIcon = document.querySelector('.volume-icon');

// Global variables
// Is the track Playing
let trackPlaying = false;
// Is the volume muted
let volumeMuted = false;
/* which track is currently 
loaded (based on the numerical id) */
let trackId = 0;

/*Data*/
// Track Names
const tracks = [
    "Culture",
    "Culture2",
    "Culture3",
    "Culture4",
    "Culture5",
    "Stand strong",
    "Mood"

];

// Artist Names
const artists = [
    "Culture",
    "Culture-2",
    "Culture-3",
    "Culture-4",
    "Culture-5",
    "Davido",
    "Wizkid"
];

// covers 
const covers = [
    "cover1",
    "cover2",
    "cover3",
    "cover4",
    "cover5",
    "cover6",
    "cover7"
]

// Add a click event on the paly button 
playBtn.addEventListener('click', playTrack);


// Play Track function
function playTrack() {
    // if the audio is not playing
    if(trackPlaying === false) {
        // Play audio
        audio.play();
        // Add a pause icon inside the button
        playBtn.innerHTML = `
        <span class="material-symbols-outlined"> 
        pause 
        </span>
        `;
        /* Set the trackPlaying to true,
        beacuse the track is now playing */
        trackPlaying = true;
    }
    /* Otherwise, if it is not playing */
    else {
        // Pause audio
        audio.pause();
        // Add a play icon inside the button
        playBtn.innerHTML = `
        <span class= "material-symbols-outlined">
        play_arrow
        </span>
        `;
        /* Set the trackPlaying to false, 
        because the track is now paused again */
        trackPlaying = false;
    }
}



// Switching tracks function
function switchTracks() {
    // if the audio is palying
    if(trackPlaying === true) {
        // Keep palying audio
        audio.play();
    }
}

// Get the track source
const trackSrc = './assets/tracks/' + tracks[trackId] + '.mp3';
// console.log (trackSrc);

// load track function
function loadTrack() {
    // Set the audio track source
    audio.src = './assets/tracks/' + tracks[trackId] + '.mp3';
    // Reload the audio track
    audio.load();
    // Set the track title
    trackTitle.innerHTML = tracks[trackId];
    // Set artist name
    artistName.innerHTML = artists[trackId];
    // Set cover image
    cover.src = './assets/covers/' + covers[trackId] + ".jpg";
    // Set the timeline slider to the begining 
    progress.style.width = 0;
    thumb.style.left = 0;

    // Wait for the audio data to load
    audio.addEventListener('loadeddata', () => {
        // Display the duration of the audio file
        setTime(fullTime, audio.duration);
        // Set max valueto slider
        slider.setAttribute("max", audio.duration);
    });
}

// Initially load the track
loadTrack();

// Set click event to previous button
btnPrev.addEventListener('click', () => {
    // Decrement track id
    trackId--;
    // If the track id goes below 0
    if(trackId < 0) {
        // Go to the last track
        trackId = tracks.length -1;
    }
    // Load the track
    loadTrack();
    // Run the switchTrack function
    switchTracks();
});

// Set click event to next button
btnNext.addEventListener('click', nextTrack);

// Next track function
function nextTrack() {
    // Increment track id
    trackId++;
    if(trackId > tracks.length -1) {
        // Go to the first track
        trackId = 0;
    }
    // Load the track
    loadTrack();
    // Run the switchTrack function
    switchTracks();
}

// When the audio ends, switch to the next track
audio.addEventListener('ended', nextTrack);

// Format the time
function setTime(output, input) {
    // Calculate minutes from input
    const minutes = Math.floor(input / 60);
    // Calculte seconds from input
    const seconds = Math.floor(input % 60);
    
    // If the seconds are under 10
    if(seconds < 10) {
        output.innerHTML = minutes + ":0" + seconds;
    }
    // If the seconds is over 10
    else {
        // output the time without 0
        output.innerHTML = minutes + ":" + seconds;
    }
}

// Output the audio track duration
setTime(fullTime, audio.duration);

// When the time changes on the audio track 
audio.addEventListener('timeupdate', () => {
    // Get the current audio time
    const currentAudioTime = Math.floor(audio.currentTime);
    // Get the percentage
    const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
    // Output the current audio time
    setTime(time, currentAudioTime);
    // Set the slider progress to the percentage
    progress.style.width = timePercentage;
    thumb.style.left = timePercentage;
});

// Function for handling the slider values
function customSlider() {
    // Get the percentage
    const val = (slider.value / audio.duration) * 100 + "%";
    // Set the thumb and progress to current value
    progress.style.width = val;
    thumb.style.left = val;
    // Output the audio current time
    setTime(time, slider.value);
    // Set audio current time to slider value
    audio.currentTime = slider.value;
}

// Call function initially
customSlider();

/*Repeat the function when 
the slider is selected*/
slider.addEventListener("input", customSlider);

// Volume slider current value
let val;

// Volume slider
function customVolumeSlider() {
    // Get max attribute value from slider
    const maxVal = volumeSlider.getAttribute("max");
    // Get the percentage
    val = (volumeSlider.value / maxVal) * 100 + "%";
    // Set the thumb and progress to current value 
    volumeProgress.style.width = val;
    // Set the audio volume to current value
    audio.volume = volumeSlider.value / 100;
    // Change volume icons
    // If the volume is high
    if(audio.volume > 0.5) {
        // Set the volume up icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_up
        </span>
        `;
    }
    // If the volume is muted
    else if (audio.volume === 0) {
        // Set the mute Icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_off
        </span>
        `;
    }
    // If the volume is low
    else {
        // Set the volume down icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_down
        </span>
        `;
    }
}

// Run the volume slider function
customVolumeSlider();

/*Run the function again on when
the volume slider is selected */
volumeSlider.addEventListener(
    "input", customVolumeSlider
);

// Add a click event to the volume icon
volumeIcon.addEventListener('click', () =>{
    // If volume is not muted
    if(volumeMuted === false) {
        // Set the muted volume icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_off
        </span>
        `;
        // Mute the audio 
        audio.volume = 0;
        // Set the volume slider to zero
        volumeProgress.style.width = 0;
        /* Set the volumeMuted to true,
        because the volume is now muted*/
        volumeMuted = true;
    }
    // If the vloume is muted
    else {
        // Set the volume down icon
        volumeIcon.innerHTML = `
        <span class="material-symbols-outlined">
        volume_down
        </span>
        `;
        /*Unmute the volume by setting 
        it to anything above zero*/
        audio.volume = 0.5;
        /*Set the volume progress 
        slider to the current value*/
        volumeProgress.style.width = val;
        /*Set the volumeMuted to false 
        because the volume is no longer muted*/
        volumeMuted = false;
    }
});