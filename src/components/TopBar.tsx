import { useState } from "react";
import "../styles/TopBar.css";
import D_F from "../assets/Logo_D_F.png";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="topbar">
      <ul className="menu-left">
        <li onClick={() => scrollToSection("hero")}>Início</li>
        <li onClick={() => scrollToSection("detalhes-dia")}>Detalhes</li>
        <li onClick={() => scrollToSection("localizacao")}>Localização</li>
      </ul>

      <span className="center-title">Fernanda & David</span>

      <ul className="menu-right">
        <li onClick={() => scrollToSection("lista-presentes")}>Presentes</li>
        <li onClick={() => scrollToSection("confirmacao-presenca")}>
          Confirmação
        </li>
        <li onClick={() => scrollToSection("agradecimento")}>Agradecimento</li>
      </ul>

      <img src={D_F} alt="Logo" className="logo-mobile" />

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li onClick={() => scrollToSection("hero")}>Início</li>
        <li onClick={() => scrollToSection("detalhes-dia")}>Detalhes</li>
        <li onClick={() => scrollToSection("localizacao")}>Localização</li>
        <li onClick={() => scrollToSection("lista-presentes")}>Presentes</li>
        <li onClick={() => scrollToSection("confirmacao-presenca")}>
          Confirmação
        </li>
        <li onClick={() => scrollToSection("agradecimento")}>Agradecimento</li>
      </ul>
    </nav>
  );
};

export default TopBar;
