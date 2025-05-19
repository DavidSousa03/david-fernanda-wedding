import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import DetalhesDia from '../components/DetalhesDia';
import Localizacao from '../components/Localizacao';
import ConfirmacaoPresenca from '../components/ConfirmacaoEDressCode';
import Agradecimento from '../components/Agradecimento';
import ListaPresentes from '../components/ListaPresentes';

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

export default Home;
