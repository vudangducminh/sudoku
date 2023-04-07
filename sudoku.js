var board = {
    row: 9,
    col: 9,
    num: 9,
    big_cell_size: 3
};

function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
	return (i - 1) * board.col + j;
}


let state = new Array(board.row + 1);
let reveal = new Array(board.row + 1);
let start_board = new Array(board.row + 1);
let valid = new Array(board.row + 1);
var score = 0;

for(var i = 1; i <= board.row; i++){
    state[i] = new Array(board.col + 1).fill(0);
    reveal[i] = new Array(board.col + 1).fill(0);
    start_board[i] = new Array(board.col + 1).fill(0);
    valid[i] = new Array(board.col + 1);
    for(var j = 1; j <= board.col; j++){
        valid[i][j] = new Array(board.num + 1).fill(1);
    }
}


function Big_cell(x){
    return Math.floor((x - 1) / board.big_cell_size) + 1;
}

function is_valid(state){
    for(var row = 1; row <= board.big_cell_size; row++){
        for(var col = 1; col <= board.big_cell_size; col++){
            let freq = new Array(board.num + 1).fill(0);
            for(var i = (row - 1) * board.big_cell_size + 1; i <= row * board.big_cell_size; i++){
                for(var j = (col - 1) * board.big_cell_size + 1; j <= col * board.big_cell_size; j++){
                    if(state[i][j]) freq[state[i][j]]++;
                }
            }
            for(var i = 1; i <= board.num; i++){
                if(freq[i] >= 2) return false;
            }
        }
    }
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let freq = new Array(board.num + 1).fill(0);
            for(var row = 1; row <= board.row; row++){
                if(state[row][j]) freq[state[row][j]]++;
            }
            for(var k = 1; k <= board.num; k++){
                if(freq[k] >= 2) return false;
                freq[k] = 0;
            }
            for(var col = 1; col <= board.col; col++){
                if(state[i][col]) freq[state[i][col]]++;
            }
            for(var k = 1; k <= board.num; k++){
                if(freq[k] >= 2) return false;
            }
        }
    }
    return true;
}


function update_valid_number(row, col, number){
    for(var i = 1; i <= board.num; i++){
        valid[i][col][number] = 0;
        valid[row][i][number] = 0;
        valid[row][col][i] = 0;
    }
    row = Big_cell(row), col = Big_cell(col);
    for(var i = (row - 1) * board.big_cell_size + 1; i <= row * board.big_cell_size; i++){
        for(var j = (col - 1) * board.big_cell_size + 1; j <= col * board.big_cell_size; j++){
            valid[i][j][number] = 0;
        }
    }
}

function update_color(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(!start_board[i][j]) cell.style.color = "blue";
            else cell.style.color = "black";
            cell.style.backgroundColor = "white";
        }
    }
    for(var x = 1; x <= board.row; x += board.big_cell_size){
        for(var y = 1; y <= board.col; y += board.big_cell_size){
            for(var i_1 = x; i_1 <= x + board.big_cell_size - 1; i_1++){
                for(var j_1 = y; j_1 <= y + board.big_cell_size - 1; j_1++){
                    if(!reveal[i_1][j_1]) continue;
                    for(var i_2 = x; i_2 <= x + board.big_cell_size - 1; i_2++){
                        for(var j_2 = y; j_2 <= y + board.big_cell_size - 1; j_2++){
                            if(!reveal[i_2][j_2]) continue;
                            if((i_1 == i_2) && (j_1 == j_2)) continue;
                            if(reveal[i_1][j_1] == reveal[i_2][j_2]){
                                let cell_1 = document.getElementById(hash(i_1, j_1));
                                let cell_2 = document.getElementById(hash(i_2, j_2));
                                if(!start_board[i_1][j_1]) cell_1.style.color = "red";
                                else cell_1.style.backgroundColor = "red";
                                if(!start_board[i_2][j_2]) cell_2.style.color = "red";
                                else cell_2.style.backgroundColor = "red";
                            }
                        }
                    }
                    for(var row = 1; row <= board.row; row++){
                        if(!reveal[row][j_1]) continue;
                        if(row == i_1) continue;
                        if(reveal[i_1][j_1] == reveal[row][j_1]){
                            let cell_1 = document.getElementById(hash(i_1, j_1));
                            let cell_2 = document.getElementById(hash(row, j_1));
                            if(!start_board[i_1][j_1]) cell_1.style.color = "red";
                            else cell_1.style.backgroundColor = "red";
                            if(!start_board[row][j_1]) cell_2.style.color = "red";
                            else cell_2.style.backgroundColor = "red";
                        }
                    }
                    for(var col = 1; col <= board.col; col++){
                        if(!reveal[i_1][col]) continue;
                        if(col == j_1) continue;
                        if(reveal[i_1][j_1] == reveal[i_1][col]){
                            let cell_1 = document.getElementById(hash(i_1, j_1));
                            let cell_2 = document.getElementById(hash(i_1, col));
                            if(!start_board[i_1][j_1]) cell_1.style.color = "red";
                            else cell_1.style.backgroundColor = "red";
                            if(!start_board[i_1][col]) cell_2.style.color = "red";
                            else cell_2.style.backgroundColor = "red";
                        }
                    }
                }
            }
        }
    }
}

