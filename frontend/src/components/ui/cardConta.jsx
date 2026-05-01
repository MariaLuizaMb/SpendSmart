// src/components/ContaCard.jsx

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { pegarFundoDoCartao, MODELOS_CARTAO } from "@/constants/cardsConta";
import { cn } from "@/lib/utils";

function formatarSaldo(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const estilosPorVariant = {
  default: {
    container:
      "relative w-full max-w-161.5 aspect-646/397 overflow-hidden rounded-[24px] bg-center shadow-md",
    titulo:
      "absolute bottom-[11%] left-[10.5%] max-w-[45%] truncate text-2xl font-bold uppercase text-white sm:text-3xl",
    saldo:
      "absolute bottom-[12%] right-[6%] flex items-center gap-1 text-white",
    label: "text-sm sm:text-base",
    valor: "text-lg font-bold sm:text-xl",
    icone: 16,
    saldoOculto: "R$ *****",
  },
  home: {
    container:
      "relative w-full aspect-646/397 overflow-hidden rounded-[10px] bg-center shadow-sm",
    titulo:
      "absolute bottom-[12%] left-[10%] max-w-[48%] truncate text-xl font-bold uppercase text-white",
    saldo:
      "absolute bottom-[13%] right-[7%] flex items-center gap-1 text-white",
    label: "text-[10px]",
    valor: "text-sm font-bold",
    icone: 12,
    saldoOculto: "R$ *****",
  },
};

export default function ContaCard({ conta, variant = "default", className }) {
  const [saldoVisivel, setSaldoVisivel] = useState(true);
  const estilos = estilosPorVariant[variant] || estilosPorVariant.default;

  const nomeConta = conta?.nome || "Conta";
  const saldoConta =
    conta?.saldoAtual ?? conta?.saldoInicial ?? conta?.saldo ?? 0;

  const modeloCartao = conta?.modeloCartao || MODELOS_CARTAO.DEFAULT;
  const fundoCartao = pegarFundoDoCartao(modeloCartao);

  return (
    <div
      className={cn(estilos.container, className)}
      style={{
        backgroundImage: `url(${fundoCartao})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <h3 className={estilos.titulo}>{nomeConta}</h3>

      <div className={estilos.saldo}>
        <span className={estilos.label}>Saldo:</span>

        <strong className={estilos.valor}>
          {saldoVisivel ? formatarSaldo(saldoConta) : estilos.saldoOculto}
        </strong>

        <button
          type="button"
          onClick={() => setSaldoVisivel((visivel) => !visivel)}
          className="rounded-full p-1 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={saldoVisivel ? "Ocultar saldo" : "Mostrar saldo"}
        >
          {saldoVisivel ? (
            <Eye size={estilos.icone} strokeWidth={1.8} />
          ) : (
            <EyeOff size={estilos.icone} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </div>
  );
}
