import { utilService } from "../services/util.service"

export class Line {
    [key: string]: string | number | boolean
    _id: string
    txt: string
    fontSize: number
    textAlign: CanvasTextAlign
    strokeStyle: string
    fillStyle: string
    font: string
    isDrag: boolean
    textBaseline: CanvasTextBaseline
    lineWidth: number

    constructor() {
        this._id = utilService.makeId()
        this.txt = 'Your Text'
        this.fontSize = 50
        this.textAlign = 'start'
        this.strokeStyle = '#000000'
        this.fillStyle = '#ffffff'
        this.font = `Impact`
        this.isDrag = false
        this.textBaseline = 'top'
        this.lineWidth = this.fontSize / 15
    }
}


