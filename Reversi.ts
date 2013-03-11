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

ctx.fillStyle = "white"
ctx.beginPath()
ctx.arc(115, 115, 14, 0, 2 * Math.PI)
ctx.fill()

ctx.fillStyle = "black"
ctx.beginPath()
ctx.arc(145, 115, 14, 0, 2 * Math.PI)
ctx.fill()

ctx.fillStyle = "black"
ctx.beginPath()
ctx.arc(115, 145, 14, 0, 2 * Math.PI)
ctx.fill()

ctx.fillStyle = "white"
ctx.beginPath()
ctx.arc(145, 145, 14, 0, 2 * Math.PI)
ctx.fill()
