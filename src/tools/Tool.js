
export default class Tool {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.strokeStyle = 'rgb(68, 90, 114)'
        this.ctx.fillStyle = 'rgb(68, 90, 114)'
        this.ctx.lineWidth = 2
    }

    set color(color) {
        this.ctx.strokeStyle = color
        this.ctx.fillStyle = color
    }
    set lineWidth(width) {
        this.ctx.lineWidth = width
    }
}
