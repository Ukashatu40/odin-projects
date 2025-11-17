import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
