const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_0 = 3;
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_CELL_SIZE = 40;

function Cell(x,y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getHtml = function () {
        let top = x*DEFAULT_CELL_SIZE;
        let left = y*DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-'+x+'-'+y+'" onclick="play('+x+','+y+')" class="cell" style="position: absolute; width: '+
            DEFAULT_CELL_SIZE+'px; height:'+
            DEFAULT_CELL_SIZE+'px; left:'+
            left+'px; top:'+
            top+'px; line-height: '+
            DEFAULT_CELL_SIZE+'px;"></div>';
        return cellHtml;
    };

    this.draw = function () {
        let cellDiv = document.getElementById("cell-"+x+"-"+y);
        switch (this.value) {
            case VALUE_X:
                cellDiv.innerHTML = "X";
                break;
            case VALUE_0:
                cellDiv.innerHTML ="O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}
function GameBoard(rows,cols,elementId) {
    this.rows = row;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_0;
    this.cells = [];
    this.isOver = false;

    this.draw = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for(let i = 0;i<this.rows;i++){
            let row = [];
            this.cells.push(row);
            for (let j = 0; j< this.cols; j++){
                let cell = new Cell(i,j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
        }
    };
    this.play = function (x,y) {
        if(this.isOver){
            return;
        }
        let cell = this.cells[x][y];
        if(cell.value ===VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x,y);
            if(this.turn ===VALUE_0){
                this.turn = VALUE_X;
            }else {
                this.turn = VALUE_0;
            }
        }else {
            alert("Cell is not emply");
        }
    };

    this.check = function (x,y) {
        let cell = this.cells[x][y];
        //horizontal
        let count = 1;
        let i = 1;
        while ((y+i< this.cols)&&this.cells[x][y+i].value === cell.value){
            count++;
            i++;
        }
         i = 1;
        while ((y -1)>=0&&this.cells[x][y-1].value === cell.value){
            count++ ;
            i++;
        }
        this.endGame(count);
        //Vertical
        count = 1;
        i = 1;
        while ((x + i< this.rows)&&this.cells[x+i][y].value=== cell.value){
            count++;
            i++;
        }
        i = 1;
        while ((x - i >= 0)&&this.cells[x-i][y].value=== cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        // left diagonal
        count = 1;
        i = 1;
        let j = 1;
        while ((y+1 < this.cols)&&(x +1 < this.rows)&& this.cells[x+1][y+j].value === cell.value){
            count++;
            i++;
            j++;
        }
        i =1;
        j = 1;
        while ((x-1 < 0)&&(y -1 < 0)&& this.cells[x-i][y-j].value === cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
        //right diagonal
        count = 1;
        i = 1;
        j = 1;
        while ((y+j < this.cols)&&(x -i < this.rows)&& this.cells[x-i][y+j].value === cell.value){
            count++;
            i++;
            j++;
        }
        i =1;
        j = 1;
        while ((y-1 >= 0)&&(x +1 < this.rows)&& this.cells[x+i][y-j].value === cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
    };
    this.endGame = function (count) {
        if(count >= 5){
            this.isOver =true;
            alert("You WON");
        }
    };
}
function play(x,y) {
    gameBoard.play(x,y);
}
function start() {
    gameBoard = new GameBoard(DEFAULT_ROWS,DEFAULT_COLS,"game-board");
    gameBoard.draw();
}
let gameBoard;
start();