import { Img } from "../models/Img.model"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

export const galleryService = {
    getImgs
}

const KEY = 'img_db'

function getImgs(): Promise<Img[]> {
    return storageService.query(KEY)
}

; (async () => {
    try {
        const imgs = await storageService.query(KEY) || []
        if (!imgs.length) {
            for (let i = 1; i <= 18; i++) {
                imgs.push({
                    _id: utilService.makeId(),
                    url: `src/assets/imgs/${i}.jpg`
                })
            }
            utilService.saveToStorage(KEY, imgs)
        }
    }
    catch (err) {
        console.log(err)
    }
})()