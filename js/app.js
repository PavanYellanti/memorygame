/*
 * Create a list that holds all of your cards
 */
'use strict';
// getting all cards here
var list = document.querySelectorAll(".card");
var listArray = Array.prototype.slice.call(list);
var storeCard = [];
var counts = 0;

listArray.forEach(function(a) {
  a.addEventListener("click", example);
});

function example() {
  this.classList.add("open", "show", "disabled");
  storeCard.push(this);
  match();
}

// Cards Match
function match() {
  setTimeout(function() {
    movesCount();
    if (storeCard.length == 2) {
      if (storeCard[0].firstElementChild.className === storeCard[1].firstElementChild.className) {
        storeCard.forEach(i => {
          i.classList.add("match");
          i.classList.remove("open", "show");
        });
        gameOver();
      } else {
        storeCard.forEach(i => {
          i.classList.remove("open", "show", "disabled");
        });
      }
      storeCard = [];
    }
  }, 200);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Shuffle cards using shuffle function
var deck = document.querySelector(".deck");
var shuffleCards = shuffle(listArray);
shuffleCards.forEach(i => {
  [].forEach.call(shuffleCards, function(data) {
    deck.append(data);
  })
});

// restart
var reload = document.querySelector('.restart');
reload.addEventListener('click', restart);

function restart() {
  location.reload();
}

// moves count
var moves;
var move = document.querySelector('.moves');

function movesCount() {
  moves = move.innerHTML;
  moves++;
  move.innerHTML = moves;
  starRate();
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

var timer = document.querySelector(".timer");
var second = 0,minute = 0,hour = 0;
var interval;
var sratCount;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function gameOver() {
  counts++;
  if (counts == 8) {
    clearInterval(interval);
    sratCount = "";
    var starsrating = document.querySelectorAll('.fa-star').length;
    while (starsrating-- > 0) {
      sratCount += '<i class="fa fa-star"></li>';
    }
    swal({
      title: "Congratulations...!",
      html: "Total Moves :" + "<b>" + move.innerHTML + '</b>' + "<br>  Wow! you are completed the game with in short time :" + "<b>" + timer.innerHTML + "</b>" + "<br> You have earned : " + sratCount,
      confirmButtonText: "play again",
    }).then(function() {
      restart();
    });
  }
}

// Stars rating
var stars = document.querySelectorAll('.fa-star');
var allStars = Array.prototype.slice.call(stars);

function starRate() {

  if (moves > 16) {
    allStars[2].classList.add('fa-star-o');
    allStars[2].classList.remove('fa-star');
  }
  if (moves > 30) {
    allStars[1].classList.add('fa-star-o');
    allStars[1].classList.remove('fa-star');
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *  ++ if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
