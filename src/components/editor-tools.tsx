import { Meme } from "@/models/Meme.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    meme: Meme
    onCrudLine: (type: string) => void
    onLineEdit: (key: string, value: string | number) => void
}

export function EditorTools({ meme, onCrudLine, onLineEdit }: Props) {

    function handleInput({ target }: any) {
        const { name, value } = target
        onLineEdit(name, value)
    }
    const line = meme.lines[meme.currLine]
    return (
        <section className="editor-tools flex-column items-center">
            <input type="text" placeholder="Enter text here" name="txt" onChange={handleInput} value={line?.txt || ' '} />
            <div className="row row1">
                <button className="btn" onClick={() => { onCrudLine('switch') }}><FontAwesomeIcon icon={'arrow-up-arrow-down'} /></button>
                <button className="btn" onClick={() => { onCrudLine('add') }}><FontAwesomeIcon icon={'plus'} /></button>
                <button className="btn" onClick={() => { onCrudLine('remove') }}><FontAwesomeIcon icon={'trash'} /></button>
            </div>
            <div className="row row2">
                <button className="btn" onClick={() => { onLineEdit('fontSize', 10) }}>A
                    <span><FontAwesomeIcon icon={'plus'} /></span>
                </button>
                <button className="btn" onClick={() => { onLineEdit('fontSize', -10) }}>A
                    <span><FontAwesomeIcon icon={'minus'} /></span>
                </button>
                <button className="btn" onClick={() => { onLineEdit('textAlign', 'start') }}><FontAwesomeIcon icon={'align-left'} /></button>
                <button className="btn" onClick={() => { onLineEdit('textAlign', 'center') }}><FontAwesomeIcon icon={'align-center'} /></button>
                <button className="btn" onClick={() => { onLineEdit('textAlign', 'end') }}><FontAwesomeIcon icon={'align-right'} /></button>
                <select onChange={handleInput} name="font" value={line?.font}>
                    <option value="Impact">Impact</option>
                    <option value="Ariel">Ariel</option>
                </select>
                <button className="btn">
                    <input type="color" name="strokeStyle" onChange={handleInput} value={line?.strokeStyle} />
                    <FontAwesomeIcon icon={'paint-brush'} />
                </button>
                <button className="btn">
                    <input type="color" name="fillStyle" onChange={handleInput} value={line?.fillStyle} />
                    <FontAwesomeIcon icon={'fill-drip'} />
                </button>
            </div>
            <div className="row row3">
                <button className="btn"><FontAwesomeIcon icon={'share-nodes'} /> Share</button>
                <button className="btn"><FontAwesomeIcon icon={'download'} /> Download</button>
                <button className="btn"><FontAwesomeIcon icon={'save'} /> Save</button>
            </div>
        </section>
    )
}