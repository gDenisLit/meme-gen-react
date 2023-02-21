import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EditorTools() {
    return (
        <section className="editor-tools flex-column items-center">
            <input type="text" placeholder="Enter text here" />
            <div className="row row1">
                <button className="btn"><FontAwesomeIcon icon={'arrow-up-arrow-down'} /></button>
                <button className="btn"><FontAwesomeIcon icon={'plus'} /></button>
                <button className="btn"><FontAwesomeIcon icon={'trash'} /></button>
            </div>
            <div className="row row2">
                <button className="btn">A
                    <span><FontAwesomeIcon icon={'plus'} /></span>
                </button>
                <button className="btn">A
                    <span><FontAwesomeIcon icon={'minus'} /></span>
                </button>
                <button className="btn"><FontAwesomeIcon icon={'align-left'} /></button>
                <button className="btn"><FontAwesomeIcon icon={'align-center'} /></button>
                <button className="btn"><FontAwesomeIcon icon={'align-right'} /></button>
                <select>
                    <option value="impact">Impact</option>
                </select>
                <button className="btn">
                    <input type="color" hidden />
                    <FontAwesomeIcon icon={'fill-drip'} />
                </button>
                <button className="btn">
                    <input type="color" hidden />
                    <FontAwesomeIcon icon={'paint-brush'} />
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