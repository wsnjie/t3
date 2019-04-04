console.log("we are connected")

class Space {
    constructor(id) {
        this.id = id
        this.mark = ""
    }
    markSpace(player) {
        this.mark = player
        console.log("clicked")
        document.querySelector("#space" + this.id).removeEventListener("click", this.markSpace)
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
    makeButtons: function () {
        for (let i = 0; i < 3; i++) {
            let tempSpace = 0
            for (let j = 1; j < 4; j++) {
                tempSpace = new Space(`${i}` + `${j}`)
                row = "row" + i
                this.spaces[`${row}`].push(tempSpace)
                document.querySelector("#space" + i + j).addEventListener("click", () => {
                    this.spaces[row][j - 1].markSpace(this.player)
                })
            }
        }
    }


}