import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ProgramList from './pages/ProgramList'
import ProgramDetail from './pages/ProgramDetail'
import DonationForm from './pages/DonationForm'
import VolunteerForm from './pages/VolunteerForm'
import Admin from './pages/Admin'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<ProgramList />} />
              <Route path="/programs/:id" element={<ProgramDetail />} />
              <Route path="/donate" element={<DonationForm />} />
              <Route path="/volunteer" element={<VolunteerForm />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
