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
        "x", "o", "x",
        "x", "o", "x",
        "x", "o", "x"
    ]
return {boardMarks}
})();


const game = (() => {
    let boardState = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    let counter = 0;
    let player = player1;


    const changeState = (e) => {
        let x = e.target.dataset.index;
        boardState[x] = player.getMark();
        counter++
        checkRows();
        player = (player == player0) ? player1 : player0;
    }

    const checkRows = () => {
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
        if (winConditions.indexOf("xxx") === -1 && counter === 9) { boardState[5] = "draw" }
    }

    return {
        changeState,
    }
})();
//add image to cord
//clear button 
//remove all images   
const render = (() => {

    renderMarks = () => gameBoard.boardState.forEach(mark => {
        boardMarks.indexOf(mark);


    })
    const addMark = (e) => {
        e.target.innerText = player.getMark();
    };
    const clearBoard = () => board = document.querySelectorAll(".square");
    board.forEach(square => square.innerText = "");

    return {
        addMark,
        clearBoard
    }
})();

const squares = document.querySelectorAll(".square")
squares.forEach(element => {
    element.addEventListener("click", function (e) {
        if (!e.target.innerText) {
            render.addMark(e);
            game.changeState(e);
        }
    });
});