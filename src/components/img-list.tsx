import { Img } from "../models/Img.model"

type Props = {
    imgs: Img[]
    onImgSelect: (imgId: string) => void
}

export function ImgList({ imgs, onImgSelect }: Props) {
    return (
        <ul className="img-list clean-list">
            {imgs.map((img: Img) => (
                <li 
                    key={img._id} 
                    className="img-preview" 
                    onClick={() => { onImgSelect(img._id) }}
                >
                    <img src={img.url} alt="" />
                </li>
            ))}
        </ul>
    )
}