// App.tsx
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import PresentesPage from './pages/PresentesPage'; 
import Home from './pages/Home'; 

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<PresentesPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
