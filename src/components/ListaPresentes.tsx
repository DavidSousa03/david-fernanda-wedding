import {Link} from "react-router-dom";
import "../styles/ListaPresentes.css";

const ListaPresentes = () => {
  return (
    <section id="lista-presentes" className="lista-presentes">
      <h2>Lista de Presentes</h2>
      <p>
        Sua presença é mais que suficiente para nós! Mas, se ainda assim quiser
        nos presentear, montamos uma lista com carinho.
        <br />
        Como em breve estaremos nos mudando para <strong>São Paulo</strong>,
        damos preferência a contribuições via <strong>Pix</strong>, pois não
        conseguiremos levar presentes físicos.
      </p>

      <div className="botao-container">
        <Link to="/presentes" className="botao-ver-lista">
          Ver lista →
        </Link>
      </div>
    </section>
  );
};

export default ListaPresentes;
