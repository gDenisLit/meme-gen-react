import { Line } from "@/models/Line.model"
import { useEffect, useRef, useState } from "react"
import { Meme } from "../models/Meme.model"
import { useCanvas } from "@/hooks/useCanvas"

type Props = {
    meme: Meme
}

export function Canvas({ meme }: Props) {

    const { canvasRef, renderMeme, onMouseOver } = useCanvas(meme)

    useEffect(() => {
        renderMeme()
    }, [meme])

    function handleMouseMove(ev: any) {
        const clickedPos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        onMouseOver(clickedPos)
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
        />
    )
}