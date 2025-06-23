import ConfirmacaoPresencaModal from "./ConfirmacaoPresenca";
import DressCodeModal from "./DressCode";

const ConfirmacaoEDressCode = () => {
  return (
    <main
      style={{
        padding: "3rem",
        display: "flex",
        gap: "3rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <section
        id="confirmacao-presenca" 
        style={{
          flex: "1 1 300px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ConfirmacaoPresencaModal />
      </section>

      <section
        style={{
          flex: "1 1 300px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <DressCodeModal />
      </section>
    </main>
  );
};

export default ConfirmacaoEDressCode;
