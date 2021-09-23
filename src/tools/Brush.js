import Tool from "./Tool";
import toolState from "../store/toolState";

export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }
    state = {
        xMin: 0,
        yMin: 0,
        xMax: 0,
        yMax: 0,
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler() {
        this.mouseDown = false

        const img = new Image()
        img.src = this.saved

        img.onload = function () {
            const s = this.state
            const ctx = this.ctx

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            const x = (s.xMax - s.xMin) / 2 + s.xMin
            const y = (s.yMax - s.yMin) / 2 + s.yMin
            const radius = Math.max(s.xMax - s.xMin, s.yMax - s.yMin) / 2

            if (toolState.autoClean) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            }
            if (toolState.center) {
                ctx.beginPath()
                ctx.arc(x, y, 3, 0, 2 * Math.PI)
                ctx.fill()
            }
            if (toolState.fill) {
                ctx.beginPath()
                ctx.arc(x, y, radius, 0, 2 * Math.PI)
                ctx.fill()
            }
            if (toolState.stroke) {
                ctx.beginPath()
                ctx.arc(x, y, radius, 0, 2 * Math.PI)
                ctx.stroke()
            }
            s.xMin = s.yMin = s.xMax = s.yMax = 0
        }.bind(this)

    }
    mouseDownHandler(e) {
        let canvasData = this.canvas.toDataURL()
        const s = this.state

        const diffX = e.pageX - e.target.offsetLeft
        const diffY = e.pageY - e.target.offsetTop

        if (!this.mouseDown) {
            s.xMin = s.xMax = diffX
            s.yMin = s.yMax = diffY
        }
        this.mouseDown = true
        this.ctx.beginPath()
        this.saved = canvasData
        this.ctx.moveTo(diffX, diffY)
    }
    mouseMoveHandler(e) {
        const diffX = e.pageX - e.target.offsetLeft
        const diffY = e.pageY - e.target.offsetTop

        if (this.mouseDown) {
            const s = this.state
            this.draw(diffX, diffY)

            if (diffX > s.xMax) s.xMax = diffX
            if (diffY > s.yMax) s.yMax = diffY
            if (diffX < s.xMin) s.xMin = diffX
            if (diffY < s.yMin) s.yMin = diffY
        }
    }
    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
