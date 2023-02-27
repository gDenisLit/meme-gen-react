import { Line } from "@/models/Line.model"
import { Meme } from "@/models/Meme.model"
import { useEffect, useRef, useState } from "react"
import { eventBus } from "@/services/event-bus.service"

type ElCanvas = HTMLCanvasElement | null
type Ctx = CanvasRenderingContext2D | null
type Pos = { x: number, y: number, textWidth?: number }
type PosY = { [idx: number]: number }
type PosX = { [key: string]: number }

export const useCanvas = (meme: Meme) => {

    const canvasRef = useRef<ElCanvas>(null)
    const ctxRef = useRef<Ctx>(null)
    const [arcPos, setArcPos] = useState<Pos>()

    function initCanvas() {
        if (!canvasRef.current) return
        ctxRef.current = canvasRef.current.getContext('2d')
        renderMeme()
    }

    useEffect(() => {
        renderMeme()
    }, [meme])

    function renderMeme() {
        const elCanvas = canvasRef.current
        const ctx = ctxRef.current
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
        const elCanvas = canvasRef.current
        const ctx = ctxRef.current
        if (!ctx || !elCanvas) return

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
        const elCanvas = canvasRef.current
        const ctx = ctxRef.current
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
        ctx.fillStyle = '#fff'
        ctx.arc(arcPos.x, arcPos.y, elCanvas.width * 0.015, 0, 2 * Math.PI)
        ctx.fill()
        setArcPos(arcPos)
    }

    function getLinePos(lineIdx: number) {
        const elCanvas = canvasRef.current
        const ctx = ctxRef.current
        if (!elCanvas || !ctx) return { x: 0, y: 0 }

        const width = elCanvas.width
        const height = elCanvas.height
        const { txt, fontSize } = meme.lines[lineIdx]
        const textWidth = ctx.measureText(txt).width || 10
        const textHeight = (elCanvas.width * 0.08) + (fontSize * 0.1)

        const posX: PosX = {
            'start': width * 0.03,
            'center': (width / 2) - (textWidth / 2),
            'end': width - textWidth - (width * 0.03)
        }
        const posY: PosY = {
            0: height * 0.03,
            1: height * 0.83,
            2: height * 0.4
        }
        const x = posX[meme.lines[lineIdx].textAlign]
        const y = posY[lineIdx]
        return { x, y, textWidth, textHeight }
    }

    function onMouseOver(ev: any) {
        const elCanvas = canvasRef.current
        if (!elCanvas || !arcPos) return

        const clickedPos = getClickedPos(ev)
        const distanceFromResize = Math.sqrt((arcPos.x - clickedPos.x) ** 2 + (arcPos.y - clickedPos.y) ** 2)
        const isOverCurrLine = isOverLine(meme.currLine, clickedPos)
        const isOverText = meme.lines.some((line, i) => {
            return (i === meme.currLine) ? false : isOverLine(i, clickedPos)
        })
        let cursor = ''
        if (distanceFromResize < 10) cursor = 'nwse-resize'
        else if (isOverCurrLine) cursor = 'all-scroll'
        else if (isOverText) cursor = 'pointer'
        elCanvas.style.cursor = cursor
    }

    function getClickedPos(ev: any) {
        const { offsetLeft, clientLeft, offsetTop, clientTop } = ev.target
        return {
            x: ev.pageX - offsetLeft - clientLeft,
            y: ev.pageY - offsetTop - clientTop,
        }
    }

    function isOverLine(i: number, clickedPos: Pos) {

        const { x, y, textWidth, textHeight } = getLinePos(i)
        return (
            clickedPos.x > x &&
            clickedPos.x < x + textWidth! &&
            clickedPos.y > y &&
            clickedPos.y < y + textHeight!
        )
    }

    function onMouseDown(ev: any) {
        meme.lines.forEach((line, i) => {
            const clickedPos = getClickedPos(ev)
            const isClickOnLine = isOverLine(i, clickedPos)
            if (isClickOnLine) {
                eventBus.emit('switch-line', i)
                console.log('clicked on line')
            }
        })
    }

    return {
        canvasRef,
        initCanvas,
        onMouseOver,
        onMouseDown
    }
}

