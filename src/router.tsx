import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home-page"

export function RouterView() {
    return (
        <Routes>
            <Route element={<HomePage />} path="/" />
        </Routes>
    )
}