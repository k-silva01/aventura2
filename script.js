document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollDiceButton = document.getElementById('roll-dice-button');
    const currentPositionSpan = document.getElementById('current-position');
    const lastRollSpan = document.getElementById('last-roll');

    const boardSize = 25; // Número de casas no tabuleiro
    let playerPosition = 1; // A posição inicial do jogador

    // 1. Cria o tabuleiro e o jogador
    function createBoard() {
        for (let i = 1; i <= boardSize; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `square-${i}`;
            square.textContent = i;
            board.appendChild(square);
        }
        
        // Adiciona o jogador na primeira casa
        const player = document.createElement('div');
        player.classList.add('player');
        player.id = 'player-token';
        document.getElementById('square-1').appendChild(player);
    }

    // 2. Rola o dado
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1; // Gera um número de 1 a 6
    }

    // 3. Move o jogador
    function movePlayer(steps) {
        let newPosition = playerPosition + steps;
        
        if (newPosition > boardSize) {
            newPosition = boardSize; // Impede que o jogador ultrapasse o final
        }

        const oldSquare = document.getElementById(`square-${playerPosition}`);
        const newSquare = document.getElementById(`square-${newPosition}`);
        const playerToken = document.getElementById('player-token');

        // Remove o jogador da casa antiga
        if (oldSquare) {
            oldSquare.removeChild(playerToken);
        }

        // Adiciona o jogador na nova casa
        if (newSquare) {
            newSquare.appendChild(playerToken);
        }
        
        playerPosition = newPosition;
        currentPositionSpan.textContent = playerPosition;

        // Verifica se o jogador chegou ao final
        if (playerPosition === boardSize) {
            alert('Parabéns! Você venceu o jogo!');
            rollDiceButton.disabled = true;
        }
    }
    
    // 4. Adiciona um evento para o botão "Rolar o dado"
    rollDiceButton.addEventListener('click', () => {
        const diceRoll = rollDice();
        lastRollSpan.textContent = diceRoll;
        movePlayer(diceRoll);
    });

    // Inicia o jogo
    createBoard();
});