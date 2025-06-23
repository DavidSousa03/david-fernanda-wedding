import { useNavigate } from "react-router-dom";
import "../styles/TopBar.css";
import { ArrowLeft } from "lucide-react";

const TopBarMinimal = () => {
  const navigate = useNavigate();

  return (
    <nav className="topbar topbar-minimal">
      <span
        role="button"
        tabIndex={0}
        onClick={() => navigate("/")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate("/");
          }
        }}
        aria-label="Voltar para a home"
        className="back-icon"
        style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
      >
        <ArrowLeft size={28} />
      </span>

      <span className="center-title">Fernanda & David</span>
    </nav>
  );
};

export default TopBarMinimal;
