const Player = (mark, name) => {

    const marks = ["o", "x"];
    const getName = name;
    const getMark = marks[mark];


    return { getMark, getName };
}

//const player0 = Player(0, );
const player1 = Player(1, "test");

const gameBoard = (() => {

    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    return { board }
})();

const game = (() => {



    let gameState = true;
    let counter = 0;
    let players = [];
    const addPlayer1 = () => players[0] = Player(0, document.getElementById("nameInput").value);
    players[1] = Player(1, "AI");
    let player = players[1];

    const reset = () => {
        gameBoard.board.forEach((element, index, array) => {
            element = ""
            array[index] = element;
            gameState = true;
        });
        counter = 0;
    }

    const changeState = (e) => {
        if (gameState) {
            let x = e.target.dataset.index;
            gameBoard.board[x] = player.getMark;
            counter++
            checkRows();
            render.marks();
        }
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
            gameBoard.board[5] = `${player.getName} wins`
            gameState = false;
        } else if (counter === 9) {
            gameBoard.board[5] = "draw";
            gameState = false;
        }
        togglePlayer();
    }
    const togglePlayer = () => player = (player == players[0]) ? players[1] : players[0];
    return {
        changeState,
        reset,
        addPlayer1,
        player
    }
})();

const render = (() => {

    const marks = () => {

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            i = square.dataset.index;
            square.innerText = gameBoard.board[i];
        })
    }
    const clearBoard = () => {

        game.reset()
        marks();
    }

    return {
        marks,
        clearBoard,

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
function alerttest() { alert("2") }
clearButton = document.getElementById("clear");
clearButton.addEventListener("click", render.clearBoard);
nameBtn = document.getElementById("name1");
nameBtn.addEventListener("click", game.addPlayer1)