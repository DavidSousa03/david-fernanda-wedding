import { useState, useEffect } from "react";
import "../styles/PresentesPage.css";
import imagens from "../components/Imagens";
import TopBarMinimal from "../components/TopBarMinimal";

type Presente = {
  nome: string;
  preco: number;
  imagem?: string;
};

const presentesOriginais: Presente[] = [
  { nome: "Kit para bolo", preco: 50, imagem: imagens.KitBolo },
  { nome: "Xicaras", preco: 70, imagem: imagens.Xicaras },
  { nome: "Jogo de copos (6 unid.)", preco: 90, imagem: imagens.Copos },
  { nome: "Jogo de toalhas", preco: 120, imagem: imagens.Toalhas },
  { nome: "Ventilador de mesa", preco: 140, imagem: imagens.Ventilador },
  { nome: "Liquidificador", preco: 180, imagem: imagens.Liquidificador },
  { nome: "Cafeteira elétrica", preco: 230, imagem: imagens.Cafeteira },
  { nome: "Conjunto de talheres", preco: 250, imagem: imagens.Talheres },
  { nome: "Jogo de cama queen", preco: 280, imagem: imagens.Cama },
  { nome: "Conjunto de panelas", preco: 320, imagem: imagens.Panelas },
  { nome: "Aparelho de jantar", preco: 350, imagem: imagens.Janta },
  { nome: "Micro-ondas (cota)", preco: 400, imagem: imagens.MicroOndas },
  { nome: "Aparador de entrada", preco: 450, imagem: imagens.Aparador },
  { nome: "Echo show (Alexa)", preco: 500, imagem: imagens.Alexa },
  {
    nome: "Kit viagem (malas ou acessórios)",
    preco: 600,
    imagem: imagens.KitMala,
  },
  { nome: "Air fryer", preco: 680, imagem: imagens.AirFryer },
  { nome: "Armário de cozinha", preco: 850, imagem: imagens.Armario },
  { nome: 'Smart TV 42"', preco: 1200, imagem: imagens.TV },
  { nome: "Geladeira (cota)", preco: 1400, imagem: imagens.Geladeira },
  { nome: "Máquina de lavar (cota)", preco: 1600, imagem: imagens.Lavadora },
  {
    nome: "Robô aspirador inteligente",
    preco: 2000,
    imagem: imagens.RoboAspirador,
  },

  { nome: "Batedeira compacta", preco: 95, imagem: imagens.Batedeira },
  { nome: "Tábua de corte com facas", preco: 100, imagem: imagens.TabuaFacas },
  {
    nome: "Jogo americano (6 peças)",
    preco: 110,
    imagem: imagens.JogoAmericano,
  },
  {
    nome: "Espremedor de frutas elétrico",
    preco: 120,
    imagem: imagens.Espremedor,
  },
  { nome: "Sanduicheira", preco: 130, imagem: imagens.Sanduicheira },
  { nome: "Ferro de passar roupas", preco: 145, imagem: imagens.FerroPassar },
  {
    nome: "Relógio de parede decorativo",
    preco: 150,
    imagem: imagens.RelogioParede,
  },
  { nome: "Torradeira inox", preco: 160, imagem: imagens.Torradeira },
  { nome: "Kit fondue", preco: 170, imagem: imagens.KitFondue },
  { nome: "Abajur de mesa moderno", preco: 180, imagem: imagens.Abajur },
  { nome: "Panela elétrica de arroz", preco: 190, imagem: imagens.PanelaArroz },
  {
    nome: "Jogo de panelas antiaderente",
    preco: 200,
    imagem: imagens.PanelasAntiaderente,
  },
  { nome: "Tapete decorativo", preco: 220, imagem: imagens.Tapete },
  { nome: "Aquecedor portátil", preco: 240, imagem: imagens.Aquecedor },
  { nome: "Organizador de closet", preco: 260, imagem: imagens.Organizador },
  { nome: "Caixa de som bluetooth", preco: 280, imagem: imagens.CaixaSom },
  { nome: "Jogo de facas gourmet", preco: 300, imagem: imagens.FacasGourmet },
  { nome: "Assadeira elétrica", preco: 350, imagem: imagens.AssadeiraEletrica },
  { nome: "Aspirador portátil", preco: 400, imagem: imagens.AspiradorPortatil },
  { nome: "Purificador de água", preco: 490, imagem: imagens.Purificador },
];

