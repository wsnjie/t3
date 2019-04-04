console.log("we are connected")

class Space {
    constructor(id) {
        this.id = id
        this.mark = ""
    }
    markSpace(player) {
        this.mark = player
        console.log("clicked" + this.id)
    }
}

const gameBoard = {
    player: 0,
    turn: 0,
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
                tempSpace.markSpace(this.player)
                clear()
            }
            //assigns a function to clear that runs after the listner is triggered and removes the listener so space can only be clicked once.
            clear = function () {
                document.querySelector("#space" + tempSpace.id).removeEventListener("click", mark, true)
            }
            document.querySelector("#space" + tempSpace.id).addEventListener("click", mark, true)
            this.spaces["row" + rowNum].push(tempSpace)

        }
    }
}

gameBoard.makeBoard()