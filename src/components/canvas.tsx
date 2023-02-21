import { Line } from "@/models/Line.model"
import { useEffect, useRef, useState } from "react"
import { Meme } from "../models/Meme.model"

type Props = {
    meme: Meme
}
type ElCanvas = HTMLCanvasElement | null
type Ctx = CanvasRenderingContext2D | null
type Pos = { x: number, y: number }
type PosY = { [idx: number]: number }

export function Canvas({ meme }: Props) {

    const canvasRef = useRef<ElCanvas>(null)
    const [elCanvas, setElCanvas] = useState<ElCanvas>(null)
    const [ctx, setCtx] = useState<Ctx>(null)
    const [arcPos, setArcPos] = useState<Pos>({ x: 0, y: 0 })

    useEffect(() => { loadCanvas() }, [])
    useEffect(() => { renderMeme() }, [ctx, meme])

    function loadCanvas() {
        if (!canvasRef.current) return
        setElCanvas(canvasRef.current)
        setCtx(canvasRef.current.getContext('2d'))
    }

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
        meme.lines.forEach((line: Line, idx) => {

            ctx.font = `${line.fontSize}px ${line.font}`
            ctx.textAlign = line.textAlign
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
        console.log('drawing outline')
        const { fontSize } = meme.lines[meme.currLine]
        let { x, y, textWidth } = getLinePos(meme.currLine)
        if (!textWidth) textWidth = 10

        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 5
        ctx.rect(x - 10, y - 10, textWidth + 20, fontSize + 20)
        ctx.stroke()

        const arcPos = {
            x: x + textWidth + 10,
            y: y + fontSize + 10
        }
        ctx.beginPath()
        ctx.arc(arcPos.x, arcPos.y, 10, 0, 2 * Math.PI)
        ctx.fill()
        setArcPos(arcPos)
    }

    function getLinePos(lineIdx: number) {
        if (!elCanvas) return { x: 0, y: 0 }

        const width = elCanvas?.width
        const height = elCanvas?.height

        const textWidth = ctx?.measureText(meme.lines[lineIdx].txt).width || 10
        const x = (textWidth) ? (width / 2) - (textWidth / 2) : 0

        const posY: PosY = {
            0: height * 0.03,
            1: height * 0.85,
            2: height * 0.4
        }
        const y = posY[lineIdx]
        return { x, y, textWidth }
    }

    function handleClick(ev: any) {

    }

    function handleMouseMove(ev: any) {
        if (!elCanvas) return
        const clickedPos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        const distance = Math.sqrt((arcPos.x - clickedPos.x) ** 2 + (arcPos.y - clickedPos.y) ** 2)
        elCanvas.style.cursor = (distance > 10) ? '' : 'nwse-resize'
    }

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
        />
    )
}