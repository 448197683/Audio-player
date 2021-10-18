const playSongBtn = document.querySelector('.fa-play');
const pauseSongBtn = document.querySelector('.fa-pause');
const nextSongBtn = document.querySelector('.fa-step-forward');
const albumImg = document.querySelector('.albumImg');
const preSongBtn = document.querySelector('.fa-step-backward');
const randomBtn = document.querySelector('.fa-random');
const loopBtn = document.querySelector('.fa-redo');
const seekRange = document.querySelector('#seekRange');

const musicFile = new Audio();
musicFile.preload = `metadata`;

let isPlaying = false;
let isRandom = false;
let currentNumber = 0;
let randomNumber;
let islooping = false;
let intervalID;
let pausedTime;
let moveTime;

const songs = [
  {
    songName: 'Circles',
    artistName: "Manfred Mann's Earth Band",
    audioSrc: '../audio/circles.mp3',
    imgSrc: '../img/circles.webp',
  },
  {
    songName: 'Blackbird',
    artistName: 'Miles Davis',
    audioSrc: '../audio/blackbird.mp3',
    imgSrc: '../img/blackbird.jpg',
  },
  {
    songName: 'Hella',
    artistName: 'No Doubt',
    audioSrc: '../audio/hella.mp3',
    imgSrc: '../img/hella.jpg',
  },
  {
    songName: 'Mustard',
    artistName: 'Beatles',
    audioSrc: '../audio/mustard.mp3',
    imgSrc: '../img/mustard.jpg',
  },
];

let currentSong = songs[currentNumber];

const randomSong = () => {
  return (randomNumber = Math.floor(Math.random() * songs.length));
};

const seekBar = (currentValue) => {
  const totalTime = document.querySelector('.timerFull');
  const timerPlaying = document.querySelector('.timerPlayed');
  const songDuration = musicFile.duration;
  const songCurrentTime = musicFile.currentTime;
  seekRange.value = `${(songCurrentTime / songDuration) * 100}`;
  const totalMinutes = Math.floor(songDuration / 60);
  const totalSeconds = Math.floor(songDuration % 60);
  if (musicFile.readyState <= 1) {
    timerPlaying.innerHTML = `00:00`;
    totalTime.innerHTML = `00:00`;
  } else {
    totalTime.innerHTML = `${
      totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes
    }:${totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}`;
    const seekMinutes = Math.floor(songCurrentTime / 60);
    const seekSeconds = Math.floor(songCurrentTime % 60);
    timerPlaying.innerHTML = `${
      seekMinutes < 10 ? `0${seekMinutes}` : seekMinutes
    }:${seekSeconds < 10 ? `0${seekSeconds}` : seekSeconds}`;
  }
};

const playSong = () => {
  if (isRandom === true) {
    randomNumber = randomSong();
    while (randomNumber === currentNumber) {
      randomSong();
    }
    currentNumber = randomNumber;
  }
  currentSong = songs[currentNumber];
  if (isPlaying === false) {
    isPlaying = true;
    musicFile.src = currentSong.audioSrc;
    albumImg.src = currentSong.imgSrc;
    const albumTittleSong = document.querySelector('.albumTittleSong');
    const albumTittleArtist = document.querySelector('.albumTittleArtist');
    albumTittleSong.innerHTML = currentSong.songName;
    albumTittleArtist.innerHTML = currentSong.artistName;
    if (pausedTime) {
      musicFile.currentTime = pausedTime;
      musicFile.play();
    } else {
      musicFile.play();
    }
    intervalID = setInterval(seekBar, 1000);
    playSongBtn.classList.add('hide');
    pauseSongBtn.classList.remove('hide');
  } else {
  }
};

const pauseSong = () => {
  pausedTime = 0;
  if (isPlaying) {
    isPlaying = false;
    pauseSongBtn.classList.add('hide');
    playSongBtn.classList.remove('hide');
    musicFile.pause();
    pausedTime = musicFile.currentTime;
    console.log(pausedTime);
    clearInterval(intervalID);
  }
};

const nextSong = () => {
  pausedTime = 0;
  if (!isPlaying) {
    currentSong = songs[++currentNumber];
    if (currentNumber > songs.length - 1) {
      currentNumber = songs.length - 1;
      return;
    }
    musicFile.src = currentSong.audioSrc;
    albumImg.src = currentSong.imgSrc;
    const albumTittleSong = document.querySelector('.albumTittleSong');
    const albumTittleArtist = document.querySelector('.albumTittleArtist');
    albumTittleSong.innerHTML = currentSong.songName;
    albumTittleArtist.innerHTML = currentSong.artistName;
    if (musicFile.readyState <= 1) {
      return setTimeout(seekBar, 100);
    } else {
      return seekBar();
    }
  }

  if (currentNumber === songs.length - 1) {
    currentNumber = 0;
    isPlaying = false;
    playSong();
  } else {
    currentSong = songs[++currentNumber];
    isPlaying = false;
    playSong();
  }
};

const preSong = (e) => {
  if (!isPlaying) {
    currentSong = songs[--currentNumber];
    if (currentNumber < 0) {
      currentNumber = 0;
      return;
    }
    musicFile.src = currentSong.audioSrc;
    albumImg.src = currentSong.imgSrc;
    const albumTittleSong = document.querySelector('.albumTittleSong');
    const albumTittleArtist = document.querySelector('.albumTittleArtist');
    albumTittleSong.innerHTML = currentSong.songName;
    albumTittleArtist.innerHTML = currentSong.artistName;
    if (musicFile.readyState <= 1) {
      return setTimeout(seekBar, 100);
    } else {
      return seekBar();
    }
  }
  if (currentNumber === 0) {
    currentNumber = songs.length - 1;
    isPlaying = false;
    playSong();
  } else {
    currentSong = songs[--currentNumber];
    isPlaying = false;
    playSong();
  }
};

const randomCheck = () => {
  isRandom = !isRandom;
  if (isRandom === true) {
    randomBtn.classList.add('random');
  } else {
    randomBtn.classList.remove('random');
  }
};

const loopPlay = () => {
  if (isRandom) {
    islooping = false;
    return;
  }
  islooping = !islooping;
};

const autoPlay = () => {
  if (islooping === true && currentNumber === songs.length - 1) {
    currentNumber = 0;
    isPlaying = false;
    playSong();
  } else {
    nextSong();
  }
};

const controlSeek = () => {
  console.log(musicFile.duration);
};

playSongBtn.addEventListener('click', playSong);
pauseSongBtn.addEventListener('click', pauseSong);
nextSongBtn.addEventListener('click', nextSong);
preSongBtn.addEventListener('click', preSong);
randomBtn.addEventListener('click', randomCheck);
musicFile.addEventListener('ended', autoPlay);
loopBtn.addEventListener('click', loopPlay);
seekRange.addEventListener('change', (e) => {
  currentSong = songs[currentNumber];
  musicFile.src = currentSong.audioSrc;
  if (musicFile.readyState <= 1) {
    setTimeout(controlSeek, 100);
  } else {
    controlSeek();
  }
});
