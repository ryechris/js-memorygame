// Setup variable declarations;
const selection = document.querySelector('.deck');
const resetBtn = document.querySelector('.restart');
let array1; // cards holder
let storage = [];
let score = 0;
let count = 0;
let interval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let starCount = 3;
let proceed = false;
let count2 = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function deckShuffle() {
  array1 = [];
  document.querySelectorAll('.card').forEach(element => array1.push(element.innerHTML));
  shuffle(array1);
  document.querySelectorAll('.card').forEach((element, index) => {
    element.innerHTML = array1[index];
  });
};


function stopWatch() {
  seconds++;

  if (seconds % 60 === 0) {
    seconds = 0;
    minutes++;

    if (minutes % 60 ===0) {
      minutes = 0;
      hours++;
    }
  }
  document.querySelector('.swBox').textContent = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, 0);
};


function newGame() {
  score = 0;
  storage = [];
  seconds = 0;
  minutes = 0;
  hours = 0;
  count = 0;
  count2 = 0;
  window.clearInterval(interval);

  document.querySelectorAll('.card').forEach(element => element.className = "card");
  document.querySelector('.swBox').textContent = '00:00:00';
  document.querySelector('.moves').textContent = 'Click on a card to begin!';
  document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li>\
  <li><i class="fa fa-star"></i></li>\
  <li><i class="fa fa-star"></i></li>';
  // shuffle the deck
  deckShuffle();
};

// turn cards' faces
function toggleCard(evt) {
  evt.target.classList.toggle('open');
  evt.target.classList.toggle('show');
  if (evt.target.nodeName.toLowerCase() === 'i') {
    evt.target.parentElement.classList.toggle('open');
    evt.target.parentElement.classList.toggle('show');
  }
  if (evt.target.firstElementChild) {
    storage.push(evt.target.firstElementChild);
  }
};

// gamewin handler
function endGame() {
  selection.removeEventListener('click', runGame);
  let time2 = minutes * 60 + seconds;
  proceed = confirm(`\
  Congratulations! ${starCount} stars out of 3! \n\
  And it took you ${time2} seconds to win the game!\n\
  Click OK to start a new game.\n\
  Click Cancel to stay on the current page.`);
  if (proceed) {
    selection.addEventListener('click', runGame);
    newGame();
  } else {
    window.clearInterval(interval);
  }
};

// compare the two results
function twoCardHandler() {
  if (storage[0].classList[1] !== storage[1].classList[1]) {
    storage[0].parentElement.classList.toggle('open');
    storage[0].parentElement.classList.toggle('show');
    storage[1].parentElement.classList.toggle('open');
    storage[1].parentElement.classList.toggle('show');
  } else {
    storage[0].parentElement.classList.toggle('match');
    storage[1].parentElement.classList.toggle('match');
    score += 1;
  }
  count++
  storage.length = 0;
};

function runGame(evt) {
  if (evt.target.className !== 'deck') {

    // start the stopwatch
    if (count2 === 0) {
      interval = window.setInterval(stopWatch, 1000);
      count2++;
    };

    // turn cards' faces
    if (storage.length < 2) {
      toggleCard(evt);
    };

    setTimeout(function() {
      // compare the two results
      if (storage.length === 2) {
        twoCardHandler()
      };

      document.querySelector('.moves').textContent = 'Number of moves: ' + count;
      if (((count === 16) || (count === 32)) && starCount > 0) {
        document.querySelector('li').remove();
        starCount -= 1;
      };

      if (score === 8) {
        endGame();
      };
    }, 900);

  };
};


// shuffle the deck
deckShuffle();

// add event listener to the reset button
resetBtn.addEventListener('click', newGame);

// add event listener to the cards
selection.addEventListener('click', runGame);
