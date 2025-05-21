import { useState, useEffect, useRef } from "react";
import "../styles/ConfirmacaoPresenca.css";
import {
  buscarTodosConvidados,
  confirmarPresencaPorNome,
} from "../service/confirmarPresencaPorNome";

interface Convidado {
  Id: number;
  Convidado?: string;
  Email?: string;
}

const ConfirmacaoPresenca = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [addAdditionalGuests, setAddAdditionalGuests] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todosConvidados, setTodosConvidados] = useState<Convidado[]>([]);
  const [suggestions, setSuggestions] = useState<Convidado[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [openDropdownIndexes, setOpenDropdownIndexes] = useState<number[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      buscarTodosConvidados()
        .then((list) => setTodosConvidados(list))
        .catch((err) => console.error("Erro ao buscar convidados:", err));
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setOpenDropdownIndexes([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onChangeFullName = (value: string) => {
    setFullName(value);

    if (value.length >= 2) {
      const filtered = todosConvidados.filter((convidado) =>
        convidado.Convidado?.toLowerCase().includes(value.trim().toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (convidado: Convidado) => {
    setFullName(convidado.Convidado || "");
    setEmail(convidado.Email || "");
    setShowSuggestions(false);
  };

  const toggleDropdown = (index: number, open: boolean) => {
    setOpenDropdownIndexes((current) => {
      if (open) {
        if (!current.includes(index)) return [...current, index];
        return current;
      } else {
        return current.filter((i) => i !== index);
      }
    });
  };

  const getSuggestionsForGuest = (inputValue: string, currentIndex: number) => {
    if (inputValue.length < 2) return [];

    const nomesEscolhidos = guestNames
      .filter((_, idx) => idx !== currentIndex)
      .map((n) => n.trim().toLowerCase())
      .filter((n) => n !== "");

    const fullNameLower = fullName.trim().toLowerCase();

    return todosConvidados.filter((convidado) => {
      const nome = convidado.Convidado || "";
      const nomeLower = nome.toLowerCase();
      return (
        nomeLower.includes(inputValue.toLowerCase()) &&
        !nomesEscolhidos.includes(nomeLower) &&
        nomeLower !== fullNameLower
      );
    });
  };

  const handleGuestChange = (index: number, value: string) => {
    const newGuestNames = [...guestNames];
    newGuestNames[index] = value;
    setGuestNames(newGuestNames);

    toggleDropdown(index, true);
  };

  const handleSuggestionClickForGuest = (
    index: number,
    convidado: Convidado
  ) => {
    const newGuestNames = [...guestNames];
    newGuestNames[index] = convidado.Convidado || "";
    setGuestNames(newGuestNames);
    toggleDropdown(index, false);
  };

  const handleRemoveGuest = (index: number) => {
    const newGuestNames = guestNames.filter((_, i) => i !== index);
    setGuestNames(newGuestNames);
    setGuests(newGuestNames.length);
    toggleDropdown(index, false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (guestNames.some((name) => name.trim() === "")) {
      alert("Por favor, preencha todos os nomes dos convidados!");
      return;
    }

    const convidadoSelecionado = todosConvidados.find(
      (c) => c.Convidado === fullName
    );
    if (!convidadoSelecionado) {
      alert("Convidado principal não encontrado!");
      return;
    }

    try {
      await confirmarPresencaPorNome(convidadoSelecionado, email);

      if (addAdditionalGuests) {
        const convidadosExtras = guestNames.filter(
          (name) => name.trim() !== ""
        );

        for (const nomeConvidado of convidadosExtras) {
          const convidadoExtra = todosConvidados.find(
            (c) => c.Convidado === nomeConvidado
          );
          if (!convidadoExtra) {
            alert(`Convidado adicional "${nomeConvidado}" não encontrado!`);
            return;
          }
          await confirmarPresencaPorNome(convidadoExtra);
        }

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
    } catch (error) {
      alert(`Erro ao confirmar presença: ${error}`);
    }
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
          <div className="modal-content" ref={wrapperRef}>
            <section id="confirmacao-presenca" className="confirmacao-wrapper">
              <h2>Confirmação de Presença</h2>
              <p className="descricao">
                Estamos ansiosos para comemorar esse momento com você! 💍
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-field" style={{ position: "relative" }}>
                  <p>Por favor, informe seu nome completo:</p>
                  <input
                    type="text"
                    placeholder="Exemplo: João Silva"
                    value={fullName}
                    onChange={(e) => onChangeFullName(e.target.value)}
                    autoComplete="off"
                    required
                    onFocus={() => {
                      if (fullName.length >= 2 && suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((sug) => (
                        <li
                          key={sug.Id}
                          onClick={() => handleSuggestionClick(sug)}
                          className="suggestion-item"
                        >
                          {sug.Convidado}
                        </li>
                      ))}
                    </ul>
                  )}
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
                      <hr className="divisoria" />
                      <p>Quantas pessoas você confirmará?</p>
                      <input
                        type="number"
                        min={1}
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
                            setOpenDropdownIndexes((current) =>
                              current.filter((i) => i < newGuests)
                            );
                          }
                        }}
                        required
                      />
                    </div>

                    {guestNames.map((name, index) => {
                      const guestSuggestions = getSuggestionsForGuest(
                        name,
                        index
                      );
                      const isOpen = openDropdownIndexes.includes(index);

                      return (
                        <div
                          key={index}
                          className="form-field"
                          style={{ position: "relative" }}
                        >
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
                            onFocus={() => toggleDropdown(index, true)}
                            autoComplete="off"
                            required
                          />
                          {guestNames.length > 1 && (
                            <button
                              type="button"
                              className="remove-guest-btn"
                              onClick={() => handleRemoveGuest(index)}
                              aria-label={`Remover convidado ${index + 1}`}
                            >
                              &times;
                            </button>
                          )}
                          {isOpen && guestSuggestions.length > 0 && (
                            <ul className="suggestions-list">
                              {guestSuggestions.map((sug) => (
                                <li
                                  key={sug.Id}
                                  onClick={() =>
                                    handleSuggestionClickForGuest(index, sug)
                                  }
                                  className="suggestion-item"
                                >
                                  {sug.Convidado}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}

                <div className="button-wrapper">
                  <button type="submit" className="confirm-button">
                    Confirmar Presença
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmacaoPresenca;
