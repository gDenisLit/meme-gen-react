import { Img } from "../models/Img.model"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

export const galleryService = {
    getImgs,
    getImgById,
}

const KEY = 'img_db'

function getImgs(): Promise<Img[]> {
    return storageService.query(KEY)
}

function getImgById(imgId: string): Promise<Img> {
    return storageService.get(KEY, imgId)
}

; (async () => {
    try {
        const imgs = await storageService.query(KEY) || []
        if (!imgs.length) {
            for (let i = 1; i <= 18; i++) {
                imgs.push({
                    _id: utilService.makeId(),
                    url: `${import.meta.env.BASE_URL}src/assets/imgs/${i}.jpg`
                })
            }
            utilService.saveToStorage(KEY, imgs)
        }
    }
    catch (err) {
        console.log(err)
    }
})()