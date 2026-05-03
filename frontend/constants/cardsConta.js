// src/constants/cardsConta.js

import NubankCard from "@/assets/cards/Nubank.svg";
import MercadoPagoCard from "@/assets/cards/MercadoPago.svg";
import CaixaCard from "@/assets/cards/Caixa.svg";
import PicpayCard from "@/assets/cards/Picpay.svg";
import DefaultCard from "@/assets/cards/Default.svg";

export const MODELOS_CARTAO = {
  NUBANK: "NUBANK",
  MERCADO_PAGO: "MERCADO_PAGO",
  CAIXA: "CAIXA",
  PICPAY: "PICPAY",
  DEFAULT: "DEFAULT",
};

export const opcoesCartao = [
  {
    label: "Nubank",
    value: MODELOS_CARTAO.NUBANK,
    imagem: NubankCard,
  },
  {
    label: "Mercado Pago",
    value: MODELOS_CARTAO.MERCADO_PAGO,
    imagem: MercadoPagoCard,
  },
  {
    label: "Caixa",
    value: MODELOS_CARTAO.CAIXA,
    imagem: CaixaCard,
  },
  {
    label: "PicPay",
    value: MODELOS_CARTAO.PICPAY,
    imagem: PicpayCard,
  },
  {
    label: "Outro banco",
    value: MODELOS_CARTAO.DEFAULT,
    imagem: DefaultCard,
  },
];

export const fundosCartao = {
  [MODELOS_CARTAO.NUBANK]: NubankCard,
  [MODELOS_CARTAO.MERCADO_PAGO]: MercadoPagoCard,
  [MODELOS_CARTAO.CAIXA]: CaixaCard,
  [MODELOS_CARTAO.PICPAY]: PicpayCard,
  [MODELOS_CARTAO.DEFAULT]: DefaultCard,
};

export function pegarFundoDoCartao(modeloCartao) {
  return fundosCartao[modeloCartao] || DefaultCard;
}
