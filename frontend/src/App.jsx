import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import SubjectsPage from './pages/SubjectsPage';
import MarksPage from './pages/MarksPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="container mt-4">
      <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/students/*" element={<StudentsPage />} />
  <Route path="/subjects/*" element={<SubjectsPage />} />
  <Route path="/marks/*" element={<MarksPage />} />
</Routes>
      </div>
    </div>
  );
}

export default App;