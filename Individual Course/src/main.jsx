import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Experiment } from './reactjs/experimentPresenter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Experiment />
  </StrictMode>,
)