import { useState } from "react";
import "../styles/DressCode.css";

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
              <p className="descricao">
                O dress code para o nosso casamento é: <strong>Traje Social</strong>.
                <br />
                Sugerimos roupas elegantes, mas confortáveis para celebrar conosco!
              </p>
              <button onClick={closeModal}>Fechar</button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default DressCodeModal;
