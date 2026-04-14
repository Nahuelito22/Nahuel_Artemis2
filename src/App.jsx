import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Crew from './pages/Crew';
import MissionDetails from './pages/MissionDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-space-dark text-space-gray selection:bg-space-blue selection:text-space-dark">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/mission" element={<MissionDetails />} />
            {/* Redirect for the NavLink in Navbar that pointed to /spacecraft for now */}
            <Route path="/spacecraft" element={<MissionDetails />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
