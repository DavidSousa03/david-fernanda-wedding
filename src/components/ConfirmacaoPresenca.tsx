import { useState } from "react";
import "../styles/ConfirmacaoPresenca.css";

const ConfirmacaoPresenca = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [addAdditionalGuests, setAddAdditionalGuests] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGuestChange = (index: number, value: string) => {
    const newGuestNames = [...guestNames];
    newGuestNames[index] = value;
    setGuestNames(newGuestNames);
  };

  const handleRemoveGuest = (index: number) => {
    const newGuestNames = guestNames.filter((_, i) => i !== index);
    setGuestNames(newGuestNames);
    setGuests(newGuestNames.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (guestNames.some((name) => name.trim() === "")) {
      alert("Por favor, preencha todos os nomes dos convidados!");
      return;
    }

    if (addAdditionalGuests) {
      // Pega só os convidados extras que não estão vazios
      const convidadosExtras = guestNames.filter((name) => name.trim() !== "");

      let mensagem = "Confirmação de presença realizada com sucesso.\n";
      mensagem += `Obrigado, ${fullName}.\n`;

      if (convidadosExtras.length > 0) {
        mensagem += `Também confirmamos a presença de: ${convidadosExtras.join(
          ", "
        )}.\n`;
      } else {
        mensagem += "Nenhum outro convidado adicional confirmado.\n";
      }

      if (email) {
        mensagem +=
          "Entraremos em contato pelo e-mail fornecido, se necessário.";
      }

      alert(mensagem);
    } else {
      let mensagem = "Confirmação de presença realizada com sucesso.\n";
      mensagem += `Obrigado, ${fullName}.\n`;
      if (email) {
        mensagem +=
          "Entraremos em contato pelo e-mail fornecido, se necessário.";
      }
      alert(mensagem);
    }

    setIsModalOpen(false);
  };

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
        <h4>Confirmação de presença</h4>
        <button onClick={openModal}>Confirmar Presença</button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content">
            <section id="confirmacao-presenca" className="confirmacao-wrapper">
              <h2>Confirmação de Presença</h2>
              <p className="descricao">
                Estamos ansiosos para comemorar esse momento com você! 💍
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <p>Por favor, informe seu nome completo:</p>
                  <input
                    type="text"
                    placeholder="Exemplo: João Silva"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <p>Digite seu e-mail (opcional):</p>
                  <input
                    type="email"
                    placeholder="Exemplo: joao@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="switch-wrapper">
                  <p>Deseja confirmar mais convidados?</p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={addAdditionalGuests}
                      onChange={() =>
                        setAddAdditionalGuests(!addAdditionalGuests)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                {addAdditionalGuests && (
                  <>
                    <div className="form-field">
                      <p>Quantas pessoas você confirmará?</p>
                      <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => {
                          const newGuests = Number(e.target.value);
                          setGuests(newGuests);
                          if (newGuests > guestNames.length) {
                            setGuestNames([
                              ...guestNames,
                              ...Array(newGuests - guestNames.length).fill(""),
                            ]);
                          } else {
                            setGuestNames(guestNames.slice(0, newGuests));
                          }
                        }}
                        required
                      />
                    </div>

                    {guestNames.map((name, index) => (
                      <div key={index} className="form-field">
                        <p>
                          {index === 0
                            ? "Nome do Convidado"
                            : `Nome do convidado ${index + 1}`}
                        </p>
                        <input
                          type="text"
                          placeholder={`Exemplo: Convidado ${index + 1}`}
                          value={name}
                          onChange={(e) =>
                            handleGuestChange(index, e.target.value)
                          }
                          required
                        />
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGuest(index)}
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}

                <button type="submit">Confirmar Presença</button>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmacaoPresenca;
