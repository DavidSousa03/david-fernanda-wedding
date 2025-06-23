// src/components/PixQRCode.tsx
import React, { useState } from "react";

interface PixQRCodeProps {
  chave: string;
  nome: string;
  cidade: string;
  valor: number;
}

export const PixQRCode: React.FC<PixQRCodeProps> = ({ chave, nome, cidade, valor }) => {
  const [valorPIX, setValorPIX] = useState(valor.toFixed(2).replace('.', ','));
  const [payload, setPayload] = useState("");
  const [qrVisible, setQrVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tag = (id: string, value: string) =>
    id + value.length.toString().padStart(2, "0") + value;

  const crc16 = (str: string): string => {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
        else crc <<= 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  };

  const gerarQRCode = () => {
    const valorNumerico = parseFloat(valorPIX.replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Digite um valor válido para o PIX.");
      return;
    }

    const valorFormatado = valorNumerico.toFixed(2);

    const payloadSemCRC =
      tag("00", "01") +
      tag("26", tag("00", "BR.GOV.BCB.PIX") + tag("01", chave)) +
      tag("52", "0000") +
      tag("53", "986") +
      tag("54", valorFormatado) +
      tag("58", "BR") +
      tag("59", nome) +
      tag("60", cidade) +
      tag("62", tag("05", "***")) +
      "6304";

    const fullPayload = payloadSemCRC + crc16(payloadSemCRC);
    setPayload(fullPayload);
    setQrVisible(true);
    setModalOpen(false);
  };

  const copiarPayload = () => {
    navigator.clipboard.writeText(payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        style={{
          background: "#f5a623",
          color: "black",
          padding: "12px",
          display: "block",
          textAlign: "center",
          borderRadius: "10px",
          margin: "8px 0",
          textDecoration: "none",
        }}
      >
        💸 Gerar QR Code PIX
      </a>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              maxWidth: 300,
              width: "90%",
              position: "relative",
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                background: "transparent",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <h3 style={{ textAlign: "center", marginTop: 0 }}>
              Digite o valor do PIX
            </h3>
            <input
              type="text"
              value={valorPIX}
              onChange={(e) => setValorPIX(e.target.value)}
              placeholder="Digite o valor (ex: 20,00)"
              onKeyDown={(e) => {
                if (e.key === "Enter") gerarQRCode();
              }}
              style={{
                padding: 12,
                borderRadius: 10,
                fontSize: "1em",
                marginTop: 10,
              }}
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                gerarQRCode();
              }}
              style={{
                background: "#f5a623",
                color: "white",
                padding: "12px",
                textAlign: "center",
                borderRadius: "10px",
                textDecoration: "none",
                display: "block",
                marginTop: 10,
              }}
            >
              💸 Gerar QR Code PIX
            </a>
          </div>
        </div>
      )}

      {qrVisible && (
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            fontSize: "0.9em",
          }}
        >
          <p>
            PIX para Chave <b>{chave}</b>
            <br />
            <b>Valor:</b> R$ {valorPIX}
          </p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
              payload
            )}`}
            alt="QR Code PIX"
            style={{ margin: "15px 0" }}
          />
          <p style={{ fontWeight: "bold" }}>
            Abra o app do seu banco e pague através do QR Code ou PIX Copia e
            Cola.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={copiarPayload}
              style={{
                background: "#f5a623",
                color: "black",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                fontWeight: "bolder",
              }}
            >
              📋 Copiar Código PIX
            </button>
          </div>
          {copied && (
            <p style={{ marginTop: 10, color: "green" }}>
              ✅ Código PIX copiado com sucesso!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
