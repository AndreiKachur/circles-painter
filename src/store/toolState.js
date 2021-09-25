import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null
    fill = false
    stroke = true
    center = false
    autoClean = false
    brush = 'circle'

    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool) {
        this.tool = tool
    }
    setChecked(e) {
        const checked = e.target.checked
        switch (e.target.id) {
            case 'fill': return this.fill = checked
            case 'stroke': return this.stroke = checked
            case 'center': return this.center = checked
            case 'auto-clean': return this.autoClean = checked
            default: return
        }
    }
    setBrush(brush) {
        this.brush = brush
    }
    setColor(color) {
        this.tool.color = color
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()
