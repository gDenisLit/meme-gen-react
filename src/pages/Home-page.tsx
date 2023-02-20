import { Fragment, useEffect, useState } from "react"
import { galleryService } from "../services/gallery.service"
import { Img } from "../models/Img.model"
import { AppHeader } from "../components/app-header"

export function HomePage() {

    const [imgs, setImgs] = useState<Img[]>([])

    useEffect(() => {
        loadImgs()
    }, [])

    async function loadImgs() {
        const imgs = await galleryService.getImgs()
        if (imgs) setImgs(imgs)
    }

    return (
        <Fragment>
            <AppHeader />
            <main>
                <ul>
                    {imgs.length && imgs?.map((img: Img) => {
                        return (
                            <li key={img._id}>
                                <img src={img.url} alt={img._id} />
                            </li>
                        )
                    })}
                </ul>
            </main>
        </Fragment>
    )
}