import { Link } from "react-router-dom";
import "../styles/ListaPresentes.css";

const ListaPresentes = () => {
  return (
    <section id="lista-presentes" className="lista-presentes">
      <h2>Lista de Presentes</h2>
      <p>
        Queremos compartilhar com muito amor e sinceridade que, nesse momento de
        mudanças e novidades, ainda estamos definindo alguns detalhes
        importantes da nossa vida a dois. Por isso, optamos por não receber
        presentes físicos no nosso casamento.
        <br />
        Essa decisão foi tomada pensando em evitar qualquer dificuldade com
        transporte e logística, garantindo que tudo flua da forma mais leve e
        prática possível.
        <br />
        Se desejarem nos presentear, preparamos uma lista online e também
        disponibilizamos cotas, que com certeza irão nos ajudar muito nesse novo
        ciclo.
        <br />
        De qualquer forma, o maior presente é ter vocês compartilhando esse
        momento tão especial conosco, seja de pertinho ou de coração!
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
