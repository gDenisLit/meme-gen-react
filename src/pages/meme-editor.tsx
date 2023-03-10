import { EditorTools } from "@/components/editor-tools"
import { useEventBus } from "@/hooks/useEventBus"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Canvas } from "../components/canvas"
import { Meme } from "../models/Meme.model"
import { memeService } from "../services/meme.service"

export function MemeEditor() {

    const [meme, setMeme] = useState<Meme>()
    const { id } = useParams()
    const [subscribe, unsubscribe] = useEventBus()

    useEffect(() => {
        loadMeme()
        subscribe('switch-line', onSetLine)
        return () => {
            unsubscribe()
        }
    }, [id])

    async function loadMeme() {
        if (!id) return
        const meme = await memeService.getMeme(id)
        setMeme(meme)
    }

    function onCrudLine(type: string) {
        const meme = memeService.updateMeme(type)
        setMeme(meme)
    }

    function onLineEdit(key: string, value: string | number) {
        const meme = memeService.updateLine(key, value)
        setMeme(meme)
    }

    function onSetLine(lineIdx: number) {
        const meme = memeService.setCurrLine(lineIdx)
        setMeme(meme)
    }

    return (
        <main className="meme-editor main-layout">
            {meme &&
                <section className="meme-editor__inner flex-row">
                    <Canvas meme={meme} />
                    <EditorTools
                        meme={meme}
                        onCrudLine={onCrudLine}
                        onLineEdit={onLineEdit}
                    />
                </section>
            }
        </main>
    )
}