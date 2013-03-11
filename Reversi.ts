var canvas = <HTMLCanvasElement>document.createElement("canvas")
canvas.width = 260
canvas.height = 260
document.body.appendChild(canvas)
var ctx = canvas.getContext("2d")

ctx.strokeStyle = "black"
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(20, 20)
ctx.stroke()

ctx.beginPath()
ctx.rect(10, 10, 20, 20)
ctx.stroke()

ctx.strokeStyle = "blue"
ctx.beginPath()
ctx.arc(20, 20, 10, 0, 2 * Math.PI)
ctx.stroke()

ctx.fillStyle = "red"
ctx.fillRect(40, 10, 20, 20)
