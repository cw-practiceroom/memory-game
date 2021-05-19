const gameContainer = document.getElementById('game');
let firstColor = null;
let secondColor = null;
let flippedCards = 0;
let score = 0;
let cantClick = false;
let i = 0;

const COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (cantClick) return;
  if (
    event.target.classList.contains('flipped-red') ||
    event.target.classList.contains('flipped-blue') ||
    event.target.classList.contains('flipped-green') ||
    event.target.classList.contains('flipped-yellow') ||
    event.target.classList.contains('flipped-orange') ||
    event.target.classList.contains('flipped-purple')
  )
    return;
  // you can use event.target to see which element was clicked
  console.log('you just clicked', event.target);
  // first or second click indicator
  score++;
  console.log(score);
  if (i === 0) {
    // ◼ first click ◼
    // give color
    event.target.classList.add(`flipped-${event.target.classList.item(0)}`);
    // store click to compare
    firstColor = event.target.classList.item(0);
    i++;
    console.log(`i = ${i}`);
  } else {
    // ◼ second click ◼
    // give color
    event.target.classList.add(`flipped-${event.target.classList.item(0)}`);
    // store click to compare
    secondColor = event.target.classList.item(0);
    // compare colors
    if (firstColor !== secondColor) {
      cantClick = true;
      setTimeout(function () {
        //
        // ◼ removing classes if colors don't match ◼
        //
        // remove first color class
        let firstSelection = document.getElementsByClassName(`${firstColor}`);
        for (let i = 0; i < firstSelection.length; i++) {
          firstSelection[i].classList.remove(`flipped-${firstColor}`);
        }

        // remove second color class
        let secondSelection = document.getElementsByClassName(`${secondColor}`);
        for (let i = 0; i < secondSelection.length; i++) {
          secondSelection[i].classList.remove(`flipped-${secondColor}`);
        }

        cantClick = false;
      }, 1000);
    } else flippedCards += 2;
    i--;

    // game over alert
    if (flippedCards === COLORS.length) {
      setTimeout(function () {
        alert(
          `You win!!!
Score: ${score}`
        );
      }, 50);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
