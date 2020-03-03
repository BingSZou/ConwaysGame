 class GameLogic {
     constructor(seed) {
         this.board = seed;
         this.height = seed.length;
         this.width = seed[0].length;
         this.prevBoard = [];
         this.board = seed;
     }
     next() {
         //  console.log(this + " before");
         this.prevBoard = this.cloneArray(this.board);
         const prevBoard = this.cloneArray(this.board);

         for (let i = 0; i < this.height; i++) {
             for (let j = 0; j < this.width; j++) {
                 const neighborCount = this.CalculateNeighbors(prevBoard, {
                     row: i,
                     col: j
                 });

                 //           console.log("looping through: ", i, j, neighborCount, this.board);
                 this.SetNextLifeState(this.prevBoard, {
                     row: i,
                     col: j
                 }, neighborCount);
             }
         }
         //  console.log(this + " After");
         this.board = this.prevBoard;
         return this.prevBoard;
     }

     toString() {
         const rowsBoard = this.board.map(function (row) {
             return row.join(' ');
         });
         return rowsBoard.join("\n");
     }

     CalculateNeighbors(seed, currCell) {

         // console.log("calculate next life:  current state:", seed, currCell);
         const i = currCell.row;
         const j = currCell.col;

         const prevRow = seed[i - 1] || [];
         const nextRow = seed[i + 1] || [];
         const currentRow = seed[i];

         const count = [prevRow[j - 1], prevRow[j], prevRow[j + 1],
             currentRow[j - 1], currentRow[j + 1],
             nextRow[j - 1], nextRow[j], nextRow[j + 1]
         ].reduce((prev, next) => {

             return prev + +!!next;
         }, 0);

         return count;
     }
     SetNextLifeState(seed, currCell, neighborCount) {
         const row = currCell.row;
         const column = currCell.col;

         //  console.log("Setting next life:  current state:", seed, currCell, neighborCount);

         if (neighborCount === 3) {
             seed[row][column] = 1;
         } else if (neighborCount > 3 || neighborCount < 2) {
             seed[row][column] = 0;
         }
         //  console.log("setting next life: next state:", seed);

         return seed;
     }
     cloneArray(array) {
         const newArray = array.slice().map(function (row) {
             return row.slice();
         });

         return newArray;
     }

 }