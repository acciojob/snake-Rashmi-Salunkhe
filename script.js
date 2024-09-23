//your code here
// Game Constants
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');
const containerSize = 40;
const pixelCount = containerSize * containerSize;
const initialSnakePosition = 780; // 20th row, 1st column -> pixel index = 20 * 40 - 1
let snake = [initialSnakePosition]; // Snake starts with one segment
let direction = 1; // Start moving to the right
let score = 0;
let foodPosition = null;
let speed = 100; // Snake moves every 100ms
let gameInterval;

// Initialize the game grid
function initializeGame() {
    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.id = `pixel${i}`;
        pixel.classList.add('pixel');
        gameContainer.appendChild(pixel);
    }

    // Display initial snake and food
    updateSnake();
    generateFood();
}

// Update snake on the grid
function updateSnake() {
    document.querySelectorAll('.snakeBodyPixel').forEach(pixel => pixel.classList.remove('snakeBodyPixel'));
    snake.forEach(index => document.getElementById(`pixel${index}`).classList.add('snakeBodyPixel'));
}

// Generate random food position
function generateFood() {
    while (!foodPosition || snake.includes(foodPosition)) {
        foodPosition = Math.floor(Math.random() * pixelCount);
    }
    const foodPixel = document.getElementById(`pixel${foodPosition}`);
    foodPixel.classList.add('food');
}

// Move the snake in the current direction
function moveSnake() {
    const head = snake[0];
    let newHead;

    if (direction === 1) { // Right
        newHead = head + 1;
        if (newHead % containerSize === 0) newHead -= containerSize;
    } else if (direction === -1) { // Left
        newHead = head - 1;
        if (newHead % containerSize === containerSize - 1 || newHead < 0) newHead += containerSize;
    } else if (direction === -containerSize) { // Up
        newHead = head - containerSize;
        if (newHead < 0) newHead += pixelCount;
    } else if (direction === containerSize) { // Down
        newHead = head + containerSize;
        if (newHead >= pixelCount) newHead -= pixelCount;
    }

    if (snake.includes(newHead)) {
        alert("Game Over!");
        clearInterval(gameInterval);
        return;
    }

    snake.unshift(newHead);

    // Check if snake eats the food
    if (newHead === foodPosition) {
        score++;
        scoreElement.textContent = score;
        document.getElementById(`pixel${foodPosition}`).classList.remove('food');
        generateFood();
    } else {
        snake.pop(); // Remove tail if not eating food
    }

    updateSnake();
}

// Handle keyboard input for snake direction
function handleDirectionChange(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== containerSize) {
        direction = -containerSize; // Up
    } else if (key === 'ArrowDown' && direction !== -containerSize) {
        direction = containerSize; // Down
    } else if (key === 'ArrowLeft' && direction !== 1) {
        direction = -1; // Left
    } else if (key === 'ArrowRight' && direction !== -1) {
        direction = 1; // Right
    }
}

// Start the game
function startGame() {
    initializeGame();
    gameInterval = setInterval(moveSnake, speed);
}

// Event listeners for direction control
document.addEventListener('keydown', handleDirectionChange);

// Start the game
startGame();
