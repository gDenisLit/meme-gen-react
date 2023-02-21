import { utilService } from "../services/util.service"

export class Line {
    _id: string
    txt: string
    fontSize: number
    align: string
    stroke: string
    fill: string
    font: string
    isDrag: boolean

    constructor() {
        this._id = utilService.makeId()
        this.txt = 'Your Text',
        this.fontSize = 50,
        this.align = 'center',
        this.stroke = '#000000',
        this.fill = '#ffffff',
        this.font = 'Impact',
        this.isDrag = false
    }
}