function embaralharArray<T>(array: T[]): T[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const PresentesPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(8);
  const [modalAberto, setModalAberto] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] =
    useState<Presente | null>(null);
  const [presentes, setPresentes] = useState<Presente[]>([]);

  useEffect(() => {
    const presentesEmbaralhados = embaralharArray(presentesOriginais);
    setPresentes(presentesEmbaralhados);
  }, []);

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
    window.addEventListener("resize", ajustarItensPorPagina);
    return () => window.removeEventListener("resize", ajustarItensPorPagina);
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [itensPorPagina]);

  const totalPaginas = Math.ceil(presentes.length / itensPorPagina);

  const presentesVisiveis = presentes.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const abrirModal = (presente: Presente) => {
    setPresenteSelecionado(presente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPresenteSelecionado(null);
  };

  return (
    <>
      <TopBarMinimal />

      <div className="pagina-presentes" id="lista-presentes">
        <h2>Escolha um presente com carinho </h2>
        <p className="intro">
          Abaixo estão alguns presentes simbólicos para nos ajudar a montar
          nosso lar. Obrigado por fazer parte disso!
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
              <button onClick={() => abrirModal(presente)}>Presentear</button>
            </div>
          ))}
        </div>

        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
          >
            ← Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima →
          </button>
        </div>

        <div className="pix-section">
          <h3>Prefere contribuir com Pix?</h3>
          <p>
            Chave Pix: <strong>11940729310</strong>
          </p>
        </div>

        {modalAberto && presenteSelecionado && (
          <div className="modal-fundo" onClick={fecharModal}>
            <div
              className="modal-conteudo"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button className="modal-fechar" onClick={fecharModal}>
                ×
              </button>
              <h2>{presenteSelecionado.nome}</h2>
              {presenteSelecionado.imagem && (
                <img
                  src={presenteSelecionado.imagem}
                  alt={presenteSelecionado.nome}
                  style={{ maxWidth: "100%", marginBottom: "1rem" }}
                />
              )}
              <p>
                Preço:{" "}
                <strong>R$ {presenteSelecionado.preco.toFixed(2)}</strong>
              </p>

              <div className="conteudo-pagamento">
                <h3>Quer presentear?</h3>
                <p>
                  Você pode contribuir com esse valor via <strong>Pix</strong>{" "}
                  ou <strong>cartão de crédito</strong>.
                </p>
                <p>Entre em contato com os noivos para combinar o presente:</p>

                <p>
                  <a
                    href={`https://wa.me/5599985360863?text=${encodeURIComponent(
                      `Olá! Gostaria de presentear vocês com o item "${
                        presenteSelecionado.nome
                      }" no valor de R$ ${presenteSelecionado.preco.toFixed(
                        2
                      )}. Vi que posso contribuir via Pix ou cartão de crédito. Poderiam me orientar sobre como prosseguir?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Noiva (WhatsApp)
                  </a>
                </p>

                <p>
                  <a
                    href={`https://wa.me/5511940729310?text=${encodeURIComponent(
                      `Olá! Gostaria de presentear vocês com o item "${
                        presenteSelecionado.nome
                      }" no valor de R$ ${presenteSelecionado.preco.toFixed(
                        2
                      )}. Vi que posso contribuir via Pix ou cartão de crédito. Poderiam me orientar sobre como prosseguir?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Noivo (WhatsApp)
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PresentesPage;
