import { useEffect } from "react"
import { Meme } from "../models/Meme.model"
import { useCanvas } from "@/hooks/useCanvas"

type Props = {
    meme: Meme
}

export function Canvas({ meme }: Props) {

    const {
        canvasRef,
        initCanvas,
        onMouseOver,
        onMouseDown,
    } = useCanvas(meme)
    useEffect(initCanvas, [])

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={onMouseOver}
            onMouseDown={onMouseDown}
        />
    )
}