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
    setToolParam(e) {
        const t = e.target
        switch (t.id) {
            case 'stroke-color': return this.tool.color = t.value
            case 'fill': return this.fill = t.checked
            case 'stroke': return this.stroke = t.checked
            case 'center': return this.center = t.checked
            case 'auto-clean': return this.autoClean = t.checked
            default: return
        }
    }
    setBrush(brush) {
        this.brush = brush
    }
    setLineWidth(width) {
        this.tool.lineWidth = width
    }
}

export default new ToolState()
