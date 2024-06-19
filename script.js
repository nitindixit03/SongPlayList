console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Khwab- Aditya A", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Jab Tak- Armaan Malik", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Husn- Anuv Jain", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Love is waste of time- Shreya Ghoshal", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Main koi aisa geet gaaoon- Abhijeet", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Yeh sham mastani- Kishore Kumar", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Oo Antava Oo Oo Antava- Indravathi Chauhan", filePath: "songs/7.mp3", coverPath: "covers/7.avif" },
    { songName: "Riste Naate- Rahat Fateh Ali Khan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
];

// Function to play the current song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Function to handle when a song ends
const handleSongEnd = () => {
    songIndex = (songIndex + 1) % songs.length; // Move to the next song, looping back to the start if necessary
    playSong(); // Play the next song
};

// Set up initial song details in the UI
songItems.forEach((element, i) => {
    let songPlayIcon = element.querySelector('.songItemPLay');
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    // Add click event listener to each songItemPlay icon
    songPlayIcon.addEventListener('click', () => {
        if (audioElement.paused && songIndex === i) {
            // If paused and clicked on the same song, resume
            audioElement.play();
            songPlayIcon.classList.remove('fa-play-circle');
            songPlayIcon.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else if (!audioElement.paused && songIndex === i) {
            // If playing and clicked on the same song, pause
            audioElement.pause();
            songPlayIcon.classList.remove('fa-pause-circle');
            songPlayIcon.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // If clicking on a different song, play the new song
            songIndex = i;
            playSong(); // Play the new song
            // Reset all play icons to play state
            songItems.forEach((item) => {
                item.querySelector('.songItemPLay').classList.remove('fa-pause-circle');
                item.querySelector('.songItemPLay').classList.add('fa-play-circle');
            });
            // Set the clicked song's play icon to pause state
            songPlayIcon.classList.remove('fa-play-circle');
            songPlayIcon.classList.add('fa-pause-circle');
        }
    });
});

// Event listener for the master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(); // Play the current song
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Event listener for updating the progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Event listener for seeking in the song using the progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Event listener for when a song ends
audioElement.addEventListener('ended', handleSongEnd);

// Event listener for the previous button
document.getElementById("previous").addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop back to end if at the beginning
    playSong(); // Play the previous song
});

// Event listener for the next button
document.getElementById("next").addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to beginning if at the end
    playSong(); // Play the next song
});




