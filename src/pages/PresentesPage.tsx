import { useState, useEffect } from 'react';
import '../styles/PresentesPage.css';

const presentes = [
  { nome: 'Cartinha virtual 💌', preco: 0 },
  { nome: 'Uma oração 🙏', preco: 0 },
  { nome: 'Kit para bolo', preco: 50, imagem: '/images/kit-bolo.jpg' },
  { nome: 'Xicaras', preco: 70, imagem: '/images/Conjunto-de-xicaras.jpg' },
  { nome: 'Jogo de copos (6 unid.)', preco: 90, imagem: '/images/jogo-de-copos.jpg' },
  { nome: 'Jogo de toalhas', preco: 120, imagem: '/images/toalhas.jpg' },
  { nome: 'Ventilador de mesa', preco: 140, imagem: '/images/tufao.jpg' },
  { nome: 'Liquidificador', preco: 180, imagem: '/images/Liquidificador.webp' },
  { nome: 'Cafeteira elétrica', preco: 230, imagem: '/images/cafeteira.jpg' },
  { nome: 'Conjunto de talheres', preco: 250, imagem: '/images/conjunto-de-talheres.avif' },
  { nome: 'Jogo de cama queen', preco: 280, imagem: '/images/cama.webp' },
  { nome: 'Conjunto de panelas', preco: 320, imagem: '/images/panelas.webp' },
  { nome: 'Aparelho de jantar', preco: 350, imagem: '/images/jantas.jpg' },
  { nome: 'Micro-ondas (cota)', preco: 400, imagem: '/images/micro-ondas.jpg' },
  { nome: 'Aparador de entrada', preco: 450, imagem: '/images/aparador.jpg' },
  { nome: 'Echo show (Alexa)', preco: 500, imagem: '/images/echo-show.jpg' },
  { nome: 'Kit viagem (malas ou acessórios)', preco: 600, imagem: '/images/kit-mala.webp' },
  { nome: 'Air fryer', preco: 680, imagem: '/images/Fryer.jpg' },
  { nome: 'Armário de cozinha', preco: 850, imagem: '/images/Armario.webp' },
  { nome: 'Smart TV 42"', preco: 1200, imagem: '/images/tv.jpg' },
  { nome: 'Geladeira (cota)', preco: 1400, imagem: '/images/geladeira.jpg' },
  { nome: 'Máquina de lavar (cota)', preco: 1600, imagem: '/images/lavadora.jpg' },
  { nome: 'Robô aspirador inteligente', preco: 2000, imagem: '/images/robo-aspirador.webp' },
];

const PresentesPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(8);

  // Detecta largura da tela e ajusta itens por página
  useEffect(() => {
    function ajustarItensPorPagina() {
      const largura = window.innerWidth;
      if (largura < 768) {
        setItensPorPagina(6);  
      } else if (largura < 1024) {
        setItensPorPagina(6);   // tablet: 6 itens
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
