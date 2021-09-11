const Player = (mark) => {
    let score = 0;

    const marks = ["o", "x"];
    getMark = () => marks[mark];

    return { getMark };
}
const player0 = Player(0);
const player1 = Player(1);

const gameBoard = (() => {
    let boardState = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    let counter = 0;
    let player = player1;
    const fillBoard = (e) => {
        e.target.innerText = player.getMark()
    };

    const addMark = (e) => {
        let x = e.target.dataset.index;

        boardState[x] = player.getMark();
        player = (player == player0) ? player1 : player0;

    }

    const addRows = () => {
        let a = boardState
        winConditions = [
            a[0] + a[1] + a[2],
            a[3] + a[4] + a[5],
            a[6] + a[7] + a[8],
            a[0] + a[3] + a[6],
            a[1] + a[4] + a[7],
            a[2] + a[5] + a[8],
            a[0] + a[4] + a[8],
            a[2] + a[4] + a[6]
        ]
        if (winConditions.indexOf("xxx") > -1) {
            boardState[5] = "win"
        }
    }








    //const addMark = function () {
    //
    // take data x and data y



    //check for zero in arrays /return
    //check value of player 
    //addToArray = () =>{
    // if (boardState[getX][getY]) return;

    // boardState[getX][getY] = player;}
    //increase turn count 
    //counter++
    //change value of arr at xy to 1/-1 
    // look for arry that = 3
    //check move number
    //if (counter < 9);
    //if 9 and no 3/-3 draw
    //swictch player
    //player = (player === player0) ? player1 : player0;
    return {
        fillBoard,
        addMark,
        addRows
        // checkBoard,
        // addMark
    }
})();

// take data x and data y
//check active player 
//add image to cord
//clear button 
//remove all images   
const squares = document.querySelectorAll(".square")
squares.forEach(element => {
    element.addEventListener("click", function (e) {
        if (!e.target.innerText) {
            gameBoard.fillBoard(e);
            gameBoard.addMark(e);
            gameBoard.addRows();
        }

    });

});