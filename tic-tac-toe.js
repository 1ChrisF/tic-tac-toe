const Player = (mark) => {
    let score = 0;

    const marks = ["o", "x"];
    getMark = () => marks[mark];

    return { getMark };
}
const player0 = Player(0);
const player1 = Player(1);

const gameBoard = (() => {

    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    return { board }
})();

const game = (() => {

    let counter = 0;
    let player = player0;


    const changeState = (e) => {
        let x = e.target.dataset.index;
        gameBoard.board[x] = player.getMark();
        counter++
        checkRows();
        render.marks();

    }

    const checkRows = () => {
        let a = gameBoard.board
        wins = [
            a[0] + a[1] + a[2],
            a[3] + a[4] + a[5],
            a[6] + a[7] + a[8],
            a[0] + a[3] + a[6],
            a[1] + a[4] + a[7],
            a[2] + a[5] + a[8],
            a[0] + a[4] + a[8],
            a[2] + a[4] + a[6]
        ]
        if (wins.indexOf("xxx") > -1 || wins.indexOf("ooo") > -1) {
            gameBoard.board[5] = `${player.getMark()} wins`
        }
        if (wins.indexOf("xxx") === -1 && counter === 9) { gameBoard.board[5] = "draw" }
        togglePlayer();
    }
    const togglePlayer = () => player = (player == player0) ? player1 : player0;
    return {
        changeState,
    }
})();

const render = (() => {

    marks = () => {

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            i = square.dataset.index;
            square.innerText = gameBoard.board[i];
        })
    }
    const clearBoard = () => {
        board = document.querySelectorAll(".square");
        board.forEach(square => square.innerText = "");
    }
    //clear button 
    return {
        marks,
        clearBoard
    }
})();

const squares = document.querySelectorAll(".square")
squares.forEach(element => {
    element.addEventListener("click", function (e) {
        if (!e.target.innerText) {            
            game.changeState(e);
        }
    });
});