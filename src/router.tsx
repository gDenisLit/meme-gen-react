import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home-page"
import { MemeEditor } from "./pages/meme-editor"

export function RouterView() {
    return (
        <Routes>
            <Route element={<MemeEditor />} path="/editor/:id" />
            <Route element={<HomePage />} path="/" />
        </Routes>
    )
}