import "../styles/Localizacao.css";

const Localizacao = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=R.%20Oito,%20333%20-%20Catumbi,%20Balsas%20-%20MA,%20Maranhão,%2065800-000";
  const wazeUrl = "https://waze.com/ul?ll=-7.538009968018442,-46.05420425498317&navigate=yes";

  return (
    <section id="localizacao" className="localizacao">
      <h2>Onde vai acontecer?</h2>
      <div className="conteudo-limitado">
        <div className="informacoes-e-mapa">
          <div className="info-evento">
            <h3>Cerimônia & Festa</h3>
            <p>Espaço Mais Festa</p>
            <p>26 de Julho de 2025, às 16h30</p>
          </div>
          <div className="mapa">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.338518912043!2d-46.05420425498317!3d-7.538009968018442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92d5ef166f6b9467%3A0xbe0a8de2f0850bc1!2sEspa%C3%A7o%20Mais%20Festa!5e0!3m2!1spt-BR!2sbr!4v1746943931394!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Local do casamento"
            />
          </div>
        </div>
      </div>
      <p className="endereco">
        R. Oito, 333 - Catumbi, Balsas - MA, Maranhão, 65800-000
      </p>

      <div className="botoes-navegacao">
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="botao-navegacao">
          Ver no Google Maps
        </a>
        <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="botao-navegacao">
          Ver no Waze
        </a>
      </div>
    </section>
  );
};

export default Localizacao;
