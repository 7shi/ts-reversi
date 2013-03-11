var canvas = <HTMLCanvasElement>document.createElement("canvas")
canvas.width = 260
canvas.height = 260
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d")

class Board {
	board : number[] = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 0, 0, 0],
		[0, 0, 0, 1, 2, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
	];
	
	draw() {
		ctx.fillStyle = "green"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.strokeStyle = "black"
		for (var i = 0; i <= 8; i++)
		{
			ctx.beginPath()
			ctx.moveTo(i * 30 + 10,  10)
			ctx.lineTo(i * 30 + 10, 250)
			ctx.moveTo( 10, i * 30 + 10)
			ctx.lineTo(250, i * 30 + 10)
			ctx.stroke()
		}
		for (var y = 0; y <= 7; y++) {
			for (var x = 0; x <= 7; x++) {
				drawStone(x, y, this.board[y][x])
			}
		}
	}
}

var board = new Board
board.draw()

function drawStone(x: number, y: number, c: number) {
	if (c == 1) {
		ctx.fillStyle = "black"
	} else if (c == 2) {
		ctx.fillStyle = "white"
	} else {
		return
	}
	ctx.beginPath()
	ctx.arc(x * 30 + 25, y * 30 + 25, 14, 0, 2 * Math.PI)
	ctx.fill()
}
