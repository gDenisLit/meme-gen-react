import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Meme } from "../models/Meme.model"
import { memeService } from "../services/meme.service"

export function MemeEditor() {

    const [meme, setMeme] = useState<Meme>()
    const { id } = useParams()

    useEffect(() => {
        loadMeme()
    }, [id])

    async function loadMeme() {
        if (!id) return
        const meme = await memeService.getMeme(id)
        setMeme(meme)
    }

    return (
        <h1>Meme Editor here</h1>
    )
}