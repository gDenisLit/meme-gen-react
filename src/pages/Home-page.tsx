import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { galleryService } from "../services/gallery.service"
import { Img } from "../models/Img.model"
import { ImgList } from "../components/img-list"

export function HomePage() {

    const [imgs, setImgs] = useState<Img[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        loadImgs()
    }, [])

    async function loadImgs() {
        const imgs = await galleryService.getImgs()
        if (imgs) setImgs(imgs)
    }

    function onImgSelect(imgId: string) {
        console.log(imgId)
        navigate(`editor/${imgId}`)
    }

    return (
        <main className="home-page main-layout">
            <section className="home-page__inner">
                {imgs.length &&
                    <ImgList
                        imgs={imgs}
                        onImgSelect={onImgSelect}
                    />
                }
            </section>
        </main>
    )
}