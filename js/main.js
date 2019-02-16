$(document).ready(() => {

    $('#GO_X').css('visibility', 'hidden');
    $('#GO_O').css('visibility', 'hidden');

    let next = whoGoesNext();
    let numMoves = 8;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let winnerDeclared = false;

    $('#ttt_board td').on('click', (event) => {
        let clickedBox = $(event.currentTarget).attr('value');
        console.log(clickedBox);
        if ((undefined === clickedBox || clickedBox == "") && !winnerDeclared) {
            $(event.currentTarget).addClass('clicked').html(`<h1>${next}</h1>`).attr('value', `${next}`);
            let cell_ID = parseInt($(event.currentTarget).attr('id'));
            gameBoard[cell_ID] = next;

            if (findWinner(gameBoard)) {
                winnerDeclared = true;
                declareWinner(gameBoard, next);
            } else {
                next = whoGoesNext(next);
                numMoves --;

                if (numMoves < 0 ) {
                    winnerDeclared = true;
                    declareTie();
                }
            }
        }
    });

    $('#btn_newgame').on('click', () => {
        location.reload();
    });

})

function declareWinner(board, winner) {
    $(`#GO_${winner}`).html('<h2>WINNER!</h2>');
}

function declareTie() {
    $('#GO_O').css('visibility', 'visible');
    $('#GO_X').css('visibility', 'visible');
    $('#GO_X').html('<h1>Tie</h1>');
    $('#GO_O').html('<h1>Tie</h1>');
    $('#player_O').addClass('active');
    $('#player_X').addClass('active');
    $('#GO_X').addClass('active');
    $('#GO_O').addClass('active');
}

function findWinner(gameBoard) {
    if(checkRow(0, 1, 2, gameBoard)) {
        return true;
    } else if (checkRow(3, 4, 5, gameBoard)) {
        return true;
    } else if (checkRow(6, 7, 8, gameBoard)) {
        return true;
    } else if (checkRow(1, 4, 7, gameBoard)) {
        return true;
    } else if (checkRow(2, 5, 8, gameBoard)) {
        return true;
    } else if (checkRow(0, 4, 8, gameBoard)) {
        return true;
    } else if (checkRow(2, 4, 6, gameBoard)) {
        return true;
    } else {
        return false;
    }
}

function checkRow(a, b, c, board){
    let winningRow = false;
    if (board[a] === board[b] && 
        board[a] === board[c] &&
        board[a] !== ""){
            winningRow = true;
        }
    return winningRow;
}

function whoGoesNext(whoJustWent) {
    console.log(whoJustWent);
    let next;
    if (whoJustWent === "X") {
        next = "O";
        $('#GO_O').css('visibility', 'visible');
        $('#GO_X').css('visibility', 'hidden');
        $('#GO_O').addClass('active');
        $('#GO_X').removeClass('active');
        $('#player_O').addClass('active');
        $('#player_X').removeClass('active');
    } else {
        next = "X";
        $('#GO_X').css('visibility', 'visible');
        $('#GO_O').css('visibility', 'hidden');
        $('#GO_X').addClass('active');
        $('#GO_O').removeClass('active');
        $('#player_O').removeClass('active');
        $('#player_X').addClass('active');
    }
    return next;
}