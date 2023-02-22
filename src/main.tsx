import ReactDOM from 'react-dom/client'
import App from '.'
import './index.scss'
import { icons } from '@/plugins/icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(...icons)
const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(<App />)
