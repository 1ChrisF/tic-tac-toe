const Player = (mark, name) => {

    const marks = ["o", "x"];
    const getName = name;
    const getMark = marks[mark];
    return { getMark, getName };
}

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
    let player;
    const addPlayer1 = () => {
        players[0] = Player(0, document.getElementById("nameInput").value);
        player = players[0];
    }
    players[1] = Player(1, "AI");


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
            updateGame();
        }
    }

    const changeStateAi = () => {
        if (gameState) {
            for (i = 0; i < 9; ++i) {
                ranNum = Math.floor(Math.random() * 9);
                let space = gameBoard.board[ranNum]
                if (space === "") {
                    gameBoard.board[ranNum] = player.getMark;
                    break;
                }
            }
            updateGame();
        }
    }
    const updateGame = () => {
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
            gameBoard.board[5] = `${player.getName} wins`
            gameState = false;
        } else if (counter === 9) {
            gameBoard.board[5] = "draw";
            gameState = false;
        }
        togglePlayer();
    }
    const togglePlayer = () => {
        player = (player == players[0]) ? players[1] : players[0];
        if (player.getName === "AI" && gameState === true) {
            changeStateAi();
        } else { player = players[0] }
    }

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
clearButton = document.getElementById("clear");
clearButton.addEventListener("click", render.clearBoard);
nameBtn = document.getElementById("name1");
nameBtn.addEventListener("click", game.addPlayer1)