function update_state(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            for(var k = 1; k <= board.num; k++){
                valid[i][j][k] = 1;
            }
        }
    }
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(!reveal[i][j]) continue;
            update_valid_number(i, j, reveal[i][j]);
        }
    }
}

function shuffle(array){
    var size = array.length
    for(var i = 0; i < size - 1; i++){
        var index = rng(i + 1, size - 1);
        var tmp = array[i];
        array[i] = array[index];
        array[index] = tmp;
    }
    return array;
}

function GenerateBoard(cur_row, cur_col){
    if(cur_row > board.row) return true;
    let val = [];
    for(var i = 1; i <= board.num; i++) val.push(i);
    val = shuffle(val);
    for(var i = 0; i < board.num; i++){
        var number = val[i];
        state[cur_row][cur_col] = number;
        if(is_valid(state) == false){
            state[cur_row][cur_col] = 0;
            continue;
        }
        else{
            var next_cur_col = cur_col + 1, next_cur_row = cur_row;
            if(next_cur_col == board.col + 1) next_cur_row++, next_cur_col = 1;
            var check = GenerateBoard(next_cur_row, next_cur_col);
            if(check == true){
                // let cell = document.getElementById(hash(cur_row + board.row, cur_col));
                // cell.textContent = state[cur_row][cur_col];
                // cell.style.color = "black";  
                return true;
            }
            else{
                state[cur_row][cur_col] = 0;
                continue;
            }
        }
    }
    state[cur_row][cur_col] = 0;
    return false;
}

function Reveal_cell(){
    var reveal_number = rng(25, 30);
    score = reveal_number;
    let arr = [];
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            arr.push(hash(i, j));
        }
    }
    arr = shuffle(arr);
    for(var i = 0; i < reveal_number; i++){
        let cell = document.getElementById(arr[i]);
        var cell_row = Math.floor((arr[i] - 1) / board.col) + 1, cell_col = arr[i] % board.col;
        if(!cell_col) cell_col = board.col; 
        start_board[cell_row][cell_col] = reveal[cell_row][cell_col] = state[cell_row][cell_col];
        cell.textContent = reveal[cell_row][cell_col];
        cell.style.color = "black";
        update_valid_number(cell_row, cell_col, reveal[cell_row][cell_col]);
    }
}

function fill(row, col, num){
    if(start_board[row][col]) return;
    if(!reveal[row][col]) score++;
    reveal[row][col] = num;
    let cell = document.getElementById(hash(row, col));
    cell.textContent = reveal[row][col];
    cell.style.color = "blue"; 
    update_color();
    update_state(); 
    for(var i = 1; i <= board.num; i++){
        valid[i][col][num] = 0;
        valid[row][i][num] = 0;
        valid[row][col][i] = 0;
    }
    row = Big_cell(row), col = Big_cell(col);
    for(var i = (row - 1) * board.big_cell_size + 1; i <= row * board.big_cell_size; i++){
        for(var j = (col - 1) * board.big_cell_size + 1; j <= col * board.big_cell_size; j++){
            valid[i][j][num] = 0;
        }
    }
    win();
}

