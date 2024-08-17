import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './components/app/App.tsx'
import './index.css'

const rootElement = document.querySelector("#root") as HTMLElement;
createRoot(rootElement).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
