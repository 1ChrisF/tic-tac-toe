

const Player = (mark) => {
    
    let score = score
    const markValue = [1, -1];
    const playerMark = ["o", "x"];
    getMark = () => playerMark[mark];
    getMarkValue = () => markValue[mark];

    return { getMark, getMarkValue };
}

const player0 = Player(0);
const player1 = Player(1);


const gameBoard = () => {
    let boardState =
        [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];

    //listen for click 
    //
    // take data x and data y
    //check for zero in arrays /return
    //check value of player 
    //change value of arr at xy to 1/-1
    // look for arry that = 3
    //increase turn count
    //check move number
    //if 9 and no 3/-3 draw

    //swictch player

}


const displayControler = 0;
// take data x and data y
//check active player 
//add image to cord

//clear button 
//remove all images 