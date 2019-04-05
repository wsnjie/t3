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
        gameBoard.drawCheck()
        let swapCheck = document.querySelector("#nowPlaying").innerText
        swapCheck !== "" ? gameBoard.swapPlayer() : null
    }
}

const gameBoard = {
    player: "X",
    turn: 1,
    spaces: {
        row0: [],
        row1: [],
        row2: []
    },
    cleanBoard: {},
    makeBoard: function () {
        this.makeRow("0")
        this.makeRow("1")
        this.makeRow("2")
        document.querySelector("#active").innerText = this.player
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
        document.querySelector("#active").innerText = this.player
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
            this.victory(this.spaces[row][0].mark)
        }
    },
    colCheck: function (space) {
        if (this.spaces.row0[space].mark === this.spaces.row1[space].mark && this.spaces.row1[space].mark === this.spaces.row2[space].mark) {
            if (this.spaces.row0[space].mark === "" || this.spaces.row1[space].mark === "" || this.spaces.row2[space].mark === "") {
                return
            }
            this.victory(this.spaces.row0[space].mark)
        }
    },
    diagCheck: function () {
        if (this.spaces.row0[0].mark === this.spaces.row1[1].mark && this.spaces.row1[1].mark === this.spaces.row2[2].mark) {
            if (this.spaces.row0[0].mark === "" || this.spaces.row1[1].mark === "" || this.spaces.row2[2].mark === "") {
                return
            }
            this.victory(this.spaces.row0[0].mark)
        }
        if (this.spaces.row2[0].mark === this.spaces.row1[1].mark && this.spaces.row1[1].mark === this.spaces.row0[2].mark) {
            if (this.spaces.row2[0].mark === "" || this.spaces.row1[1].mark === "" || this.spaces.row0[2].mark === "") {
                return
            }
            this.victory(this.spaces.row2[0].mark)
        }
    },
    victory: function (winner) {
        document.querySelector("#nowPlaying").innerText = ""
        document.querySelector("#winner").innerText = `Congratulations! ${winner}'s Win!`
        this.toggleReset()
    },
    drawCheck: function () {
        winner = document.querySelector("#winner").innerText
        if (winner === "" && this.turn > 9) {
            document.querySelector("#nowPlaying").innerText = ""
            document.querySelector("#winner").innerText = "You are evenly matched! It's a draw."
            this.toggleReset()
        }
    },
    toggleReset: function () {
        document.querySelector("#reset").setAttribute("style", "display: flex")
        document.querySelector("#reset").addEventListener("click", this.reset)

    },
    reset: function () {
        gameBoard.spaces = {
            row0: [],
            row1: [],
            row2: []
        }
        gameBoard.player = "X"
        gameBoard.turn = 1
        document.querySelector("#nowPlaying").innerHTML = "Player <span id=active class=statText></span>'s Turn"
        document.querySelector("#winner").innerText = ""
        let main = document.querySelector("main")
        main.removeChild(main.childNodes[1])
        main.insertBefore(gameBoard.cleanBoard, main.childNodes[1])
        gameBoard.makeBoard()
        document.querySelector("#reset").setAttribute("style", "display: none")
    },
    getCleanboard: function () {
        gameBoard.cleanBoard = document.querySelector("#gameboard").cloneNode(true)
    }
}
gameBoard.getCleanboard()
gameBoard.makeBoard()
