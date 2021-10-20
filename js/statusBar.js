const clock = document.querySelector('.statusBarClock');
const internet = document.querySelector('.internet');

//==================STATUS BAR CLOCK===================//

const currentClock = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

setInterval(currentClock, 1000);

//==================STATUS BAR ONLINE===================//

window.addEventListener('online', (e) => {
  console.log(e);
  internet.innerHTML = `4G`;
});

window.addEventListener('offline', (e) => {
  console.log(e);
  internet.innerHTML = `📵`;
});

//==================STATUS BAR LIKE===================//
let isLike = false;
const likeBtn = document.querySelector('.fa-heart');
likeBtn.addEventListener('click', () => {
  isLike = !isLike;
  console.log(isLike);
  if (isLike === true) {
    likeBtn.style.color = `tomato`;
  } else {
    likeBtn.style.color = `white`;
  }
});
