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
        winTest = rows.some(ele => board[ele[0]] + board[ele[1]] + board[ele[2]] === "ooo"
            || board[ele[0]] + board[ele[1]] + board[ele[2]] === "xxx");
        if (winTest) {            
            render.winner(name)
            game.finishGame(false);
        } else { game.togglePlayer() };
    }
    return { board, checkRows }
})();

const game = (() => {

    let gameState = true;
    let counter = 0;
    let players = [];
    let player;
    const addPlayer1 = () => {
        const playerName = document.getElementById("nameInput").value
        players[0] = Player(0, playerName);
        player = players[0];
        render.playerName(playerName);
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
        render.marks();
        gameBoard.checkRows(player.getName);
    }

    const togglePlayer = () => {
        player = (player == players[0]) ? players[1] : players[0];
        if (player.getName === "AI" && gameState === true) {
            changeStateAi();
        } else { player = players[0] }
    }

    const finishGame = (state) => {
        gameState = state;
        player = players[0]
    }
    
    const squares = document.querySelectorAll(".square")
    squares.forEach(element => {
        element.addEventListener("click", function (e) {
            if (!e.target.innerText) {
                changeState(e);
            }
        });
    });
    nameBtn = document.getElementById("getNameInput");
    nameBtn.addEventListener("click", addPlayer1)

    return {
        togglePlayer,
        finishGame,
        reset
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
        game.reset();
        marks();
    }
    const playerName = (name) => {

        const nameHeader = document.createElement("p")
        nameHeader.innerText = name + " vs AI";
        const nameContainer = document.getElementById("nameContainer");
        while (nameContainer.hasChildNodes()) {
            nameContainer.removeChild(nameContainer.lastChild);
        }
        nameContainer.appendChild(nameHeader);
    }
    clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clearBoard);

   const winner = (name) =>{
    winnerContainer = document.getElementById("winContainer");    
    winnerContainer.classList.add("show")
    document.getElementById("winnerMessage").innerText = `${name} won!`         
    closeBtn = document.getElementById("close");
    closeBtn.addEventListener("click", () => winnerContainer.classList.remove("show"))
   }   

   return {
        marks,
        playerName,
        winner

    }
})();




