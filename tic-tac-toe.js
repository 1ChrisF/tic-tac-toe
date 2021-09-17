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
    const checkRows = (name) => {
        let rows = [
            "012", "345", "678", "036", "147", "258", "048", "246"
        ]
        winTest = rows.some(ele => board[ele[0]] + board[ele[1]] + board[ele[2]] === "ooo");
        if (winTest) {
            alert(`${name} won!`)
            game.gameState = false;
        };

    }
    return { board, checkRows }

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

    player = players[0];

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
        gameBoard.checkRows(player.getName);
        render.marks();
    }

    const togglePlayer = () => {
        player = (player == players[0]) ? players[1] : players[0];
        if (player.getName === "AI" && gameState === true) {
            changeStateAi();
        } else { player = players[0] }
    }

    return {
        addPlayer1,
        changeState,        
        togglePlayer,        
        counter,      
        gameState,   
        
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
        reset()
        marks();
    }
    return {
        clearBoard,
        marks
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