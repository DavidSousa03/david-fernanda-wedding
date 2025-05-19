import { useState, useEffect } from 'react';
import '../styles/PresentesPage.css';
import imagens from '../components/Imagens';

const presentes = [
  { nome: 'Cartinha virtual 💌', preco: 0 },
  { nome: 'Uma oração 🙏', preco: 0 },
  { nome: 'Kit para bolo', preco: 50, imagem: imagens.KitBolo },
  { nome: 'Xicaras', preco: 70, imagem: imagens.Xicaras },
  { nome: 'Jogo de copos (6 unid.)', preco: 90, imagem: imagens.Copos },
  { nome: 'Jogo de toalhas', preco: 120, imagem: imagens.Toalhas },
  { nome: 'Ventilador de mesa', preco: 140, imagem: imagens.Ventilador },
  { nome: 'Liquidificador', preco: 180, imagem: imagens.Liquidificador },
  { nome: 'Cafeteira elétrica', preco: 230, imagem: imagens.Cafeteira },
  { nome: 'Conjunto de talheres', preco: 250, imagem: imagens.Talheres },
  { nome: 'Jogo de cama queen', preco: 280, imagem: imagens.Cama },
  { nome: 'Conjunto de panelas', preco: 320, imagem: imagens.Panelas },
  { nome: 'Aparelho de jantar', preco: 350, imagem: imagens.Janta },
  { nome: 'Micro-ondas (cota)', preco: 400, imagem: imagens.MicroOndas },
  { nome: 'Aparador de entrada', preco: 450, imagem: imagens.Aparador },
  { nome: 'Echo show (Alexa)', preco: 500, imagem: imagens.Alexa },
  { nome: 'Kit viagem (malas ou acessórios)', preco: 600, imagem: imagens.KitMala },
  { nome: 'Air fryer', preco: 680, imagem: imagens.AirFryer },
  { nome: 'Armário de cozinha', preco: 850, imagem: imagens.Armario },
  { nome: 'Smart TV 42"', preco: 1200, imagem: imagens.TV },
  { nome: 'Geladeira (cota)', preco: 1400, imagem: imagens.Geladeira },
  { nome: 'Máquina de lavar (cota)', preco: 1600, imagem: imagens.Lavadora },
  { nome: 'Robô aspirador inteligente', preco: 2000, imagem: imagens.RoboAspirador },
];

const PresentesPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(8);

  useEffect(() => {
    function ajustarItensPorPagina() {
      const largura = window.innerWidth;
      if (largura < 768) {
        setItensPorPagina(6);  
      } else if (largura < 1024) {
        setItensPorPagina(6);   
      } else {
        setItensPorPagina(10);   
      }
    }

    ajustarItensPorPagina();

    window.addEventListener('resize', ajustarItensPorPagina);
    return () => window.removeEventListener('resize', ajustarItensPorPagina);
  }, []);

  useEffect(() => {
    setPaginaAtual(1); 
  }, [itensPorPagina]);

  const totalPaginas = Math.ceil(presentes.length / itensPorPagina);

  const presentesVisiveis = presentes.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    
    <div className="pagina-presentes">
      <h2>Escolha um presente com carinho 💛</h2>
      <p className="intro">
        Abaixo estão alguns presentes simbólicos para nos ajudar a montar nosso lar. Obrigado por fazer parte disso!
      </p>

      <div className="presentes-grid">
        {presentesVisiveis.map((presente, index) => (
          <div key={index} className="presente-card">
            {presente.imagem ? (
              <img src={presente.imagem} alt={presente.nome} />
            ) : (
              <div className="imagem-placeholder">🎁</div>
            )}
            <h3>{presente.nome}</h3>
            <p>R$ {presente.preco.toFixed(2)}</p>
            <button>Presentear</button>
          </div>
        ))}
      </div>

      <div className="paginacao">
        <button onClick={() => setPaginaAtual(p => Math.max(1, p - 1))} disabled={paginaAtual === 1}>
          ← Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))} disabled={paginaAtual === totalPaginas}>
          Próxima →
        </button>
      </div>

      <div className="pix-section">
        <h3>Prefere contribuir com Pix?</h3>
        <p>Chave Pix: <strong>casamento@exemplo.com</strong></p>
      </div>
    </div>
  );
};

export default PresentesPage;
