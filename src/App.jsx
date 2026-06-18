import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import WelcomePage from './pages/WelcomePage'
import HomePage from './pages/HomePage'
import GrainOverlay from './components/GrainOverlay'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const hasLoadedList = useRef(false)

  useEffect(() => {
    // Only force user back to the welcome screen on the VERY FIRST load/hard refresh.
    if (!hasLoadedList.current) {
      hasLoadedList.current = true
      if (window.location.pathname !== '/') {
        navigate('/')
      }
    }
  }, [navigate])

  return (
    <>
      <GrainOverlay />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
