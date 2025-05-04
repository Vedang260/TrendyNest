import { Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ChatButton from './components/ChatButton'

function App() {

  return (
    <>
      <div>
      <Toaster position="top-right" />
      <Outlet /> {/* Renders child routes like Home, Register, etc. */}
      <ChatButton />
    </div>
    </>
  )
}

export default App
