  const cells = document.querySelectorAll('.cell');
        const statusDisplay = document.getElementById('status');
        const resetBtn = document.getElementById('resetBtn');

        let gameActive = true;
        let currentPlayer = 'X';
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function handleCellClick(event) {
            const cell = event.target;
            const index = cell.getAttribute('data-index');

            // Prevent clicking on already filled cells or after game ends
            if (gameState[index] !== '' || !gameActive) {
                return;
            }

            // Update game state and cell
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            cell.disabled = true;

            // Check for winner
            checkResult();
        }

        function checkResult() {
            let gameWon = false;

            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                    continue;
                }
                if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    gameWon = true;
                    break;
                }
            }

            if (gameWon) {
                statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins!`;
                statusDisplay.classList.add('winner');
                gameActive = false;
                return;
            }

            // Check for draw
            if (!gameState.includes('')) {
                statusDisplay.textContent = "🤝 It's a Draw!";
                statusDisplay.classList.add('draw');
                gameActive = false;
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        }

        function resetGame() {
            gameActive = true;
            currentPlayer = 'X';
            gameState = ['', '', '', '', '', '', '', '', ''];
            statusDisplay.textContent = "Player X's Turn";
            statusDisplay.classList.remove('winner', 'draw');

            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
                cell.disabled = false;
            });
        }

        // Event listeners
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        resetBtn.addEventListener('click', resetGame);