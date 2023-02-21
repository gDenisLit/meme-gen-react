import { utilService } from "../services/util.service"
import { Img } from "./Img.model"
import { Line } from "./Line.model"

export class Meme {
    _id: string
    img: Img
    lines: Line[]

    constructor(img: Img) {
        this._id = utilService.makeId()
        this.img = img
        this.lines = []
        for (let i = 0; i < 3; i++) {
            this.lines.push(new Line())
        }
    }
}