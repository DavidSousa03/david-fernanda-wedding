import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import DetalhesDia from './components/DetalhesDia';
import Localizacao from './components/Localizacao';
import ConfirmacaoPresenca from './components/ConfirmacaoEDressCode';
import Agradecimento from './components/Agradecimento';
import ListaPresentes from './components/ListaPresentes'; 
import PresentesPage from './pages/PresentesPage'; 

const Home = () => {
  return (
    <>
      <TopBar />
      <HeroSection />
      <DetalhesDia />
      <Localizacao />
      <ListaPresentes />
      <ConfirmacaoPresenca />
      <Agradecimento />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/theweddingofdavidandfernanda/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<PresentesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
