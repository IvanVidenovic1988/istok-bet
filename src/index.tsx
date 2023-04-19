import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './shared/redux/store'

import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="bg-[#1a1c1d]">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
)
