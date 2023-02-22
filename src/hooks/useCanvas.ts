import { Line } from "@/models/Line.model"
import { Meme } from "@/models/Meme.model"
import { useEffect, useRef, useState } from "react"

type ElCanvas = HTMLCanvasElement
type Ctx = CanvasRenderingContext2D | null
type Pos = { x: number, y: number, textWidth?: number }
type PosY = { [idx: number]: number }
type PosX = { [key: string]: number }

export const useCanvas = (meme: Meme) => {

    const canvasRef = useRef(null)
    const [elCanvas, setElCanvas] = useState<ElCanvas>()
    const [ctx, setCtx] = useState<Ctx>()
    const [arcPos, setArcPos] = useState<Pos>()

    useEffect(() => {
        if (!canvasRef.current) return
        setElCanvas(canvasRef.current)
    })

    useEffect(() => {
        if (!elCanvas) return
        const ctx = elCanvas.getContext('2d')
        setCtx(ctx)
    }, [elCanvas])

    useEffect(() => {
        if (!ctx) return
        renderMeme()
    }, [ctx])

    function renderMeme() {
        if (!ctx || !elCanvas) return

        const elImg = new Image()
        const { url } = meme.img

        elImg.src = url
        elImg.onload = () => {
            elCanvas.width = elImg.naturalWidth
            elCanvas.height = elImg.naturalHeight
            ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height)
            drawLines()
        }
    }

    function drawLines() {
        if (!ctx || !elCanvas) return
        if (!meme.lines.length) return
        meme.lines.forEach((line: Line, idx) => {
            ctx.font = `${(elCanvas.width * 0.08) + (line.fontSize * 0.1)}px ${line.font}`
            ctx.textAlign = 'start'
            ctx.textBaseline = line.textBaseline
            ctx.lineWidth = line.lineWidth
            ctx.strokeStyle = line.strokeStyle
            ctx.fillStyle = line.fillStyle

            const { x, y } = getLinePos(idx)
            ctx.strokeText(line.txt, x, y, elCanvas.width)
            ctx.fillText(line.txt, x, y, elCanvas.width)

            if (idx === meme.currLine) drawOutline()
        })
    }

    function drawOutline() {
        if (!ctx || !elCanvas) return
        const { fontSize } = meme.lines[meme.currLine]
        const bottomRight = (elCanvas.width * 0.08) + (fontSize * 0.1)
        let { x, y, textWidth } = getLinePos(meme.currLine)
        if (!textWidth) textWidth = 10

        ctx.strokeStyle = '#fff'
        ctx.lineWidth = elCanvas.width * 0.01
        ctx.rect(x - 10, y - elCanvas.height * 0.01, textWidth + 20, bottomRight + elCanvas.height * 0.015)
        ctx.stroke()

        const arcPos = {
            x: x + textWidth + 10,
            y: y + bottomRight + elCanvas.height * 0.01
        }
        ctx.beginPath()
        ctx.arc(arcPos.x, arcPos.y, elCanvas.width * 0.015, 0, 2 * Math.PI)
        ctx.fill()
        setArcPos(arcPos)
    }

    function getLinePos(lineIdx: number) {
        if (!elCanvas || !ctx) return { x: 0, y: 0 }

        const width = elCanvas.width
        const height = elCanvas.height
        const { txt } = meme.lines[lineIdx]
        const textWidth = ctx.measureText(txt).width || 10

        const posX: PosX = {
            'start': width * 0.03,
            'center': (width / 2) - (textWidth / 2),
            'end': width - textWidth - (width * 0.03)
        }
        const posY: PosY = {
            0: height * 0.03,
            1: height * 0.85,
            2: height * 0.4
        }
        const x = posX[meme.lines[lineIdx].textAlign]
        const y = posY[lineIdx]
        return { x, y, textWidth }
    }

    function isOverResize(clickedPos: Pos) {
        if (!elCanvas || !arcPos) return
        const distance = Math.sqrt((arcPos.x - clickedPos.x) ** 2 + (arcPos.y - clickedPos.y) ** 2)
        return distance < 10
    }

    return {
        canvasRef,
        renderMeme
    }
}