import { Img } from "../models/Img.model"
import { Meme } from "../models/Meme.model"
import { galleryService } from "./gallery.service"

export const memeService = {
    getMeme
}

async function getMeme(imgId: string) {
    const img = await galleryService.getImgById(imgId)
    return new Meme(img)
}

