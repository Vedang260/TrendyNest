import { Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <div>
      <Toaster position="top-right" />
      <Outlet /> {/* Renders child routes like Home, Register, etc. */}
    </div>
    </>
  )
}

export default App
