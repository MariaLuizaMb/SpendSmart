import prisma from "../database/prisma.js";

const categoriasPadrao = [
  // DESPESAS
  { nome: "Mercado", tipo: "DESPESA", ehPadrao: true },
  { nome: "Transporte", tipo: "DESPESA", ehPadrao: true },
  { nome: "Aluguel", tipo: "DESPESA", ehPadrao: true },
  { nome: "Água", tipo: "DESPESA", ehPadrao: true },
  { nome: "Luz", tipo: "DESPESA", ehPadrao: true },
  { nome: "Internet", tipo: "DESPESA", ehPadrao: true },
  { nome: "Telefone", tipo: "DESPESA", ehPadrao: true },
  { nome: "Saúde", tipo: "DESPESA", ehPadrao: true },
  { nome: "Farmácia", tipo: "DESPESA", ehPadrao: true },
  { nome: "Educação", tipo: "DESPESA", ehPadrao: true },
  { nome: "Lazer", tipo: "DESPESA", ehPadrao: true },
  { nome: "Assinaturas", tipo: "DESPESA", ehPadrao: true },
  { nome: "Restaurantes", tipo: "DESPESA", ehPadrao: true },
  { nome: "Roupas", tipo: "DESPESA", ehPadrao: true },
  { nome: "Pets", tipo: "DESPESA", ehPadrao: true },
  { nome: "Compras", tipo: "DESPESA", ehPadrao: true },
  { nome: "Impostos", tipo: "DESPESA", ehPadrao: true },
  { nome: "Cartão de Crédito", tipo: "DESPESA", ehPadrao: true },

  // RECEITAS
  { nome: "Salário", tipo: "RECEITA", ehPadrao: true },
  { nome: "Freelance", tipo: "RECEITA", ehPadrao: true },
  { nome: "Renda Extra", tipo: "RECEITA", ehPadrao: true },
  { nome: "Presente", tipo: "RECEITA", ehPadrao: true },
  { nome: "Reembolso", tipo: "RECEITA", ehPadrao: true },
  { nome: "Investimentos", tipo: "RECEITA", ehPadrao: true },
  { nome: "Venda", tipo: "RECEITA", ehPadrao: true },
];

async function main() {
  console.log("Iniciando teste de conexão com o banco...");

  for (const categoria of categoriasPadrao) {
    const existente = await prisma.categoria.findFirst({
      where: {
        nome: categoria.nome,
        tipo: categoria.tipo,
        ehPadrao: true,
        idUsuario: null,
      },
    });

    if (!existente) {
      await prisma.categoria.create({
        data: {
          nome: categoria.nome,
          tipo: categoria.tipo,
          ehPadrao: true,
          idUsuario: null,
        },
      });

      console.log(`Categoria criada: ${categoria.nome} (${categoria.tipo})`);
    } else {
      console.log(`Categoria já existe: ${categoria.nome} (${categoria.tipo})`);
    }
  }

  console.log("Seed finalizada com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao testar o banco:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
