import Countdown from "react-countdown";
import type { CountdownRenderProps } from "react-countdown";
import "../styles/DetalhesDia.css";

const DetalhesDia = () => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return <span>O grande dia chegou! 🎉</span>;
    } else {
      return (
        <div className="countdown-tempo">
          <div>
            <strong>{days}</strong>
            <span>dias</span>
          </div>
          <div>
            <strong>{hours}</strong>
            <span>horas</span>
          </div>
          <div>
            <strong>{minutes}</strong>
            <span>min</span>
          </div>
          <div>
            <strong>{seconds}</strong>
            <span>seg</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="detalhes-dia" className="detalhes-dia">
      <h2>Sobre o nosso grande dia</h2>

      <p className="mensagem-introducao">
        Queridos amigos e familiares, criamos este site para compartilhar com
        vocês alguns detalhes sobre o nosso grande dia. Estamos muito felizes e
        temos certeza que será um momento muito especial.
      </p>

      <p className="mensagem-introducao">
        Navegue pelo menu para acessar informações sobre nossa história, nossa
        família, dicas para o dia do evento (dress code, perguntas frequentes) e
        detalhes sobre a programação e o local do evento.
      </p>

      <p className="mensagem-introducao">
        Não esqueça de confirmar sua presença! Nossa lista de presentes também
        está aqui no site.
      </p>

      <p className="mensagem-introducao">
        A contagem regressiva começou! Cada dia que passa, estamos mais perto de
        viver esse momento único ao lado de quem mais amamos.
      </p>

      <Countdown date={new Date("2025-07-26T16:30:00")} renderer={renderer} />
    </section>
  );
};

export default DetalhesDia;
