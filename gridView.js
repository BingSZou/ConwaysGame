function $(selector, container) {
    return (container || document).querySelector(selector);
}
(function () {
    const _ = self.GridView = function (table, rows) {
        this.grid = table;
        this.checkboxesGrid = []
    };
    _.prototype = {

        createGrid: function (rows) {
            const fragment = document.createDocumentFragment();

            for (i = 0; i < rows; i++) {
                const row = document.createElement('tr');
                this.checkboxesGrid[i] = [];
                for (j = 0; j < rows; j++) {
                    const cell = document.createElement('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                    this.checkboxesGrid[i][j] = checkbox;
                }
                fragment.appendChild(row);
            }
            this.grid.appendChild(fragment);
        },

        get gridViewMatrix() {
            return this.checkboxesGrid.map(row => {
                return row.map(cb => {
                    //  console.log("chckbox ", cb, cb.checked, +cb.checked);
                    return +cb.checked;
                })

            })
        },
        set gridViewMatrix(seedTable) {
            for (let i = 0; i < seedTable.length; i++) {
                const row = seedTable[i];
                for (let j = 0; j < row.length; j++) {
                    const cell = row[j];
                    this.checkboxesGrid[i][j].checked = !!cell;
                }
            }
        }
    }
})();

const gridView = new GridView(document.getElementById('grid'), 12);
gridView.createGrid(12);

let shouldStopGame = false;

function playGame() {
    let seed = gridView.gridViewMatrix;

    window.setInterval(function () {
        if (shouldStopGame)
            return;

        //  console.log("Getting Seed: ", seed);
        const gameLogic = new GameLogic(seed);
        seed = gameLogic.next();
        gridView.gridViewMatrix = seed;
    }.bind(this), 1000);
}
$("#play").addEventListener('click', function () {
    playGame();
    shouldStopGame = false;
    $("button#play").disabled = true;
    $("button#stop").disabled = false;
    $("#gameStatus").innerHTML = 'Game is on....';
    //  console.log("play is clickeck");
});

$("#stop").addEventListener('click', function () {
    shouldStopGame = true;
    $("button#play").disabled = false;
    $("button#stop").disabled = true;

    $("#gameStatus").innerHTML = '...';
    //    console.log("stop is clickecd");
});