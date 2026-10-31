import { Route, Routes } from 'react-router-dom'
import { APP_NAME } from './config'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Emergency from './pages/Emergency'
import Guides from './pages/Guides'
import Shelters from './pages/Shelters'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">{APP_NAME}</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
