var canvas = <HTMLCanvasElement>document.createElement("canvas")
canvas.width = 260
canvas.height = 260
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d")

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

drawStone(3, 3, "white")
drawStone(4, 3, "black")
drawStone(3, 4, "black")
drawStone(4, 4, "white")

function drawStone(x: number, y: number, c: string) {
	ctx.fillStyle = c
	ctx.beginPath()
	ctx.arc(x * 30 + 25, y * 30 + 25, 14, 0, 2 * Math.PI)
	ctx.fill()
}
