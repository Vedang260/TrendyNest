import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <h1>App Layout</h1>
      <Toaster position="top-center" />
    </>
  )
}

export default App
