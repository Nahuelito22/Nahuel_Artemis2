import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-space-dark text-space-gray selection:bg-space-blue selection:text-space-dark">
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center min-h-screen"><h1 className="text-4xl font-bold text-space-blue">Artemis II Project Initialized</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
