window.addEventListener('DOMContentLoaded', () => {
    //creating constant variables and calling functions for the game set up
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playersDisplay = document.querySelector('.display-player');
    const resetButton = document.getElementById('reset')
    const announcer = document.querySelector('.announcer');

    // if(resetButton){
    //     resetButton.addEventListener('click', () =>{
    //         console.log('clicked')
    //     })
    // }

    //setting up the game board and the players
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //Results of the game if a player wins
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    //WINNING CONDITIONS STATE
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

    //looping through the winning condition array in order to check who won
    function handleResultValidation(){
        let roundWon = false;
        for(let i = 0; i<= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if(a == '' || b == '' || c == ''){
                continue;
            }
            if(a == b && b == c){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if(!board.includes(''))
        announce(TIE);
    }


    //result announcement
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player<span class="playerO">O</span>won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player<span class="playerX">X</span>won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    //checking whether a tile has a value or not
    const isValidAction = (tile) =>{
        if(tile.innerText == 'X' || tile.innerText == 'O'){
            return false;
        }
        return true;
    };
    //Updating the board
    const updateBoard = (index) =>{
        board[index] = currentPlayer;
    };

    //changing the player

    const changePlayer = () => {
        playersDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        playersDisplay.innerText = currentPlayer;
        playersDisplay.classList.add(`player${currentPlayer}`);
    }

    //user interaction with the game
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    //reseting the board
    const resetBoard = () =>{
        board = ['', '','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer == 'O'){
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    resetButton.addEventListener('click', resetBoard);
});