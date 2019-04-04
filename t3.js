console.log("we are connected")

class Space {
    constructor(id) {
        this.id = id
        this.mark = ""
    }
    markSpace() {
        this.mark = gameBoard.player
        document.querySelector("#space" + this.id).innerText = this.mark
        gameBoard.turn >= 3 ? gameBoard.winCheck() : null
        gameBoard.turn++
        gameBoard.swapPlayer()
    }
}

const gameBoard = {
    player: "O",
    turn: 1,
    spaces: {
        row0: [],
        row1: [],
        row2: []
    },
    makeBoard: function () {
        this.makeRow("0")
        this.makeRow("1")
        this.makeRow("2")
    },
    makeRow: function (rowNum) {
        for (let i = 1; i < 4; i++) {
            //makes a new Space object
            let tempSpace = new Space(rowNum + `${i}`)
            let clear = function () { }
            const mark = function () {
                tempSpace.markSpace()
                clear()
            }
            //assigns a function to clear that runs after the listner is triggered and removes the listener so space can only be clicked once.
            clear = function () {
                document.querySelector("#space" + tempSpace.id).removeEventListener("click", mark, true)
            }
            document.querySelector("#space" + tempSpace.id).addEventListener("click", mark, true)
            this.spaces["row" + rowNum].push(tempSpace)

        }
    },
    swapPlayer: function () {
        this.player === "O" ? this.player = "X" : this.player = "O"
    },
    winCheck: function () {
        this.rowCheck("row0")
        this.rowCheck("row1")
        this.rowCheck("row2")
        this.colCheck(0)
        this.colCheck(1)
        this.colCheck(2)
        this.diagCheck()
    },
    rowCheck: function (row) {
        if (this.spaces[row][0].mark === this.spaces[row][1].mark && this.spaces[row][1].mark === this.spaces[row][2].mark) {
            if (this.spaces[row][0].mark === "" || this.spaces[row][1].mark === "" || this.spaces[row][2].mark === "") {
                return
            }
            console.log("Player " + this.spaces[row][0].mark + " wins!")
        }
    },
    colCheck: function (space) {
        if (this.spaces.row0[space].mark === this.spaces.row1[space].mark && this.spaces.row1[space].mark === this.spaces.row2[space].mark) {
            if (this.spaces.row0[space].mark === "" || this.spaces.row1[space].mark === "" || this.spaces.row2[space].mark === "") {
                return
            }
            console.log("Player " + this.spaces.row0[space].mark + " wins!")
        }
    },
    diagCheck: function () {
        if (this.spaces.row0[0].mark === this.spaces.row1[1].mark && this.spaces.row1[1].mark === this.spaces.row2[2].mark) {
            if (this.spaces.row0[0].mark === "" || this.spaces.row1[1].mark === "" || this.spaces.row2[2].mark === "") {
                return
            }
            console.log("Player " + this.spaces.row0[0].mark + " wins!")
        }
        if (this.spaces.row2[0].mark === this.spaces.row1[1].mark && this.spaces.row1[1].mark === this.spaces.row0[2].mark) {
            if (this.spaces.row2[0].mark === "" || this.spaces.row1[1].mark === "" || this.spaces.row0[2].mark === "") {
                return
            }
            console.log("Player " + this.spaces.row2[0].mark + " wins!")
        }
    }
}

gameBoard.makeBoard()