import { Line } from "@/models/Line.model"
import { Meme } from "../models/Meme.model"
import { galleryService } from "./gallery.service"
import { utilService } from "./util.service"

const KEY = 'curr_meme'
type CrudMap = { [type: string]: (meme: Meme) => void }

export const memeService = {
    getMeme,
    updateMeme,
    updateLine,
}

async function getMeme(imgId: string) {
    const img = await galleryService.getImgById(imgId)
    const meme = new Meme(img)
    utilService.saveToStorage(KEY, meme)
    return meme
}

function updateMeme(type: string) {
    const meme: Meme = utilService.loadFromStorage(KEY)
    const crudMap: CrudMap = {
        switch: switchLines,
        add: addNewLine,
        remove: removeLine
    }
    crudMap[type](meme)
    utilService.saveToStorage(KEY, meme)
    return meme
}

function updateLine(key: string, value: string | number) {
    const meme: Meme = utilService.loadFromStorage(KEY)
    const line = meme.lines[meme.currLine]
    if (typeof value !== 'number') line[key] = value
    else {
        let val: number = +line[key]
        val += value
        line[key] = val
    }
    console.log(meme)
    utilService.saveToStorage(KEY, meme)
    return meme
}

function switchLines(meme: Meme) {
    if (meme.currLine === meme.lines.length - 1) meme.currLine = 0
    else meme.currLine++
}

function addNewLine(meme: Meme) {
    const line = new Line()
    meme.lines.push(line)
}

function removeLine(meme: Meme) {
    meme.lines.splice(meme.currLine, 1)
}

