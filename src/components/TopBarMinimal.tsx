import { useNavigate } from "react-router-dom";
import "../styles/TopBar.css";
import { ArrowLeft } from "lucide-react";

const TopBarMinimal = () => {
  const navigate = useNavigate();

  return (
    <nav className="topbar topbar-minimal">
      <button
        onClick={() => navigate("/")}
        className="back-button"
        aria-label="Voltar para a home"
      >
        <ArrowLeft size={28} />
      </button>

      <span className="center-title">Fernanda & David</span>
    </nav>
  );
};

export default TopBarMinimal;
