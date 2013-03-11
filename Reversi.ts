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
	player = 1;
	
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
	
	next(x: number, y: number) {
		if (0 <= x && x <= 7 && 0 <= y && y <= 7) {
			this.board[y][x]++
			if (this.board[y][x] == 3)
				this.board[y][x] = 0
		}
	}
	
	put(x: number, y: number) {
		var stone = 0
		stone += this.putDirection(x, y,  1,  0)
		stone += this.putDirection(x, y, -1,  0)
		stone += this.putDirection(x, y,  0,  1)
		stone += this.putDirection(x, y,  0, -1)
		stone += this.putDirection(x, y,  1,  1)
		stone += this.putDirection(x, y,  1, -1)
		stone += this.putDirection(x, y, -1,  1)
		stone += this.putDirection(x, y, -1, -1)
		if (stone > 0) {
			this.board[y][x] = this.player
			stone++
		}
		return stone
	}
	
	putDirection(x: number, y: number, dx: number, dy: number) {
		if (this.check(x, y, 0)) {
			var rival = 3 - this.player
			if (this.check(x + dx, y + dy, rival) &&
				this.check(x + dx * 2, y + dy * 2, this.player)) {
				this.board[y + dy][x + dx] = this.player
				return 1
			}
		}
		return 0
	}
	
	check(x: number, y: number, n: number) {
		return 0 <= x && x <= 7 && 0 <= y && y <= 7 && this.board[y][x] == n
	}
	
	change() {
		this.player = 3 - this.player
	}
}

var board = new Board
board.draw()

canvas.onmousedown = e => {
	var r = canvas.getBoundingClientRect()
	var x = Math.floor((e.clientX - r.left - 10) / 30)
	var y = Math.floor((e.clientY - r.top  - 10) / 30)
	if (board.put(x, y) > 0) {
		board.change()
		board.draw()
	}
}

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
