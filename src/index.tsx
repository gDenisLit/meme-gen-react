import { BrowserRouter as Router } from "react-router-dom";
import { AppHeader } from "./components/app-header"
import { RouterView } from "./router"

export default function App() {
    return (
        <Router>
            <AppHeader />
            <RouterView />
        </Router>
    )
}