import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null
    fill = false
    stroke = true
    center = false
    autoClean = false

    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool) {
        this.tool = tool
    }
    setFill(fill) {
        this.fill = fill
    }
    setStroke(stroke) {
        this.stroke = stroke
    }
    setCenter(center) {
        this.center = center
    }
    setAutoClean(autoClean) {
        this.autoClean = autoClean
    }
    setColor(color) {
        this.tool.color = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()
