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
        diffX: 0,
        diffY: 0
    }
    setDefaultState() {
        const s = this.state
        s.xMin = s.yMin = s.xMax = s.yMax = 0
    }
    setDiffXY(e) {
        const s = this.state
        s.diffX = e.pageX - e.target.offsetLeft
        s.diffY = e.pageY - e.target.offsetTop
    }
    drawCircle(x, y, radius, fill) {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        fill ? ctx.fill() : ctx.stroke()
    }
    drawSquare(x, y, side, fill) {
        const ctx = this.ctx
        ctx.translate(-side / 2, -side / 2)
        fill ? ctx.fillRect(x, y, side, side) : ctx.strokeRect(x, y, side, side)
        ctx.translate(side / 2, side / 2)
    }
    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
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

            const x = (s.xMax - s.xMin) / 2 + s.xMin
            const y = (s.yMax - s.yMin) / 2 + s.yMin
            const radius = Math.max(s.xMax - s.xMin, s.yMax - s.yMin) / 2

            if (toolState.brush !== 'paint') {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            }
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)

            if (toolState.brush !== 'paint' && toolState.autoClean) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            }
            if (toolState.center) {
                this.drawCircle(x, y, 3, true)
            }

            switch (toolState.brush) {
                case 'circle':
                    if (toolState.fill) {
                        this.drawCircle(x, y, radius, true)
                    }
                    if (toolState.stroke) {
                        this.drawCircle(x, y, radius, false)
                    }
                    return this.setDefaultState()

                case 'square':
                    if (toolState.fill) {
                        this.drawSquare(x, y, radius * 2, true)
                    }
                    if (toolState.stroke) {
                        this.drawSquare(x, y, radius * 2, false)
                    }
                    return this.setDefaultState()

                case 'paint':
                    return this.draw(s.diffX, s.diffY)

                default: return
            }
        }.bind(this)
    }
    mouseDownHandler(e) {
        let canvasData = this.canvas.toDataURL()
        const s = this.state

        this.setDiffXY(e)

        if (!this.mouseDown) {
            s.xMin = s.xMax = s.diffX
            s.yMin = s.yMax = s.diffY
        }
        this.mouseDown = true
        this.ctx.beginPath()
        this.saved = canvasData
        this.ctx.moveTo(s.diffX, s.diffY)
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const s = this.state
            this.setDiffXY(e)
            this.draw(s.diffX, s.diffY)

            if (s.diffX > s.xMax) s.xMax = s.diffX
            if (s.diffY > s.yMax) s.yMax = s.diffY
            if (s.diffX < s.xMin) s.xMin = s.diffX
            if (s.diffY < s.yMin) s.yMin = s.diffY
        }
    }
}