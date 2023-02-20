import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="main-layout">
            <section className="app-header flex-row space-between">
                <h1 className="logo">meme by denis lit</h1>
                <ul className="page-nav clean-list flex-row">
                    <li><NavLink className="link" to="/">Gallery</NavLink></li>
                    <li><NavLink className="link" to="/">About</NavLink></li>
                    <li><NavLink className="link" to="/">My Memes</NavLink></li>
                </ul>
            </section>
        </header>
    )
}