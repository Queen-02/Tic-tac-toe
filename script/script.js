window.addEventListener('DOMContentetLoaded', () =>{
    //creating constant variables and calling functions for the game set up
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playersDisplay = document.querySelector('.display-player');
    const resetButtom = document.querySelector('#rest');
    const anouncer = document.querySelector('.announcer');

    //setting up the game board and the players
    let board = ['', '','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //Results of the game if a player wins
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const tie = 'TIE';


    //WINNING CONDITIONS STATE
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];


    //result announcement
    const announce = (type) => {
        switch (type){
            case PLAYERO_WON:
                announce.innerHTML = 'Player <span class="playerO">O</span>won';
                break;
            case PLAYERX_WON:
                announce.innerHTML = 'Player <span class="playerX">X</span>won';
                break;
            case TIE:
                announce.innerText = 'Tie'
        }
        announce.classList
    }
    //changing the player

    const changePlayer = () =>{
        playersDisplay.classList.remove(`player  ${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playersDisplay.innerText = currentPlayer;
        playersDisplay.classList.add(`player  ${currentPlayer}`);
    }

    //user interaction with the game
    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player ${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach((tile, index) =>{
        tile.addEventListener('click', () => userAction(tile, index));
        });
    resetButtom.addEventListener('click', resetBoard);
});