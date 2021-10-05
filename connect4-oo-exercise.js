class Game {
    constructor(p1, p2, height = 6, width = 7){
        this.players = [p1, p2]
        this.height = height;
        this.width = width;
        this.currentPlayer = p1
        this.makeBoard() 
        this.makeHTMLBoard() 
        this.gameOver = false  
    }

    makeBoard() {
        this.board = [] 
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
          }
    }

    makeHTMLBoard(){
        const board = document.getElementById('board');
        board.innerHTML = ""

        const topRow = document.createElement('tr');
        topRow.setAttribute('id', 'row-top');

        this.handleGameClick = this.handleClick.bind(this);

        topRow.addEventListener("click", this.handleGameClick);

        for(let x = 0; x < this.width; x++){
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            topRow.append(headCell)
        }

        board.append(topRow)

        for(let y = 0; y < this.height; y++){
            const row = document.createElement('tr');

            for(let x = 0; x < this.width; x++){
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`)
                row.append(cell)
            }
            board.append(row);
        }
    }

    findSpotForCol(x){
        for(let y = this.height -1; y >= 0; y--){
            if(!this.board[y][x]){
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currentPlayer.color
        piece.style.top = -50 * (y + 2); //look at this in the solution
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    
    }

    endGame(msg) {
        alert(msg); //look at this
        const top = document.querySelector("#row-top")

        top.removeEventListener("click", this.handleGameClick);
      }

      handleClick(evt) {
        const x = +evt.target.id;
      
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        this.board[y][x] = this.currentPlayer;
        this.placeInTable(y, x);

         // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
  
        
        // check for win
        if (this.checkForWin()) {
            this.gameOver = true
          return this.endGame(`The ${this.currentPlayer.color} player won!`);
        }
        
       
          
        // switch players
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
      }

      checkForWin() {
        const _win = cells => {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.height &&
              x >= 0 &&
              x < this.width &&
              this.board[y][x] === this.currentPlayer
          );
        }
      
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              return true;
            }
          }
        }
      }
}

class Player {
    constructor(color){
        this.color = color;
    }
}

document.getElementById('start-game').addEventListener('click', () => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(p1, p2);
  });
  






