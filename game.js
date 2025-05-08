// Placeholder SOWPODS word list (in reality, you'd want to load this dynamically or include it as a large JSON file)
const sowpodsWords = [
  'RAIN', 'MOUNTAIN', 'RIVER', 'DESERT', 'CITY', 'HOUSE', 'CAR', 'TREE', 'SKY', 'OCEAN', 'FIRE', 'WATER', 'EARTH', 'AIR', 'FLOOD'
  // Add all words from the SOWPODS list here (or load them from an external file)
];

let availableTiles = [];
let playerScores = [0, 0];
let currentPlayer = 0; // 0 for Player 1, 1 for Player 2

function generateBoard() {
  const tileContainer = document.getElementById('tile-container');
  availableTiles = [];
  
  // Generate 10 tiles for now (you can change this)
  for (let i = 0; i < 10; i++) {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letters
    availableTiles.push(letter);
    
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = letter;
    tile.onclick = () => handleTileClick(letter);
    tileContainer.appendChild(tile);
  }
}

function handleTileClick(letter) {
  const wordInput = document.getElementById('word-input');
  wordInput.value += letter; // Add the clicked letter to the word input
}

function validateWord(word) {
  return sowpodsWords.includes(word.toUpperCase());
}

function submitWord() {
  const wordInput = document.getElementById('word-input');
  const word = wordInput.value.trim();

  if (word && validateWord(word)) {
    // Add points to current player
    playerScores[currentPlayer] += word.length;

    // Update the scoreboard
    document.getElementById(`player${currentPlayer + 1}-score`).textContent = playerScores[currentPlayer];

    // Notify players and reset word input
    alert(`Player ${currentPlayer + 1} scored!`);
    wordInput.value = '';
    switchTurn();
  } else {
    alert('Invalid word');
  }
}

function switchTurn() {
  currentPlayer = (currentPlayer + 1) % 2;
  document.getElementById('status').textContent = `Player ${currentPlayer + 1}'s Turn`;
}

function nextTurn() {
  generateBoard();
  document.getElementById('word-input').value = ''; // Clear word input
}

// Set up initial game state
generateBoard();

document.getElementById('submit-word').addEventListener('click', submitWord);
document.getElementById('next-turn').addEventListener('click', nextTurn);
