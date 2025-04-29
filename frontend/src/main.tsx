import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
// import { Provider } from 'react-redux'
// import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    {/* </Provider> */}
  </React.StrictMode>
)
