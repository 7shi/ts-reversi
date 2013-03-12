var canvas = <HTMLCanvasElement>document.createElement("canvas")
canvas.width = 300
canvas.height = 260
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d")

class Board {
	board : number[][] = [
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
	black = 2;
	white = 2;
	message = "";
	
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
		drawStone(8.3, 6.5, this.player)
		ctx.font = "10pt sans-serif"
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		ctx.fillText("Turn", 275, 245)
		drawStone(8.3, 0, 1)
		ctx.fillText(this.black.toString(), 275, 55)
		drawStone(8.3, 2, 2)
		ctx.fillText(this.white.toString(), 275, 115)
		if (this.message != "") {
			ctx.fillStyle = "white"
			ctx.strokeStyle = "red"
			ctx.beginPath()
			ctx.rect(20, 120, 220, 20)
			ctx.fill()
			ctx.stroke()
			ctx.fillStyle = "black"
			ctx.fillText(this.message, 120, 130)
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
			this.count()
		}
		return stone
	}
	
	putDirection(x: number, y: number, dx: number, dy: number) {
		var stone = this.countDirection(x, y, dx, dy)
		for (var i = 1; i <= stone; i++) {
			this.board[y + dy * i][x + dx * i] = this.player
		}
		return stone
	}
	
	check(x: number, y: number, n: number) {
		return 0 <= x && x <= 7 && 0 <= y && y <= 7 && this.board[y][x] == n
	}
	
	change() {
		this.player = 3 - this.player
		if (this.canPut()) return 1
		this.player = 3 - this.player
		if (this.canPut()) return 2
		if (this.black > this.white) {
			this.message = "Black Wins!"
		} else if (this.black < this.white) {
			this.message = "White Wins!"
		} else {
			this.message = "Draw!"
		}
		return 3
	}
	
	count() {
		this.black = 0
		this.white = 0
		for (var y = 0; y <= 7; y++) {
			for (var x = 0; x <= 7; x++) {
				if (this.board[y][x] == 1) {
					this.black++
				} else if (this.board[y][x] == 2) {
					this.white++
				}
			}
		}
	}
	
	checkCount(x: number, y: number) {
		return this.countDirection(x, y,  1,  0) > 0 ||
			this.countDirection(x, y, -1,  0) > 0 ||
			this.countDirection(x, y,  0,  1) > 0 ||
			this.countDirection(x, y,  0, -1) > 0 ||
			this.countDirection(x, y,  1,  1) > 0 ||
			this.countDirection(x, y,  1, -1) > 0 ||
			this.countDirection(x, y, -1,  1) > 0 ||
			this.countDirection(x, y, -1, -1) > 0
	}
	
	countDirection(x: number, y: number, dx: number, dy: number) {
		if (this.check(x, y, 0)) {
			var rival = 3 - this.player
			var stone = 0
			var x1 = x + dx
			var y1 = y + dy
			while (this.check(x1, y1, rival)) {
				stone++
				x1 += dx
				y1 += dy
			}
			if (stone > 0 && this.check(x1, y1, this.player)) {
				return stone
			}
		}
		return 0
	}
	
	canPut() {
		for (var y = 0; y <= 7; y++) {
			for (var x = 0; x <= 7; x++) {
				if (this.checkCount(x, y)) {
					return true
				}
			}
		}
		return false
	}
	
	thinkRandom() {
		var x, y
		do {
			x = Math.floor(Math.random() * 8)
			y = Math.floor(Math.random() * 8)
		} while (this.put(x, y) == 0)
		return [x, y]
	}
	
	countPut(x: number, y: number) {
		var stone = 0
		if (this.check(x, y, 0)) {
			stone += this.countDirection(x, y,  1,  0)
			stone += this.countDirection(x, y, -1,  0)
			stone += this.countDirection(x, y,  0,  1)
			stone += this.countDirection(x, y,  0, -1)
			stone += this.countDirection(x, y,  1,  1)
			stone += this.countDirection(x, y,  1, -1)
			stone += this.countDirection(x, y, -1,  1)
			stone += this.countDirection(x, y, -1, -1)
		}
		return stone
	}
	
	thinkMany() {
		var max = 0, tx = 0, ty = 0
		for (var y = 0; y <= 7; y++) {
			for (var x = 0; x <= 7; x++) {
				var stone = this.countPut(x, y)
				if (max < stone) {
					max = stone
					tx = x
					ty = y
				}
			}
		}
		if (max > 0) this.put(tx, ty)
	}
}

var board = new Board
board.draw()
var ignore = false

canvas.onmousedown = e => {
	if (ignore) return
	if (board.message != "") {
		board = new Board
		board.draw()
		return
	}
	var r = canvas.getBoundingClientRect()
	var x = Math.floor((e.clientX - r.left - 10) / 30)
	var y = Math.floor((e.clientY - r.top  - 10) / 30)
	if (board.put(x, y) > 0) {
		var chg = board.change()
		board.draw()
		if (chg != 1) return;
		ignore = true;
		(function f {
			setTimeout(() => {
				board.thinkMany()
				var chg = board.change()
				board.draw()
				if (chg == 2) f(); else ignore = false
			}, 50)
		})()
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
