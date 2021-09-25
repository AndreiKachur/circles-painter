import { makeAutoObservable } from "mobx";

class CanvasState {
    width = 700
    height = 500

    constructor() {
        makeAutoObservable(this)
    }

    setCanvasSize(size) {
        switch (size) {
            case 'small':
                this.width = 600
                this.height = 400
                return
            case 'middle':
                this.width = 700
                this.height = 500
                return
            case 'large':
                this.width = 900
                this.height = 550
                return
            default: return
        }
    }
}

export default new CanvasState()
