import { useState } from "react";
import "../styles/DressCode.css";
import { inspiracoes } from "../assets/inspirações/Inspiracoes";

const DressCodeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="confirmacao-container">
        <h4>Informações do Dress Code</h4>
        <button onClick={openModal}>Ver Dress Code</button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content">
            <section className="confirmacao-wrapper">
              <h2>Dress Code do Evento</h2>

              <p className="frase-sugestao">
                ✨ Com muito carinho, gostaríamos de compartilhar uma inspiração
                para o Dress Code: <br />
                Sugerimos trajes passeio completo ou esporte fino — uma escolha
                pensada para harmonizar com a atmosfera especial do nosso dia!{" "}
                <br />
                Mas o mais importante de tudo é que você esteja à vontade,
                confortável e radiante, exatamente do jeitinho que você é. 💖
              </p>

              {/* <p className="descricao">
                O dress code para o nosso casamento é: <strong>Traje Social</strong>.<br />
                Sugerimos roupas elegantes, mas confortáveis para celebrar conosco!
              </p> */}

              <div className="galeria-inspiracoes">
                <h3>Masculino</h3>
                <div className="imagens">
                  {inspiracoes.masculino.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Inspiração Masculina ${index + 1}`}
                      className="inspiracao-imagem"
                    />
                  ))}
                </div>

                <h3>Casal</h3>
                <div className="imagens">
                  {inspiracoes.casal.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Inspiração Casal ${index + 1}`}
                      className="inspiracao-imagem"
                    />
                  ))}
                </div>

                <h3>Feminino</h3>
                <div className="imagens">
                  {inspiracoes.feminino.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Inspiração Feminina ${index + 1}`}
                      className="inspiracao-imagem"
                    />
                  ))}
                </div>
              </div>

              <button onClick={closeModal}>Fechar</button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default DressCodeModal;