function erase(row, col){
    if(start_board[row][col]) return;
    if(!reveal[row][col]) return;
    score--;
    reveal[row][col] = 0;
    update_color();
    let cell = document.getElementById(hash(row, col));
    cell.textContent = "";
    cell.style.color = "";
    update_state(); 
}

function same_big_cell(i, j, x, y){
    var row_1 = Math.floor((i - 1) / board.big_cell_size) + 1, col_1 = Math.floor((j - 1) / board.big_cell_size) + 1;
    var row_2 = Math.floor((x - 1) / board.big_cell_size) + 1, col_2 = Math.floor((y - 1) / board.big_cell_size) + 1;
    return ((row_1 == row_2) && (col_1 == col_2));
}
function highlight(row, col){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            cell.style.backgroundColor = "white";
        }
    }
    if(!reveal[row][col]){
        let cell = document.getElementById(hash(row, col));
        cell.style.backgroundColor = "lightblue";
        return;
    }
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(reveal[i][j] == reveal[row][col]){
                let cell = document.getElementById(hash(i, j));
                cell.style.backgroundColor = "lightblue";
                if(!start_board[i][j] || (i == row && j == col)) continue;
                if(i == row || j == col || same_big_cell(i, j, row, col)) cell.style.backgroundColor = "red";
            }
        }
    }
}
function init(){
    var table = document.createElement('table');
    for(var x = 1; x <= board.row; x += board.big_cell_size){
        var big_row = document.createElement('tr');
        for(var y = 1; y <= board.col; y += board.big_cell_size){
            var big_cell = document.createElement('td');
            for(var i = x; i <= x + board.big_cell_size - 1; i++){
                var row = document.createElement('tr');
                for(var j = y; j <= y + board.big_cell_size - 1; j++){
                    var cell = document.createElement('td');
                    cell.id = hash(i, j);
                    cell.textContent = '';
                    addCellListener(cell, i, j);
                    row.appendChild(cell);
                }
                big_cell.appendChild(row);
            }
            big_row.appendChild(big_cell);
        }
        table.appendChild(big_row);
    } 
    document.getElementById('BoardSudoku').appendChild(table);
    var sol = document.createElement('table');
    for(var x = 1; x <= board.row; x += board.big_cell_size){
        var big_row = document.createElement('tr');
        for(var y = 1; y <= board.col; y += board.big_cell_size){
            var big_cell = document.createElement('td');
            for(var i = x; i <= x + board.big_cell_size - 1; i++){
                var row = document.createElement('tr');
                for(var j = y; j <= y + board.big_cell_size - 1; j++){
                    var cell = document.createElement('td');
                    cell.id = hash(i + board.row, j);
                    cell.textContent = '';
                    row.appendChild(cell);
                }
                big_cell.appendChild(row);
            }
            big_row.appendChild(big_cell);
        }
        sol.appendChild(big_row);
    }
    // document.getElementById('SudokuSolution').appendChild(sol);
    var osu = GenerateBoard(1, 1);
    Reveal_cell();
}

function addCellListener(cell, row, col){
	cell.addEventListener('mousedown', function(event){
        if(event.which == 1){
            highlight(row, col); 
            document.onkeydown = (e) => {
                e = e || window.event;
                if(e.keyCode == 8) erase(row, col);
                if(e.keyCode >= 49 && e.keyCode <= 57) fill(row, col, e.keyCode - 48);
            }
        }
    });
}

function win(){
    if(score < board.row * board.col) return;
    if(is_valid(reveal)) alert("Luck?");
}
window.addEventListener('load', function(){
    init();
});

function newgame(){
	window.location.reload();
}
